import { createBrowserClient } from "@supabase/ssr"

export function createClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!url || !anonKey) {
    throw new Error(
      [
        "Your project's Supabase URL and Anon Key are required.",
        "Set these environment variables in `.env.local`:",
        "- NEXT_PUBLIC_SUPABASE_URL",
        "- NEXT_PUBLIC_SUPABASE_ANON_KEY",
        "You can find them in your Supabase dashboard under Project Settings → API.",
      ].join("\n"),
    )
  }

  return createBrowserClient(url, anonKey)
}
