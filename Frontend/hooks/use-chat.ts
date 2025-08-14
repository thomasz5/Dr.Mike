"use client"

import { useState, useEffect, useCallback, useRef } from "react"

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: Date
}

interface ChatSession {
  id: string
  title: string
  messages: Message[]
  timestamp: Date
}

interface ChatOptions {
  fetcher?: (messages: Message[], sessionId: string) => Promise<Response>
  maxMessages?: number
  storageKey?: string
  sessionTimeout?: number // in milliseconds
  onSessionTimeout?: () => void
}

const STORAGE_KEY = "dr-mike-ai-messages"
const SESSIONS_KEY = "dr-mike-ai-sessions"
const MAX_MESSAGES = 10
const SESSION_TIMEOUT = 30 * 60 * 1000 // 30 minutes

const defaultFetcher = async (messages: Message[], sessionId: string): Promise<Response> => {
  return fetch("/api/chat", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      messages: messages.map((msg) => ({
        role: msg.role,
        content: msg.content,
      })),
      sessionId,
    }),
  })
}

export function useChat(options: ChatOptions = {}) {
  const {
    fetcher = defaultFetcher,
    maxMessages = MAX_MESSAGES,
    storageKey = STORAGE_KEY,
    sessionTimeout = SESSION_TIMEOUT,
    onSessionTimeout,
  } = options

  const [messages, setMessages] = useState<Message[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [currentSessionId, setCurrentSessionId] = useState<string>(() => Date.now().toString())
  const [sessions, setSessions] = useState<ChatSession[]>([])

  const lastActivityRef = useRef<number>(Date.now())
  const timeoutRef = useRef<NodeJS.Timeout>()

  useEffect(() => {
    const storedSessions = localStorage.getItem(SESSIONS_KEY)
    if (storedSessions) {
      try {
        const parsed = JSON.parse(storedSessions)
        setSessions(
          parsed.map((session: any) => ({
            ...session,
            timestamp: new Date(session.timestamp),
            messages: session.messages.map((msg: any) => ({
              ...msg,
              timestamp: new Date(msg.timestamp),
            })),
          })),
        )
      } catch (error) {
        console.error("Failed to load sessions from localStorage:", error)
      }
    }

    // Load current session messages
    const stored = localStorage.getItem(storageKey)
    if (stored) {
      try {
        const parsed = JSON.parse(stored)
        setMessages(
          parsed.map((msg: any) => ({
            ...msg,
            timestamp: new Date(msg.timestamp),
          })),
        )
      } catch (error) {
        console.error("Failed to load messages from localStorage:", error)
      }
    }
  }, [storageKey])

  useEffect(() => {
    if (messages.length > 0) {
      const toStore = messages.slice(-maxMessages)
      localStorage.setItem(storageKey, JSON.stringify(toStore))
    }
  }, [messages, maxMessages, storageKey])

  useEffect(() => {
    if (sessions.length > 0) {
      localStorage.setItem(SESSIONS_KEY, JSON.stringify(sessions))
    }
  }, [sessions])

  const resetTimeout = useCallback(() => {
    lastActivityRef.current = Date.now()

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }

    timeoutRef.current = setTimeout(() => {
      if (messages.length > 0) {
        // Auto-save current session and start new one
        startNewChat()
        onSessionTimeout?.()
      }
    }, sessionTimeout)
  }, [messages.length, sessionTimeout, onSessionTimeout])

  useEffect(() => {
    resetTimeout()
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [resetTimeout])

  const generateSessionTitle = useCallback((messages: Message[]): string => {
    const firstUserMessage = messages.find((msg) => msg.role === "user")
    if (!firstUserMessage) return "New Chat"

    const content = firstUserMessage.content.trim()
    if (content.length <= 50) return content
    return content.substring(0, 47) + "..."
  }, [])

  const startNewChat = useCallback(() => {
    // Save current session if it has messages
    if (messages.length > 0) {
      const newSession: ChatSession = {
        id: currentSessionId,
        title: generateSessionTitle(messages),
        messages: [...messages],
        timestamp: new Date(),
      }

      setSessions((prev) => {
        const updated = [newSession, ...prev].slice(0, 20) // Keep last 20 sessions
        return updated
      })
    }

    // Clear current chat
    setMessages([])
    setError(null)
    setCurrentSessionId(Date.now().toString())
    localStorage.removeItem(storageKey)
    resetTimeout()
  }, [messages, currentSessionId, generateSessionTitle, storageKey, resetTimeout])

  const loadSession = useCallback(
    (sessionId: string) => {
      const session = sessions.find((s) => s.id === sessionId)
      if (session) {
        // Save current session first if it has messages
        if (messages.length > 0) {
          const currentSession: ChatSession = {
            id: currentSessionId,
            title: generateSessionTitle(messages),
            messages: [...messages],
            timestamp: new Date(),
          }
          setSessions((prev) => [currentSession, ...prev.filter((s) => s.id !== currentSessionId)])
        }

        // Load the selected session
        setMessages(session.messages)
        setCurrentSessionId(session.id)
        setError(null)
        resetTimeout()
      }
    },
    [sessions, messages, currentSessionId, generateSessionTitle, resetTimeout],
  )

  const deleteSession = useCallback((sessionId: string) => {
    setSessions((prev) => {
      const updated = prev.filter((s) => s.id !== sessionId)
      if (updated.length === 0) {
        // If no sessions left, clear localStorage completely
        localStorage.removeItem(SESSIONS_KEY)
      } else {
        localStorage.setItem(SESSIONS_KEY, JSON.stringify(updated))
      }
      return updated
    })
  }, [])

  const clearAllSessions = useCallback(() => {
    setSessions([])
    setMessages([])
    setError(null)
    setCurrentSessionId(Date.now().toString())
    // Clear both localStorage keys
    localStorage.removeItem(SESSIONS_KEY)
    localStorage.removeItem(storageKey)
    resetTimeout()
  }, [storageKey, resetTimeout])

  const sendMessage = useCallback(
    async (content: string) => {
      resetTimeout() // Reset timeout on user activity

      const userMessage: Message = {
        id: Date.now().toString(),
        role: "user",
        content,
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, userMessage])
      setIsLoading(true)
      setError(null)

      try {
        const response = await fetcher([...messages, userMessage], currentSessionId)

        if (!response.ok) {
          throw new Error("Failed to send message")
        }

        const reader = response.body?.getReader()
        if (!reader) {
          throw new Error("No response body")
        }

        const assistantMessage: Message = {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: "",
          timestamp: new Date(),
        }

        setMessages((prev) => [...prev, assistantMessage])

        // Read the stream
        while (true) {
          const { done, value } = await reader.read()
          if (done) break

          const chunk = new TextDecoder().decode(value)
          const lines = chunk.split("\n").filter((line) => line.trim())

          for (const line of lines) {
            if (line.startsWith("data: ")) {
              try {
                const data = JSON.parse(line.slice(6))
                if (data.content) {
                  setMessages((prev) =>
                    prev.map((msg) =>
                      msg.id === assistantMessage.id ? { ...msg, content: msg.content + data.content } : msg,
                    ),
                  )
                }
              } catch (error) {
                console.error("Failed to parse streaming data:", error)
              }
            }
          }
        }
      } catch (error) {
        console.error("Error sending message:", error)
        setError("Sorry, I encountered an error. Please try again.")

        // Remove the user message if there was an error
        setMessages((prev) => prev.filter((msg) => msg.id !== userMessage.id))
      } finally {
        setIsLoading(false)
      }
    },
    [messages, fetcher, currentSessionId, resetTimeout],
  )

  const clearMessages = useCallback(() => {
    setMessages([])
    setError(null)
    localStorage.removeItem(storageKey)
    resetTimeout()
  }, [storageKey, resetTimeout])

  const retryLastMessage = useCallback(() => {
    const lastUserMessage = messages.filter((msg) => msg.role === "user").pop()
    if (lastUserMessage && error) {
      // Remove error state and retry
      setError(null)
      sendMessage(lastUserMessage.content)
    }
  }, [messages, error, sendMessage])

  return {
    messages,
    isLoading,
    error,
    sendMessage,
    clearMessages,
    retryLastMessage,
    startNewChat,
    loadSession,
    deleteSession,
    clearAllSessions, // Export the new clear all function
    sessions,
    currentSessionId,
  }
}
