import { NextResponse } from "next/server"

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params

    // Use service role key to bypass RLS
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

    // Direct fetch to Supabase REST API
    const response = await fetch(
      `${supabaseUrl}/rest/v1/pages?id=eq.${slug}&select=*,niches(name)`,
      {
        headers: {
          apikey: supabaseServiceKey,
          Authorization: `Bearer ${supabaseServiceKey}`,
        },
      }
    )

    const data = await response.json()

    if (!data || data.length === 0) {
      return NextResponse.json({ error: "Page not found" }, { status: 404 })
    }

    // Increment views asynchronously
    fetch(`${supabaseUrl}/rest/v1/pages?id=eq.${slug}`, {
      method: "PATCH",
      headers: {
        apikey: supabaseServiceKey,
        Authorization: `Bearer ${supabaseServiceKey}`,
        "Content-Type": "application/json",
        Prefer: "return=minimal",
      },
      body: JSON.stringify({ views: (data[0].views || 0) + 1 }),
    }).catch(() => {})

    return NextResponse.json(data[0])
  } catch (error) {
    console.error("[v0] Article API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
