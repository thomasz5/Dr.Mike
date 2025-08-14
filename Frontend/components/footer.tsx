import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { MessageCircle, Twitter, Github, Mail } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <MessageCircle className="h-6 w-6 text-gradient" />
              <span className="text-lg font-bold">Dr. Mike AI</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Evidence-informed fitness answers, inspired by Dr. Mike Israetel's educational approach.
            </p>
            <div className="flex space-x-2">
              <Button variant="ghost" size="icon">
                <Twitter className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon">
                <Github className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon">
                <Mail className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Product */}
          <div className="space-y-4">
            <h3 className="font-semibold">Product</h3>
            <div className="space-y-2 text-sm">
              <Link href="#features" className="block text-muted-foreground hover:text-foreground">
                Features
              </Link>
              <Link href="/chat" className="block text-muted-foreground hover:text-foreground">
                Chat
              </Link>
              <Link href="#pricing" className="block text-muted-foreground hover:text-foreground">
                Pricing
              </Link>
            </div>
          </div>

          {/* Support */}
          <div className="space-y-4">
            <h3 className="font-semibold">Support</h3>
            <div className="space-y-2 text-sm">
              <Link href="#faq" className="block text-muted-foreground hover:text-foreground">
                FAQ
              </Link>
              <Link href="/privacy" className="block text-muted-foreground hover:text-foreground">
                Privacy
              </Link>
              <Link href="/terms" className="block text-muted-foreground hover:text-foreground">
                Terms
              </Link>
            </div>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <h3 className="font-semibold">Stay Updated</h3>
            <p className="text-sm text-muted-foreground">Get the latest updates on new features and improvements.</p>
            <div className="flex space-x-2">
              <Input placeholder="Enter your email" className="flex-1" />
              <Button size="sm" className="gradient-accent text-white">
                Subscribe
              </Button>
            </div>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 text-center text-sm text-muted-foreground">
          <p>© 2024 Dr. Mike AI. Educational purposes only. Not medical advice.</p>
        </div>
      </div>
    </footer>
  )
}
