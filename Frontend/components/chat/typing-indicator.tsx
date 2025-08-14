import { Bot } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export function TypingIndicator() {
  return (
    <div className="flex gap-4">
      <div className="flex-shrink-0">
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-violet-500 flex items-center justify-center">
          <Bot className="h-4 w-4 text-white" />
        </div>
      </div>

      <div className="flex-1">
        <Badge variant="secondary" className="text-xs mb-2">
          Dr. Mike AI
        </Badge>
        <div className="flex items-center gap-1">
          <div className="flex space-x-1">
            <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce [animation-delay:-0.3s]"></div>
            <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce [animation-delay:-0.15s]"></div>
            <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
          </div>
          <span className="text-sm text-muted-foreground ml-2">Thinking...</span>
        </div>
      </div>
    </div>
  )
}
