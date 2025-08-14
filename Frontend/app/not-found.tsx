import Link from "next/link"
import { Button } from "@/components/ui/button"
import { MessageCircle, Home, ArrowLeft } from "lucide-react"

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center space-y-6 max-w-md mx-auto px-4">
        <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-indigo-500 to-violet-500 flex items-center justify-center">
          <MessageCircle className="h-10 w-10 text-white" />
        </div>

        <div className="space-y-2">
          <h1 className="text-4xl font-bold">404</h1>
          <h2 className="text-2xl font-semibold text-muted-foreground">Page Not Found</h2>
          <p className="text-muted-foreground">
            The page you're looking for doesn't exist. Let's get you back on track with your fitness journey.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button asChild className="gradient-accent text-white">
            <Link href="/" className="flex items-center gap-2">
              <Home className="h-4 w-4" />
              Go Home
            </Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/chat" className="flex items-center gap-2">
              <MessageCircle className="h-4 w-4" />
              Start Chatting
            </Link>
          </Button>
        </div>

        <Button asChild variant="ghost" className="text-sm">
          <Link href="javascript:history.back()" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            Go Back
          </Link>
        </Button>
      </div>
    </div>
  )
}
