"use client"

import { Card, CardContent } from "@/components/ui/card"
import { MessageSquare, Brain, CheckCircle, ArrowRight } from "lucide-react"
import { motion } from "framer-motion"

const steps = [
  {
    icon: MessageSquare,
    title: "Ask",
    description: "Submit your fitness, nutrition, or training question in natural language.",
  },
  {
    icon: Brain,
    title: "Analyze",
    description: "Our AI processes your query using evidence-based fitness principles and scientific research.",
  },
  {
    icon: CheckCircle,
    title: "Answer",
    description: "Receive detailed, educational responses with practical guidance you can apply immediately.",
  },
]

export function HowItWorksSection() {
  return (
    <section className="py-24 bg-card/50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            How <span className="text-gradient">Dr. Mike AI</span> works
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Get evidence-based fitness guidance in three simple steps.
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {steps.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="relative"
              >
                <Card className="text-center h-full">
                  <CardContent className="p-8 space-y-4">
                    <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-indigo-500 to-violet-500 flex items-center justify-center">
                      <step.icon className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold">{step.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{step.description}</p>
                  </CardContent>
                </Card>

                {/* Arrow between steps */}
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                    <ArrowRight className="h-6 w-6 text-muted-foreground" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
