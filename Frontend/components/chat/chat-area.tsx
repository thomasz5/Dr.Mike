"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { ScrollArea } from "@/components/ui/scroll-area"
import { ChatMessage } from "@/components/chat/chat-message"
import { TypingIndicator } from "@/components/chat/typing-indicator"
import { Send, Menu, RefreshCw, AlertCircle } from "lucide-react"

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: Date
}

interface ChatAreaProps {
  onToggleSidebar: () => void
  showSidebarButton: boolean
  onSetInput?: (input: string) => void
  messages: Message[]
  isLoading: boolean
  error: string | null
  onSendMessage: (message: string) => Promise<void>
  onRetry: () => void
  onClear: () => void
}

export function ChatArea({
  onToggleSidebar,
  showSidebarButton,
  onSetInput,
  messages,
  isLoading,
  error,
  onSendMessage,
  onRetry,
  onClear,
}: ChatAreaProps) {
  const [input, setInput] = useState("")
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const scrollAreaRef = useRef<HTMLDivElement>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (onSetInput) {
      const setInputHandler = (newInput: string) => {
        setInput(newInput)
        textareaRef.current?.focus()
      }
      ;(window as any).setInputHandler = setInputHandler
    }
  }, [onSetInput])

  useEffect(() => {
    const scrollToBottom = () => {
      if (messagesEndRef.current) {
        messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
      }
    }

    const timeoutId = setTimeout(scrollToBottom, 100)
    return () => clearTimeout(timeoutId)
  }, [messages, isLoading])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return

    const message = input.trim()
    setInput("")

    if (textareaRef.current) {
      textareaRef.current.style.height = "auto"
    }

    await onSendMessage(message)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSubmit(e)
    }
    if (e.key === "Escape") {
      setInput("")
      if (textareaRef.current) {
        textareaRef.current.style.height = "auto"
      }
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value
    setInput(value)

    if (value === "/clear") {
      onClear()
      setInput("")
      return
    }

    const textarea = e.target
    textarea.style.height = "auto"
    textarea.style.height = Math.min(textarea.scrollHeight, 120) + "px"
  }

  const handleExampleClick = (prompt: string) => {
    setInput(prompt)
    textareaRef.current?.focus()
  }

  return (
    <div className="h-full flex flex-col overflow-hidden">
      <div className="border-b border-border p-4 flex items-center gap-3 flex-shrink-0">
        {showSidebarButton && (
          <Button variant="ghost" size="icon" onClick={onToggleSidebar} className="lg:hidden">
            <Menu className="h-4 w-4" />
          </Button>
        )}
        <div>
          <h1 className="font-semibold">Dr. Mike AI</h1>
          <p className="text-sm text-muted-foreground">Your evidence-based fitness coach</p>
        </div>
      </div>

      <div className="flex-1 overflow-hidden">
        <ScrollArea ref={scrollAreaRef} className="h-full">
          <div className="p-4">
            <div className="space-y-6 max-w-4xl mx-auto">
              {messages.length === 0 && (
                <div className="text-center py-12">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-indigo-500 to-violet-500 flex items-center justify-center">
                    <Send className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Start a conversation</h3>
                  <p className="text-muted-foreground mb-4">Ask me anything about training, nutrition, or recovery!</p>
                  <div className="flex flex-wrap gap-2 justify-center">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleExampleClick("How should I structure my push/pull/legs routine?")}
                    >
                      Push/Pull/Legs routine
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleExampleClick("What's the optimal protein intake for muscle growth?")}
                    >
                      Protein intake
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleExampleClick("How do I break through a bench press plateau?")}
                    >
                      Bench press plateau
                    </Button>
                  </div>
                </div>
              )}

              {messages.map((message) => (
                <ChatMessage key={message.id} message={message} />
              ))}

              {isLoading && <TypingIndicator />}

              {error && (
                <div className="flex items-center gap-3 p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
                  <AlertCircle className="h-5 w-5 text-destructive flex-shrink-0" />
                  <div className="flex-1">
                    <p className="text-sm text-destructive font-medium">Something went wrong</p>
                    <p className="text-xs text-destructive/80">{error}</p>
                  </div>
                  <Button variant="outline" size="sm" onClick={onRetry}>
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Retry
                  </Button>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>
          </div>
        </ScrollArea>
      </div>

      <div className="border-t border-border p-4 flex-shrink-0 bg-background">
        <form onSubmit={handleSubmit} className="max-w-4xl mx-auto w-full">
          <div className="flex gap-3 items-end">
            <div className="flex-1 relative">
              <Textarea
                ref={textareaRef}
                value={input}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                placeholder="Ask about training, nutrition, or recovery... (Shift+Enter for new line, /clear to reset, Esc to clear input)"
                className="min-h-[44px] max-h-[120px] resize-none pr-12"
                disabled={isLoading}
              />
            </div>
            <Button
              type="submit"
              disabled={!input.trim() || isLoading}
              className="gradient-accent text-white hover:opacity-90"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            Dr. Mike AI can make mistakes. Always verify important information.
          </p>
        </form>
      </div>
    </div>
  )
}
