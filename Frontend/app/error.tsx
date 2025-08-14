"use client"

import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { AlertTriangle, RefreshCw, Home } from "lucide-react"
import Link from "next/link"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center space-y-6 max-w-md mx-auto px-4">
        <div className="w-20 h-20 mx-auto rounded-full bg-destructive/10 flex items-center justify-center">
          <AlertTriangle className="h-10 w-10 text-destructive" />
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl font-bold">Something went wrong</h1>
          <p className="text-muted-foreground">
            We encountered an error while loading Dr. Mike AI. Don't worry, we're here to help you get back on track.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button onClick={reset} className="gradient-accent text-white flex items-center gap-2">
            <RefreshCw className="h-4 w-4" />
            Try Again
          </Button>
          <Button asChild variant="outline">
            <Link href="/" className="flex items-center gap-2">
              <Home className="h-4 w-4" />
              Go Home
            </Link>
          </Button>
        </div>

        {process.env.NODE_ENV === "development" && (
          <details className="text-left bg-muted p-4 rounded-lg text-sm">
            <summary className="cursor-pointer font-medium mb-2">Error Details (Development)</summary>
            <pre className="whitespace-pre-wrap text-xs text-muted-foreground">
              {error.message}
              {error.stack}
            </pre>
          </details>
        )}
      </div>
    </div>
  )
}
