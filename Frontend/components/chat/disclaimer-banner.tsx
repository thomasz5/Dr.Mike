import { AlertTriangle } from "lucide-react"

export function DisclaimerBanner() {
  return (
    <div className="bg-destructive/10 border-b border-destructive/20 px-4 py-2">
      <div className="flex items-center justify-center gap-2 text-sm">
        <AlertTriangle className="h-4 w-4 text-destructive" />
        <span className="text-destructive font-medium">Educational only. Not medical advice.</span>
      </div>
    </div>
  )
}
