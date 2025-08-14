"use client"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { motion } from "framer-motion"

const faqs = [
  {
    question: "Is this medical advice?",
    answer:
      "No, Dr. Mike AI is for educational purposes only and does not provide medical advice. Always consult with healthcare professionals for medical concerns or before starting any new fitness program.",
  },
  {
    question: "How is my data used?",
    answer:
      "We prioritize your privacy. Conversations are used to improve the AI's responses but are not stored with personal identifiers. We do not sell or share your personal data with third parties.",
  },
  {
    question: "What can Dr. Mike AI do well?",
    answer:
      "Dr. Mike AI excels at explaining training principles, program design, nutrition science, periodization concepts, and evidence-based fitness practices. It's great for educational content and general guidance.",
  },
  {
    question: "What can't it do?",
    answer:
      "Dr. Mike AI cannot provide medical advice, diagnose injuries, replace professional coaching for competitive athletes, or give personalized medical recommendations. It's an educational tool, not a replacement for professional guidance.",
  },
  {
    question: "Is it really based on Dr. Mike Israetel's approach?",
    answer:
      "The AI is inspired by Dr. Mike Israetel's educational style and evidence-based approach to fitness, but it's not directly affiliated with or endorsed by Dr. Mike Israetel himself.",
  },
  {
    question: "How accurate are the responses?",
    answer:
      "While we strive for accuracy based on current fitness science, always cross-reference important information with peer-reviewed research or qualified professionals. The AI is a learning tool, not an infallible source.",
  },
]

export function FAQSection() {
  return (
    <section id="faq" className="py-24 bg-card/50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Frequently asked <span className="text-gradient">questions</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Everything you need to know about Dr. Mike AI and how it works.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto"
        >
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border rounded-lg px-6">
                <AccordionTrigger className="text-left hover:no-underline py-6">
                  <span className="font-semibold">{faq.question}</span>
                </AccordionTrigger>
                <AccordionContent className="pb-6 text-muted-foreground leading-relaxed">{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  )
}
