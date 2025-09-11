import { CohereClientV2 } from "cohere-ai"
const cohere = new CohereClientV2({ token: process.env.COHERE_API_KEY! })

// lib/parseTicker.ts
export function parseTicker(prompt: string): string | null {
  // Matches common US stock tickers: uppercase letters, 1–5 chars
  const match = prompt.match(/\b[A-Z]{1,5}\b/)
  return match ? match[0] : null
}

const tickerRegex = /^[A-Z]{1,5}(\.[A-Z])?$/
const examples = [
  { user: "how are tesla stocks doing?", answer: "TSLA" },
  { user: "latest news on apple", answer: "AAPL" },
  { user: "price prediction for microsoft", answer: "MSFT" },
  { user: "how is google performing?", answer: "GOOGL" },
  { user: "should I buy amazon shares?", answer: "AMZN" },
]

export async function parseTickerAI(prompt: string) {
  try {
    const response = await cohere.chat({
      model: "command-a-03-2025",
      messages: [
        {
          role: "system",
          content: `You are a precise stock ticker extraction expert. Your task is to extract ONLY the US stock ticker symbol from the user's text.
          
          Rules:
          1. Return the exact ticker symbol in UPPERCASE (e.g., "TSLA", "BRK.B")
          2. If no company or ticker is mentioned, return "NONE"
          3. Use the following company-to-ticker mappings:
             - Tesla/Tesla Motors → TSLA
             - Apple/Apple Inc → AAPL
             - Microsoft/Microsoft Corporation → MSFT
             - Google/Alphabet → GOOGL
             - Amazon/Amazon.com → AMZN
             - NVIDIA → NVDA
             - Meta/Facebook → META
             - Berkshire Hathaway → BRK.B
             - Netflix → NFLX
          4. Validate against regex: /^[A-Z]{1,5}(\\.[A-Z])?\$/
          5. Return ONLY the ticker symbol or "NONE" - no explanations or additional text.
          
          Examples:
          ${examples
            .flatMap(ex => [
              { role: "user", content: ex.user },
              { role: "assistant", content: ex.answer },
            ])
            .join("\n")}
          `,
        },
        {
          role: "user",
          content: `Extract the stock ticker from this text: "${prompt}"
          Remember: Return ONLY the ticker symbol in UPPERCASE or "NONE".`,
        },
      ],
      maxTokens: 999,
      temperature: 0,
      tools: [
        {
          type: "function",
          function: {
            name: "extract_ticker",
            description: "Extracted ticker symbol or NONE",
            parameters: {
              pattern: "^[A-Z]{1,5}(\\.[A-Z])?$|NONE",
              type: "object",
              properties: {
                ticker: {
                  type: "string",
                  description:
                    'The extracted stock ticker symbol in uppercase (e.g. "AAPL") or "NONE" if not found',
                },
              },
              required: ["ticker"],
            },
          },
        },
      ],
      toolChoice: "REQUIRED",
    })
    console.log("ticker with AI", response.message?.toolCalls)

    if (response.message?.toolCalls && response.message.toolCalls.length > 0) {
      const toolCall = response.message.toolCalls[0]
      if (toolCall.function?.name === "extract_ticker") {
        const result = JSON.parse(toolCall.function.arguments!)
        const ticker = result.ticker
        console.log("parseTickerAI", ticker, tickerRegex.test(ticker))
        if (ticker !== "NONE" && tickerRegex.test(ticker)) {
          return ticker
        }
        return null
      }
    }
    return null
    // const ticker = response?.message?.content
    // return ticker === "NONE" ? null : ticker
  } catch (error) {
    console.error("Error in parseTickerAI:", (error as any).body.message)
    return null
  }
}
