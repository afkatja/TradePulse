const fetchSentiment = async (input: string) => {
  const hfRes = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/sentiment/hf`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: input }),
    }
  )
  const sentiment = await hfRes.json()
  return sentiment
}

export default fetchSentiment
