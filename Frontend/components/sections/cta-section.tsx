"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"
import { ArrowRight, MessageCircle } from "lucide-react"
import { motion } from "framer-motion"

export function CTASection() {
  return (
    <section className="py-24">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <Card className="gradient-accent glow-accent overflow-hidden">
            <CardContent className="p-12 text-center text-white space-y-6">
              <div className="w-16 h-16 mx-auto rounded-full bg-white/20 flex items-center justify-center">
                <MessageCircle className="h-8 w-8" />
              </div>

              <div className="space-y-4">
                <h2 className="text-3xl md:text-4xl font-bold">Ready to level up your fitness knowledge?</h2>
                <p className="text-xl text-white/90 max-w-2xl mx-auto">
                  Start chatting with Dr. Mike AI today and get evidence-based answers to all your training and
                  nutrition questions.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
                <Button asChild size="lg" variant="secondary" className="bg-white text-gray-900 hover:bg-white/90">
                  <Link href="/chat" className="flex items-center gap-2">
                    Start chatting now
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild variant="ghost" size="lg" className="text-white hover:bg-white/10">
                  <Link href="#features">Learn more</Link>
                </Button>
              </div>

              <p className="text-sm text-white/70 pt-4">Educational purposes only. Not medical advice.</p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}
