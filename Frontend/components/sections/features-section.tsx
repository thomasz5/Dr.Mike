"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Brain, Dumbbell, Apple, TrendingUp } from "lucide-react"
import { motion } from "framer-motion"

const features = [
  {
    icon: Brain,
    title: "Evidence-aware answers",
    description: "Get responses grounded in scientific literature and evidence-based practices for optimal results.",
  },
  {
    icon: Dumbbell,
    title: "Program heuristics",
    description: "Understand training principles and program design concepts to build effective workout routines.",
  },
  {
    icon: Apple,
    title: "Nutrition Q&A",
    description: "Navigate nutrition science with clear explanations of macros, timing, and dietary strategies.",
  },
  {
    icon: TrendingUp,
    title: "Periodization basics",
    description: "Learn how to structure training phases and progression for long-term strength and muscle gains.",
  },
]

export function FeaturesSection() {
  return (
    <section id="features" className="py-24 bg-card/50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Your AI fitness coach, <span className="text-gradient">backed by science</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Get personalized guidance on training, nutrition, and recovery based on evidence-based principles.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="card-hover h-full">
                <CardContent className="p-6 text-center space-y-4">
                  <div className="w-12 h-12 mx-auto rounded-lg bg-gradient-to-br from-indigo-500 to-violet-500 flex items-center justify-center">
                    <feature.icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold">{feature.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
