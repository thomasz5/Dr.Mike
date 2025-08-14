"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Copy, Check, Trash2 } from "lucide-react"
import { User, Bot } from "lucide-react"
import ReactMarkdown from "react-markdown"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism"

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: Date
}

interface ChatMessageProps {
  message: Message
}

export function ChatMessage({ message }: ChatMessageProps) {
  const [copied, setCopied] = useState(false)
  const [showActions, setShowActions] = useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(message.content)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

  return (
    <div
      className="group relative"
      onMouseEnter={() => setShowActions(true)}
      onMouseLeave={() => setShowActions(false)}
    >
      <div className="flex gap-4">
        {/* Avatar */}
        <div className="flex-shrink-0">
          {message.role === "user" ? (
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
              <User className="h-4 w-4 text-primary-foreground" />
            </div>
          ) : (
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-violet-500 flex items-center justify-center">
              <Bot className="h-4 w-4 text-white" />
            </div>
          )}
        </div>

        {/* Message content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2">
            <Badge variant="secondary" className="text-xs">
              {message.role === "user" ? "You" : "Dr. Mike AI"}
            </Badge>
            <span className="text-xs text-muted-foreground">{formatTime(message.timestamp)}</span>
          </div>

          <div className="prose prose-sm dark:prose-invert max-w-none">
            {message.role === "user" ? (
              <p className="whitespace-pre-wrap">{message.content}</p>
            ) : (
              <ReactMarkdown
                components={{
                  code({ node, inline, className, children, ...props }) {
                    const match = /language-(\w+)/.exec(className || "")
                    return !inline && match ? (
                      <div className="relative">
                        <SyntaxHighlighter
                          style={oneDark}
                          language={match[1]}
                          PreTag="div"
                          className="rounded-md"
                          {...props}
                        >
                          {String(children).replace(/\n$/, "")}
                        </SyntaxHighlighter>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="absolute top-2 right-2 h-6 w-6"
                          onClick={() => navigator.clipboard.writeText(String(children))}
                        >
                          <Copy className="h-3 w-3" />
                        </Button>
                      </div>
                    ) : (
                      <code className={className} {...props}>
                        {children}
                      </code>
                    )
                  },
                }}
              >
                {message.content}
              </ReactMarkdown>
            )}
          </div>
        </div>
      </div>

      {/* Hover actions */}
      {showActions && (
        <div className="absolute top-0 right-0 flex gap-1 bg-background border border-border rounded-md p-1 shadow-sm">
          <Button variant="ghost" size="icon" className="h-6 w-6" onClick={handleCopy}>
            {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
          </Button>
          <Button variant="ghost" size="icon" className="h-6 w-6 text-destructive hover:text-destructive">
            <Trash2 className="h-3 w-3" />
          </Button>
        </div>
      )}
    </div>
  )
}
