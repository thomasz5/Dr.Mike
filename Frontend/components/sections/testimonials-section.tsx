"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Star } from "lucide-react"
import { motion } from "framer-motion"

// Placeholder testimonials for future implementation
const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Fitness Enthusiast",
    content:
      "Dr. Mike AI helped me understand the science behind my training. The explanations are clear and actionable.",
    rating: 5,
  },
  {
    name: "Mike Chen",
    role: "Personal Trainer",
    content:
      "As a trainer, I use Dr. Mike AI to double-check my programming decisions. It's like having a research assistant.",
    rating: 5,
  },
  {
    name: "Emma Rodriguez",
    role: "Powerlifter",
    content:
      "The periodization advice I got helped me break through my squat plateau. Evidence-based coaching at its best.",
    rating: 5,
  },
]

export function TestimonialsSection() {
  return (
    <section className="py-24">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Trusted by <span className="text-gradient">fitness enthusiasts</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            See what people are saying about their experience with Dr. Mike AI.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full">
                <CardContent className="p-6 space-y-4">
                  {/* Rating */}
                  <div className="flex gap-1">
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>

                  {/* Content */}
                  <p className="text-muted-foreground leading-relaxed">"{testimonial.content}"</p>

                  {/* Author */}
                  <div className="flex items-center gap-3 pt-4 border-t">
                    <Skeleton className="w-10 h-10 rounded-full" />
                    <div>
                      <p className="font-semibold">{testimonial.name}</p>
                      <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
