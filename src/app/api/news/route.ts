import { NextResponse } from "next/server"

export async function GET() {
  const url = `https://newsapi.org/v2/everything?q=stocks&language=en&sortBy=publishedAt&pageSize=5&apiKey=${process.env.NEWS_API_KEY}`

  const res = await fetch(url)
  const data = await res.json()

  return NextResponse.json(data.articles)
}
