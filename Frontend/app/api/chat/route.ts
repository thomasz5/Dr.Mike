import { type NextRequest, NextResponse } from "next/server"

interface ChatMessage {
  role: "user" | "assistant" | "system"
  content: string
}

interface ChatRequest {
  messages: ChatMessage[]
  sessionId: string
}

// Mock responses for different types of questions
const mockResponses: Record<string, string> = {
  routine: `A well-structured push/pull/legs routine typically follows these principles:

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

  protein: `For muscle protein synthesis and growth, research suggests:

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

  plateau: `Plateau-busting strategies for bench press:

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

  default: `Thanks for your question! As an AI fitness coach inspired by Dr. Mike Israetel's evidence-based approach, I'm here to help with training, nutrition, and recovery guidance.

**Key Principles I Follow:**
- Evidence-based recommendations from peer-reviewed research
- Progressive overload for strength and muscle gains
- Individual variation in response to training
- Recovery as important as training itself

**What I Can Help With:**
- Program design and periodization
- Nutrition for performance and body composition
- Exercise technique and selection
- Recovery strategies and sleep optimization

**Remember:** This is educational content only, not medical advice. Always consult healthcare professionals for medical concerns.

What specific aspect of fitness would you like to explore?`,
}

function selectResponse(userMessage: string): string {
  const message = userMessage.toLowerCase()

  if (message.includes("routine") || message.includes("push") || message.includes("pull") || message.includes("legs")) {
    return mockResponses.routine
  }

  if (message.includes("protein") || message.includes("nutrition") || message.includes("macro")) {
    return mockResponses.protein
  }

  if (
    message.includes("plateau") ||
    message.includes("bench") ||
    message.includes("stuck") ||
    message.includes("progress")
  ) {
    return mockResponses.plateau
  }

  return mockResponses.default
}

export async function POST(request: NextRequest) {
  try {
    const body: ChatRequest = await request.json()
    const { messages } = body

    // Get the last user message
    const lastUserMessage = messages.filter((msg) => msg.role === "user").pop()
    if (!lastUserMessage) {
      return new NextResponse("No user message found", { status: 400 })
    }

    // Select appropriate response
    const responseText = selectResponse(lastUserMessage.content)

    // Create a readable stream for the response
    const encoder = new TextEncoder()
    const stream = new ReadableStream({
      async start(controller) {
        // Split response into chunks for streaming effect
        const words = responseText.split(" ")
        let currentChunk = ""

        for (let i = 0; i < words.length; i++) {
          currentChunk += (i > 0 ? " " : "") + words[i]

          // Send chunk every 2-4 words or at the end
          if (i % 3 === 0 || i === words.length - 1) {
            const chunk = {
              id: `msg_${Date.now()}`,
              role: "assistant",
              content: currentChunk,
              done: i === words.length - 1,
            }

            const data = `data: ${JSON.stringify(chunk)}\n\n`
            controller.enqueue(encoder.encode(data))

            // Add delay to simulate typing
            await new Promise((resolve) => setTimeout(resolve, 50 + Math.random() * 100))
            currentChunk = ""
          }
        }

        controller.close()
      },
    })

    return new NextResponse(stream, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      },
    })
  } catch (error) {
    console.error("Chat API error:", error)
    return new NextResponse("Internal Server Error", { status: 500 })
  }
}
