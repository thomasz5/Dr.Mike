import { MessageCircle } from "lucide-react"

export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center space-y-4">
        <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-indigo-500 to-violet-500 flex items-center justify-center animate-pulse">
          <MessageCircle className="h-8 w-8 text-white" />
        </div>
        <div className="space-y-2">
          <h2 className="text-xl font-semibold">Loading Dr. Mike AI</h2>
          <p className="text-muted-foreground">Preparing your fitness coach...</p>
        </div>
        <div className="flex justify-center space-x-1">
          <div className="w-2 h-2 bg-foreground/60 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
          <div className="w-2 h-2 bg-foreground/60 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
          <div className="w-2 h-2 bg-foreground/60 rounded-full animate-bounce"></div>
        </div>
      </div>
    </div>
  )
}
