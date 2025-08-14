"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { MessageSquare, Plus, Settings, HelpCircle, Trash2, X, Home } from "lucide-react"
import Link from "next/link"

interface ChatSession {
  id: string
  title: string
  timestamp: Date
}

interface ChatSidebarProps {
  onClose: () => void
  sessions: ChatSession[]
  currentSessionId: string
  onNewChat: () => void
  onLoadSession: (sessionId: string) => void
  onDeleteSession: (sessionId: string) => void
  onClearAllSessions: () => void // Add clear all sessions prop
}

export function ChatSidebar({
  onClose,
  sessions,
  currentSessionId,
  onNewChat,
  onLoadSession,
  onDeleteSession,
  onClearAllSessions, // Add clear all sessions prop
}: ChatSidebarProps) {
  const formatTimestamp = (date: Date) => {
    const now = new Date()
    const diff = now.getTime() - date.getTime()
    const minutes = Math.floor(diff / (1000 * 60))
    const hours = Math.floor(diff / (1000 * 60 * 60))
    const days = Math.floor(diff / (1000 * 60 * 60 * 24))

    if (minutes < 60) return `${minutes}m ago`
    if (hours < 24) return `${hours}h ago`
    return `${days}d ago`
  }

  const handleDeleteSession = (e: React.MouseEvent, sessionId: string) => {
    e.stopPropagation()
    onDeleteSession(sessionId)
  }

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between">
          <h2 className="font-semibold">Dr. Mike AI</h2>
          <Button variant="ghost" size="icon" onClick={onClose} className="lg:hidden">
            <X className="h-4 w-4" />
          </Button>
        </div>
        <Button
          className="w-full mt-3 gradient-accent text-white hover:opacity-90 hover:scale-105 transition-all duration-200 hover:shadow-lg"
          size="sm"
          onClick={onNewChat}
        >
          <Plus className="h-4 w-4 mr-2" />
          New Chat
        </Button>
      </div>

      {/* Chat Sessions */}
      <ScrollArea className="flex-1 px-2">
        <div className="space-y-1 py-2">
          {sessions.length > 0 && (
            <Button
              variant="ghost"
              size="sm"
              className="w-full justify-start text-destructive hover:text-destructive hover:bg-destructive/10 mb-2"
              onClick={onClearAllSessions}
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Clear All Chats
            </Button>
          )}

          {sessions.map((session) => (
            <div
              key={session.id}
              className={`group flex items-center gap-2 p-2 rounded-lg hover:bg-accent cursor-pointer transition-colors ${
                session.id === currentSessionId ? "bg-accent" : ""
              }`}
              onClick={() => onLoadSession(session.id)}
            >
              <MessageSquare className="h-4 w-4 text-muted-foreground flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{session.title}</p>
                <p className="text-xs text-muted-foreground">{formatTimestamp(session.timestamp)}</p>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={(e) => handleDeleteSession(e, session.id)}
              >
                <Trash2 className="h-3 w-3" />
              </Button>
            </div>
          ))}

          {sessions.length === 0 && (
            <div className="text-center text-muted-foreground text-sm py-8">
              No chat history yet.
              <br />
              Start a conversation to see your chats here.
            </div>
          )}
        </div>
      </ScrollArea>

      {/* Footer */}
      <div className="p-4 border-t border-border space-y-2">
        <Button variant="ghost" size="sm" className="w-full justify-start" asChild>
          <Link href="/">
            <Home className="h-4 w-4 mr-2" />
            Back to Home
          </Link>
        </Button>
        <Button variant="ghost" size="sm" className="w-full justify-start">
          <Settings className="h-4 w-4 mr-2" />
          Settings
        </Button>
        <Button variant="ghost" size="sm" className="w-full justify-start" asChild>
          <Link href="#faq">
            <HelpCircle className="h-4 w-4 mr-2" />
            FAQ
          </Link>
        </Button>
      </div>
    </div>
  )
}
