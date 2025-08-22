import argparse
import os
from typing import List

import requests
from youtube_transcript_api import YouTubeTranscriptApi


def extract_video_id(url: str) -> str:
    # Very basic extraction; expects ?v= or short URLs. Extend as needed.
    if "v=" in url:
        return url.split("v=")[-1].split("&")[0]
    if "youtu.be/" in url:
        return url.split("youtu.be/")[-1].split("?")[0]
    return url


def get_transcript(video_id: str) -> str:
    parts = YouTubeTranscriptApi.get_transcript(video_id, languages=["en"])  # type: ignore
    return " ".join(p.get("text", "") for p in parts)


def upsert_texts(base_url: str, namespace: str, texts: List[str]):
    payload = {
        "namespace": namespace,
        "items": [{"text": t} for t in texts if t.strip()],
    }
    r = requests.post(f"{base_url.rstrip('/')}/upsert", json=payload, timeout=60)
    r.raise_for_status()
    return r.json()


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--retrieval_url", default=os.getenv("RETRIEVAL_API_URL", "http://localhost:8000"))
    parser.add_argument("--namespace", default="dr-mike")
    parser.add_argument("urls", nargs="+", help="YouTube video URLs or IDs")
    args = parser.parse_args()

    texts: List[str] = []
    for u in args.urls:
        vid = extract_video_id(u)
        print(f"Fetching transcript for: {vid}")
        try:
            text = get_transcript(vid)
            if text:
                texts.append(text)
        except Exception as e:
            print(f"Failed to fetch transcript for {u}: {e}")

    if not texts:
        print("No transcripts fetched")
        return

    print(f"Upserting {len(texts)} transcripts to namespace '{args.namespace}'")
    res = upsert_texts(args.retrieval_url, args.namespace, texts)
    print(res)


if __name__ == "__main__":
    main()









