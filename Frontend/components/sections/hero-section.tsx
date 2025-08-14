"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { ArrowRight, Shield, Clock, BookOpen } from "lucide-react"
import { motion } from "framer-motion"

export function HeroSection() {
  const scrollToDemo = () => {
    document.getElementById("demo")?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background gradient and particles */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-background/50">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(99,102,241,0.1),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(139,92,246,0.1),transparent_50%)]" />
      </div>

      {/* Subtle particle field */}
      <div className="absolute inset-0">
        {Array.from({ length: 50 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-foreground/20 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Number.POSITIVE_INFINITY,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto space-y-8"
        >
          {/* Main headline */}
          <div className="space-y-4">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight">
              Evidence-informed fitness
              <br />
              <span className="text-gradient">answers. Instantly.</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              A conversational coach inspired by Dr. Mike Israetel's educational style—here to help you reason about
              training, nutrition, and recovery.
            </p>
          </div>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Button asChild size="lg" className="gradient-accent text-white hover:opacity-90 glow-accent">
              <Link href="/chat" className="flex items-center gap-2">
                Start chatting
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={scrollToDemo}
              className="flex items-center gap-2 bg-transparent"
            >
              See how it works
              <ArrowRight className="h-4 w-4" />
            </Button>
          </motion.div>

          {/* Trust badges */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-wrap justify-center gap-4 pt-8"
          >
            <Badge variant="secondary" className="flex items-center gap-2 px-4 py-2">
              <BookOpen className="h-4 w-4" />
              Educational only
            </Badge>
            <Badge variant="secondary" className="flex items-center gap-2 px-4 py-2">
              <Shield className="h-4 w-4" />
              No medical advice
            </Badge>
            <Badge variant="secondary" className="flex items-center gap-2 px-4 py-2">
              <Clock className="h-4 w-4" />
              24/7 Available
            </Badge>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
