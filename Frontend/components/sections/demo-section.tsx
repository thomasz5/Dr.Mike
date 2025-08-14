"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MessageCircle, User, Bot } from "lucide-react"
import { motion } from "framer-motion"

const examplePrompts = [
  "How should I structure my push/pull/legs routine?",
  "What's the optimal protein intake for muscle growth?",
  "How do I break through a bench press plateau?",
]

const mockResponses = {
  "How should I structure my push/pull/legs routine?": `A well-structured push/pull/legs routine typically follows these principles:

**Push Day (Chest, Shoulders, Triceps):**
- Start with compound movements (bench press, overhead press)
- Follow with isolation work (lateral raises, tricep extensions)
- 12-16 sets total for chest, 8-12 for shoulders, 6-10 for triceps

**Pull Day (Back, Biceps):**
- Begin with vertical pulls (pull-ups, lat pulldowns)
- Add horizontal pulls (rows)
- Finish with bicep isolation
- 14-18 sets for back, 6-10 for biceps

**Legs (Quads, Hamstrings, Glutes, Calves):**
- Prioritize compound movements (squats, deadlifts)
- Include unilateral work (lunges, single-leg RDLs)
- 16-20 sets total for legs

Run this 3-6x per week depending on your recovery capacity and training experience.`,
  "What's the optimal protein intake for muscle growth?": `For muscle protein synthesis and growth, research suggests:

**General Recommendations:**
- 1.6-2.2g per kg of body weight daily
- For a 70kg person: 112-154g protein daily
- Higher end for cutting phases or older individuals

**Timing Considerations:**
- 20-40g per meal for optimal MPS stimulation
- Post-workout: 25-40g within 2 hours
- Before bed: 20-30g casein for overnight recovery

**Quality Matters:**
- Complete proteins with all essential amino acids
- Leucine content of 2.5-3g per meal triggers MPS
- Mix animal and plant sources for variety

Remember, total daily intake matters more than precise timing for most people.`,
  "How do I break through a bench press plateau?": `Plateau-busting strategies for bench press:

**Programming Adjustments:**
- Vary rep ranges (3-5, 6-8, 8-12)
- Add pause reps to improve strength off chest
- Include tempo work (3-second negatives)
- Try different grip widths

**Accessory Work:**
- Close-grip bench for tricep strength
- Incline press for upper chest development  
- Dips for lockout strength
- Face pulls for rear delt balance

**Technical Improvements:**
- Work on leg drive and arch
- Practice competition commands if powerlifting
- Film yourself to check bar path

**Recovery Factors:**
- Ensure adequate sleep (7-9 hours)
- Manage stress levels
- Consider a deload week every 4-6 weeks

Sometimes stepping back 10-15% and building back up breaks through sticking points.`,
}

export function DemoSection() {
  const [selectedPrompt, setSelectedPrompt] = useState<string | null>(null)
  const [isTyping, setIsTyping] = useState(false)
  const [displayedResponse, setDisplayedResponse] = useState("")

  const handlePromptClick = (prompt: string) => {
    setSelectedPrompt(prompt)
    setIsTyping(true)
    setDisplayedResponse("")

    // Simulate typing effect
    const response = mockResponses[prompt as keyof typeof mockResponses]
    let index = 0
    const typeInterval = setInterval(() => {
      if (index < response.length) {
        setDisplayedResponse(response.slice(0, index + 1))
        index++
      } else {
        setIsTyping(false)
        clearInterval(typeInterval)
      }
    }, 20)
  }

  return (
    <section id="demo" className="py-24">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            See <span className="text-gradient">Dr. Mike AI</span> in action
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Try these example questions to see how our AI coach provides evidence-based fitness guidance.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <Card className="overflow-hidden">
            <CardHeader className="bg-destructive/10 border-b">
              <div className="flex items-center gap-2">
                <MessageCircle className="h-5 w-5 text-destructive" />
                <span className="text-sm font-medium text-destructive">Educational only. Not medical advice.</span>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="h-96 overflow-y-auto p-6 space-y-4">
                {!selectedPrompt && (
                  <div className="text-center space-y-4">
                    <p className="text-muted-foreground">Choose a question to see how Dr. Mike AI responds:</p>
                    <div className="flex flex-wrap gap-2 justify-center">
                      {examplePrompts.map((prompt) => (
                        <Button
                          key={prompt}
                          variant="outline"
                          size="sm"
                          onClick={() => handlePromptClick(prompt)}
                          className="text-left h-auto p-3 whitespace-normal max-w-xs"
                        >
                          {prompt}
                        </Button>
                      ))}
                    </div>
                  </div>
                )}

                {selectedPrompt && (
                  <>
                    {/* User message */}
                    <div className="flex gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                        <User className="h-4 w-4 text-primary-foreground" />
                      </div>
                      <div className="flex-1">
                        <Badge variant="secondary" className="mb-2">
                          User
                        </Badge>
                        <p>{selectedPrompt}</p>
                      </div>
                    </div>

                    {/* AI response */}
                    <div className="flex gap-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-violet-500 flex items-center justify-center flex-shrink-0">
                        <Bot className="h-4 w-4 text-white" />
                      </div>
                      <div className="flex-1">
                        <Badge variant="secondary" className="mb-2">
                          Dr. Mike AI
                        </Badge>
                        <div className="prose prose-sm dark:prose-invert max-w-none">
                          <pre className="whitespace-pre-wrap font-sans text-sm leading-relaxed">
                            {displayedResponse}
                          </pre>
                          {isTyping && <span className="inline-block w-2 h-4 bg-foreground animate-pulse ml-1" />}
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>

              {selectedPrompt && (
                <div className="border-t p-4">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setSelectedPrompt(null)
                      setDisplayedResponse("")
                      setIsTyping(false)
                    }}
                  >
                    Try another question
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}
