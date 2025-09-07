import { NextResponse } from "next/server"
import { CohereClient } from "cohere-ai"

const cohere = new CohereClient({ token: process.env.COHERE_API_KEY! })

export async function POST(req: Request) {
  const { text } = await req.json()

  const response = await cohere.classify({
    inputs: [text],
    examples: [
      {
        text: "Stock prices soar after positive earnings report",
        label: "positive",
      },
      { text: "Market crashes amid economic uncertainty", label: "negative" },
      { text: "Company maintains steady growth", label: "neutral" },
    ],
  })

  return NextResponse.json(response.classifications[0])
}
