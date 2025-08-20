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

  // Convert bold-only section lines like **Title:** into actual Markdown headings for better readability
  const formatAssistantContent = (content: string) => {
    const lines = content.split("\n")
    const transformed: string[] = []

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i]
      const trimmed = line.trim()

      // Match lines that are just bold text optionally ending with a colon, e.g. **Main Point:**
      const headingMatch = /^\*\*(.+?)\*\*:?$/.exec(trimmed)
      if (headingMatch) {
        transformed.push(`### ${headingMatch[1]}`)
        // Ensure a blank line after headings for Markdown correctness
        if (i + 1 < lines.length && lines[i + 1].trim() !== "") {
          transformed.push("")
        }
        continue
      }

      transformed.push(line)
    }

    return transformed.join("\n")
  }

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

          <div className={`dark:prose-invert max-w-none ${
            message.role === "assistant" ? "prose prose-base md:prose-lg" : "prose prose-sm"
          }`}>
            {message.role === "user" ? (
              <p className="whitespace-pre-wrap">{message.content}</p>
            ) : (
              <ReactMarkdown
                components={{
                  h1({ children, ...props }) {
                    return (
                      <h1 className="text-2xl md:text-3xl font-bold leading-snug" {...props}>
                        {children}
                      </h1>
                    )
                  },
                  h2({ children, ...props }) {
                    return (
                      <h2 className="text-xl md:text-2xl font-semibold leading-snug" {...props}>
                        {children}
                      </h2>
                    )
                  },
                  h3({ children, ...props }) {
                    return (
                      <h3 className="text-lg md:text-xl font-semibold leading-snug" {...props}>
                        {children}
                      </h3>
                    )
                  },
                  p({ children, ...props }) {
                    return (
                      <p className="text-base md:text-[17px] leading-relaxed" {...props}>
                        {children}
                      </p>
                    )
                  },
                  ul({ children, ...props }) {
                    return (
                      <ul className="list-disc pl-5 space-y-1" {...props}>
                        {children}
                      </ul>
                    )
                  },
                  ol({ children, ...props }) {
                    return (
                      <ol className="list-decimal pl-5 space-y-1" {...props}>
                        {children}
                      </ol>
                    )
                  },
                  li({ children, ...props }) {
                    return (
                      <li className="leading-relaxed" {...props}>
                        {children}
                      </li>
                    )
                  },
                  strong({ children, ...props }) {
                    return (
                      <strong className="font-semibold" {...props}>
                        {children}
                      </strong>
                    )
                  },
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
                {formatAssistantContent(message.content)}
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
