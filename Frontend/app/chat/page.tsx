"use client"

import { useState, useCallback } from "react"
import { ChatSidebar } from "@/components/chat/chat-sidebar"
import { ChatArea } from "@/components/chat/chat-area"
import { ChatTips } from "@/components/chat/chat-tips"
import { DisclaimerBanner } from "@/components/chat/disclaimer-banner"
import { Button } from "@/components/ui/button"
import { PanelRightOpen } from "lucide-react"
import { useChat } from "@/hooks/use-chat"

export default function ChatPage() {
  const [showTips, setShowTips] = useState(true)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const {
    messages,
    isLoading,
    error,
    sendMessage,
    clearMessages,
    retryLastMessage,
    startNewChat,
    loadSession,
    deleteSession,
    clearAllSessions, // Added clearAllSessions function
    sessions,
    currentSessionId,
  } = useChat({
    onSessionTimeout: () => {
      // Show a toast or notification that session timed out and new chat started
      console.log("Session timed out, started new chat")
    },
  })

  const handlePromptClick = useCallback((prompt: string) => {
    // This will be passed to ChatArea to set the input
    // Implementation handled through ref or state lifting
  }, [])

  return (
    <div className="h-screen flex flex-col bg-background">
      <DisclaimerBanner />

      <div className="flex-1 flex overflow-hidden">
        {/* Mobile sidebar overlay */}
        {sidebarOpen && (
          <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
        )}

        {/* Left Sidebar */}
        <div
          className={`
          fixed lg:relative inset-y-0 left-0 z-50 w-64 bg-card border-r border-border
          transform transition-transform duration-200 ease-in-out lg:transform-none
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}
        >
          <ChatSidebar
            onClose={() => setSidebarOpen(false)}
            sessions={sessions}
            currentSessionId={currentSessionId}
            onNewChat={startNewChat}
            onLoadSession={loadSession}
            onDeleteSession={deleteSession}
            onClearAllSessions={clearAllSessions} // Added clearAllSessions prop
          />
        </div>

        {/* Main Chat Area */}
        <div className="flex-1 flex flex-col min-w-0">
          <div className="flex-1 flex">
            <div className="flex-1 flex flex-col">
              <ChatArea
                onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
                showSidebarButton={!sidebarOpen}
                onSetInput={handlePromptClick}
                messages={messages}
                isLoading={isLoading}
                error={error}
                onSendMessage={sendMessage}
                onRetry={retryLastMessage}
                onClear={clearMessages}
              />
            </div>

            {/* Right Tips Panel */}
            {showTips && (
              <div className="hidden xl:block w-80 border-l border-border bg-card/50">
                <ChatTips onClose={() => setShowTips(false)} onPromptClick={handlePromptClick} />
              </div>
            )}
          </div>
        </div>

        {/* Tips toggle button for smaller screens */}
        {!showTips && (
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setShowTips(true)}
            className="fixed bottom-4 right-4 z-30 xl:hidden shadow-lg"
          >
            <PanelRightOpen className="h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  )
}
