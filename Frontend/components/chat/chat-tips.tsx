"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { X, Lightbulb, Target, BookOpen, Zap } from "lucide-react"

interface ChatTipsProps {
  onClose: () => void
  onPromptClick?: (prompt: string) => void
}

export function ChatTips({ onClose, onPromptClick }: ChatTipsProps) {
  const tips = [
    {
      icon: Target,
      title: "Be Specific",
      content: "Instead of 'How do I get stronger?', try 'How should I progress my bench press from 135lbs to 185lbs?'",
    },
    {
      icon: BookOpen,
      title: "Ask for Evidence",
      content: "Request scientific backing: 'What does research say about optimal rest periods for strength training?'",
    },
    {
      icon: Lightbulb,
      title: "Context Matters",
      content: "Include your experience level, goals, and current situation for more tailored advice.",
    },
  ]

  const shortcuts = [
    { command: "/clear", description: "Clear conversation history" },
    { command: "Shift + Enter", description: "New line in message" },
    { command: "Enter", description: "Send message" },
    { command: "Esc", description: "Clear current input" },
  ]

  const sampleQuestions = [
    "How do I calculate my maintenance calories?",
    "What's the difference between hypertrophy and strength training?",
    "Should I do cardio before or after weights?",
    "How much sleep do I need for recovery?",
    "What's the best rep range for muscle growth?",
    "How do I fix my squat depth issues?",
    "What supplements are actually worth taking?",
    "How do I structure a cutting phase?",
  ]

  const handlePromptClick = (question: string) => {
    if (onPromptClick) {
      onPromptClick(question)
    }
  }

  return (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b border-border flex items-center justify-between">
        <h3 className="font-semibold">Tips & Shortcuts</h3>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </div>

      <ScrollArea className="flex-1 p-4">
        <div className="space-y-6">
          {/* Tips */}
          <div>
            <h4 className="font-medium mb-3 text-sm text-muted-foreground uppercase tracking-wide">
              Getting Better Answers
            </h4>
            <div className="space-y-3">
              {tips.map((tip, index) => (
                <Card key={index} className="p-3">
                  <div className="flex gap-3">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-500 flex items-center justify-center flex-shrink-0">
                      <tip.icon className="h-4 w-4 text-white" />
                    </div>
                    <div>
                      <h5 className="font-medium text-sm mb-1">{tip.title}</h5>
                      <p className="text-xs text-muted-foreground leading-relaxed">{tip.content}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Shortcuts */}
          <div>
            <h4 className="font-medium mb-3 text-sm text-muted-foreground uppercase tracking-wide">
              Keyboard Shortcuts
            </h4>
            <div className="space-y-2">
              {shortcuts.map((shortcut, index) => (
                <div key={index} className="flex justify-between items-center py-2 px-3 rounded-lg bg-muted/50">
                  <code className="text-xs font-mono bg-background px-2 py-1 rounded">{shortcut.command}</code>
                  <span className="text-xs text-muted-foreground">{shortcut.description}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Sample Questions */}
          <div>
            <h4 className="font-medium mb-3 text-sm text-muted-foreground uppercase tracking-wide flex items-center gap-2">
              <Zap className="h-3 w-3" />
              Quick Start Questions
            </h4>
            <div className="space-y-2">
              {sampleQuestions.map((question, index) => (
                <Button
                  key={index}
                  variant="ghost"
                  className="w-full text-left h-auto p-3 text-xs whitespace-normal hover:bg-accent/50 transition-colors"
                  onClick={() => handlePromptClick(question)}
                >
                  <div className="flex items-start gap-2">
                    <div className="w-1 h-1 rounded-full bg-gradient-to-br from-indigo-500 to-violet-500 mt-2 flex-shrink-0" />
                    <span>{question}</span>
                  </div>
                </Button>
              ))}
            </div>
          </div>
        </div>
      </ScrollArea>
    </div>
  )
}
