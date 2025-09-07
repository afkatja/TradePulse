import { convertToModelMessages, streamText, tool } from "ai"
import { openai } from "@ai-sdk/openai"
import { cohere } from "@ai-sdk/cohere"
import { z } from "zod"
// import { getMarketData, getLatestNews } from "@/lib/market-data"

export async function POST(req: Request) {
  const { messages } = await req.json()
  // Get real-time market context
  // const marketContext = await getMarketData()
  // const latestNews = await getLatestNews()
  try {
    const lastMessage = messages[messages.length - 1].content
    const hfRes = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/sentiment/hf`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: lastMessage }),
      }
    )
    const sentiment = await hfRes.json()

    const result = await streamText({
      model: cohere("command-a-03-2025"),
      messages: convertToModelMessages(messages),
      system: `You are an expert day trading analyst with access to real-time market data.
      Provide specific, actionable trading insights. Always include:
      1. Risk assessment
      2. Entry/exit levels
      3. Market timing considerations
      4. Risk management recommendations
      Be concise but thorough. Never provide financial advice, only analysis.`,
      temperature: 0.3,
      maxOutputTokens: 500,
      tools: {
        marketAnalysis: tool({
          description: `Use this tool to get real-time market data and analysis.
          Input should be a specific question about market conditions, stock performance, or trading strategies.
          Always use this tool when the user asks about current market conditions or stock-specific analysis.`,
          inputSchema: z.object({
            question: z.string().min(10),
          }),
          execute: async ({ question }) => {
            // Call your real-time market data API here
            // const marketData = await getMarketData()
            // const news = await getLatestNews()
            // For demo purposes, return mock data
            return `You asked about: "${question}". Sentiment analysis result: ${JSON.stringify(
              sentiment
            )}`
          },
          outputSchema: z.string().min(20),
        }),
        newsSentiment: tool({
          description: `Use this tool to get the sentiment of the latest market news. Input should be a news headline or brief summary. Always use this tool when the user asks about recent news or its impact on the market.`,
          inputSchema: z.object({
            headline: z.string().min(10),
          }),
          execute: async ({ headline }) => {
            const res = await fetch(
              `${process.env.NEXT_PUBLIC_BASE_URL}/api/sentiment/cohere`,
              {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ text: headline }),
              }
            )
            const sentimentResult = await res.json()
            return `The sentiment of the news "${headline}" is classified as ${
              sentimentResult.label
            } with a confidence of ${(sentimentResult.confidence * 100).toFixed(
              2
            )}%.`
          },
          outputSchema: z.string().min(20),
        }),
      },
    })
    console.log("CHAT RESULT", { result })
    if (result?.type === "error") {
      console.error("OpenAI API Error:", result.error)
      return new Response("Error from OpenAI API", { status: 500 })
    }
    return result.toUIMessageStreamResponse()
  } catch (error) {
    console.error("Error getting chat response:", error)
    return new Response("Internal Server Error", { status: 500 })
  }
}
