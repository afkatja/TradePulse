import { NextRequest, NextResponse } from "next/server"

export async function GET(req: NextRequest) {
  const category = req.nextUrl?.searchParams.get("category")
  const query = req.nextUrl?.searchParams.get("query")

  const url = !category
    ? `https://newsapi.org/v2/everything?q=${query}&language=en&sortBy=publishedAt&pageSize=5&apiKey=${process.env.NEWS_API_KEY}`
    : `https://newsapi.org/v2/top-headlines?category=${category}&language=en&sortBy=publishedAt&pageSize=5&apiKey=${process.env.NEWS_API_KEY}`

  const res = await fetch(url)
  const data = await res.json()

  return NextResponse.json(data.articles)
}
