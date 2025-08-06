# Dr. Mike AI

A fitness chatbot that mimics Dr. Michael Israetel using GPT-4. This full-stack project demonstrates AI personality, real-time chat, and modern web development.

## Live Demo

[Visit Site](https://your-domain.com)

## Project Overview

Dr. Mike AI is a learning-focused MVP featuring:

* Chat interface
* Dr. Mike-style responses
* Supplement and fitness knowledge

Note: This is not a commercial or medical tool. For demo use only.

## Tech Stack

**Frontend**: Next.js 14, React, TypeScript, Tailwind CSS
**Backend**: OpenAI GPT-4 API, Supabase 


## Features

* Real-time chat
* Dr. Mike personality and tone
* Mobile-friendly UI
* Basic supplement knowledge
* Integrated with OpenAI

## File Structure

```
dr-mike-ai/
├── pages/api/chat.js         # OpenAI chat endpoint
├── components/               # Chat UI components
├── data/                     # Personality and knowledge
├── styles/                   # Tailwind config
└── README.md                 # Project documentation
```

## Personality Setup

```json
{
  "systemPrompt": "You are Dr. Michael Israetel...",
  "commonPhrases": ["Ladies and gentlemen", "Here's the deal"],
  "responseStyle": "scientific and humorous"
}
```

## Run Locally

```bash
# Clone repo
git clone https://github.com/yourusername/dr-mike-ai.git
cd dr-mike-ai

# Install packages
npm install

# Add API key
echo "OPENAI_API_KEY=your_key" > .env.local

# Start dev server
npm run dev
```

## Deployment

```bash
# Deploy with Vercel
npm install -g vercel
vercel
```

Or deploy using the Vercel Dashboard.

## Knowledge Base

* Sourced from YouTube transcripts
* Stored in JSON
* Used for GPT-4 responses

## Example Prompts

* "Is creatine safe?"
* "Thoughts on fasted cardio?"
* "How much protein for muscle growth?"


## Credits

Inspired by Dr. Mike Israetel. Built for educational purposes.

## License

MIT License - see LICENSE file.
