import { NextResponse } from "next/server"

export async function POST(req: Request) {
  const { text } = await req.json()

  const response = await fetch(
    "https://api-inference.huggingface.co/models/ProsusAI/finbert",
    {
      headers: {
        Authorization: `Bearer ${process.env.HUGGINGFACE_ACCESS_TOKEN}`,
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({ inputs: text }),
    }
  )

  const result = await response.json()

  return NextResponse.json(result[0][0])
}
