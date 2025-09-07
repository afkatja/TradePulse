import { useChat, useCompletion } from "@ai-sdk/react"
export function useMarketAI() {
  const { messages, sendMessage } = useChat({
    // api: "/api/chat/market-analysis"
  })
  const { complete: analyzeSentiment } = useCompletion({
    api: "/api/ai/sentiment-analysis",
  })
  return {
    messages,
    sendMessage,
    analyzeSentiment,
  }
}
