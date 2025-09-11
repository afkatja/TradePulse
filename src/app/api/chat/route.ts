import { convertToModelMessages, streamText, tool } from "ai"
import { openai } from "@ai-sdk/openai"
import { cohere } from "@ai-sdk/cohere"
import { z } from "zod"
import { parseTicker, parseTickerAI } from "../../../lib/parseTicker"
import { parse } from "path"
import fetchSentiment from "../../../lib/fetchSentiment"
// import { getMarketData, getLatestNews } from "@/lib/market-data"

export async function POST(req: Request) {
  const { messages } = await req.json()
  try {
    const lastMessage = messages[messages.length - 1]
    const textPart = lastMessage.parts.find(
      (p: { type: string; role: string }) => p.type === "text"
    )
    const userText = textPart?.text || ""

    const newsRes = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/news?q=${
        parseTicker(userText) ?? (await parseTickerAI(userText))
      }`
    )
    const news = await newsRes.json()
    const newsHeadlines = news
      .map((n: { title: string }) => `- ${n.title}`)
      .join("\n")

    const sentiment = await fetchSentiment(newsHeadlines)

    const context = `
      News Headlines:
      ${newsHeadlines}
      Sentiment: ${sentiment.label} (${Math.round(sentiment.score * 100)}%)
    `

    const stream = await streamText({
      model: cohere("command-a-03-2025"),
      prompt: `
        You are a financial assistant.
        User question: ${userText}
        Additional context:
        ${context}

        Provide a human-readable, well-structured analysis. Include a risk outlook and factors to watch.
        Respond in sections:
        - Overview
        - Sentiment Summary
        - Recommendation
        - Risk Factors
      `,
    })

    // console.log("CHAT RESULT", { stream })
    // if (stream?.type === "error") {
    //   console.error("OpenAI API Error:", stream.error)
    //   return new Response("Error from OpenAI API", { status: 500 })
    // }
    return stream.toUIMessageStreamResponse()
  } catch (error) {
    console.error("Error getting chat response:", error)
    return new Response("Internal Server Error", { status: 500 })
  }
}
