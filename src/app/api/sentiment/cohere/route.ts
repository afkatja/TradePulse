import { NextResponse } from "next/server"
import { CohereClientV2 } from "cohere-ai"

const cohere = new CohereClientV2({ token: process.env.COHERE_API_KEY! })

export async function POST(req: Request) {
  const { text } = await req.json()
  const examples = [
    {
      text: "Stock prices soar after positive earnings report",
      label: "positive",
    },
    { text: "Market crashes amid economic uncertainty", label: "negative" },
    { text: "Company maintains steady growth", label: "neutral" },
  ]

  // Build prompt with examples
  const prompt = `
      You are a financial news sentiment classifier. Classify the following headline into one of these categories: positive, negative, neutral.

      Examples:
      ${examples
        .map(ex => `- Headline: "${ex.text}" → Label: ${ex.label}`)
        .join("\n")}

      Now classify this headline:
      Headline: "${text}" → Label: 
    `.trim()

  const response = await cohere.chat({
    messages: [{ role: "system", content: prompt }],
    model: "command-a-03-2025",
    maxTokens: 10,
    temperature: 0.1,
    stopSequences: ["\n"], // Stop at newline to avoid extra text
  })

  const generatedText = response.message.content.trim().toLowerCase()
  const likelihood = response.generations[0].likelihood ?? 0
  const confidence = Math.min(1, Math.max(0.5, likelihood * 10)) // Scale to 0.5–1.0 range

  return NextResponse.json({
    label: generatedText,
    confidence,
    reasoning: `Model predicted: "${generatedText}" with avg likelihood ${likelihood.toFixed(
      4
    )}`,
  })
}
