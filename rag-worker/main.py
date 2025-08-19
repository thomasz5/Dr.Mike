import os
import hashlib
from typing import List, Optional

from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import numpy as np
import redis
from sentence_transformers import SentenceTransformer


REDIS_URL = os.getenv("REDIS_URL", "redis://localhost:6379")
EMBEDDING_MODEL = os.getenv("EMBEDDING_MODEL", "sentence-transformers/all-MiniLM-L6-v2")


class UpsertItem(BaseModel):
    id: Optional[str] = None
    text: str
    metadata: Optional[dict] = None


class UpsertRequest(BaseModel):
    namespace: str
    items: List[UpsertItem]


class QueryRequest(BaseModel):
    namespace: str
    query: str
    top_k: int = 5


class QueryResult(BaseModel):
    id: str
    text: str
    score: float
    metadata: Optional[dict] = None


def _hash_id(text: str) -> str:
    return hashlib.sha256(text.encode("utf-8")).hexdigest()[:16]


class RedisVectorStore:
    def __init__(self, client: redis.Redis, model: SentenceTransformer):
        self.client = client
        self.model = model

    def _key(self, namespace: str, item_id: str) -> str:
        return f"rag:{namespace}:{item_id}"

    def _index_key(self, namespace: str) -> str:
        return f"rag:{namespace}:index"

    def upsert(self, namespace: str, items: List[UpsertItem]):
        pipe = self.client.pipeline()
        for item in items:
            item_id = item.id or _hash_id(item.text)
            key = self._key(namespace, item_id)
            embedding = self.model.encode(item.text, normalize_embeddings=True)
            # Store as hash with text, metadata, and vector as bytes
            pipe.hset(key, mapping={
                "text": item.text,
                "metadata": (item.metadata and str(item.metadata)) or "{}",
                "vector": np.asarray(embedding, dtype=np.float32).tobytes(),
            })
            pipe.sadd(self._index_key(namespace), item_id)
        pipe.execute()

    def _all_items(self, namespace: str):
        ids = self.client.smembers(self._index_key(namespace))
        for raw_id in ids:
            item_id = raw_id.decode("utf-8")
            key = self._key(namespace, item_id)
            data = self.client.hgetall(key)
            if not data:
                continue
            yield item_id, data

    def query(self, namespace: str, query: str, top_k: int = 5) -> List[QueryResult]:
        if top_k <= 0:
            return []
        q_vec = self.model.encode(query, normalize_embeddings=True)
        q_vec = np.asarray(q_vec, dtype=np.float32)

        scored: List[QueryResult] = []
        for item_id, data in self._all_items(namespace):
            text = data.get(b"text", b"").decode("utf-8")
            vec_bytes = data.get(b"vector")
            if not vec_bytes:
                continue
            vec = np.frombuffer(vec_bytes, dtype=np.float32)
            score = float(np.dot(q_vec, vec))  # cosine sim since both normalized
            scored.append(QueryResult(id=item_id, text=text, score=score, metadata=None))

        scored.sort(key=lambda x: x.score, reverse=True)
        return scored[:top_k]


app = FastAPI(title="RAG Worker", version="0.1.0")


redis_client = redis.from_url(REDIS_URL)
model = SentenceTransformer(EMBEDDING_MODEL)
store = RedisVectorStore(redis_client, model)


@app.get("/health")
def health():
    return {"status": "ok"}


@app.post("/upsert")
def upsert(req: UpsertRequest):
    if not req.items:
        raise HTTPException(status_code=400, detail="No items provided")
    store.upsert(req.namespace, req.items)
    return {"upserted": len(req.items)}


@app.post("/query")
def query(req: QueryRequest) -> List[QueryResult]:
    return store.query(req.namespace, req.query, req.top_k)


