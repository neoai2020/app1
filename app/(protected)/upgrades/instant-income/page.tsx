import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { InstantIncomeContent } from "./instant-income-content"

export default async function InstantIncomePage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth/login")
  }

  const { data: profile } = await supabase.from("users").select("*").eq("id", user.id).single()

  const hasAccess = profile?.upgrade_level === "instant_income" || profile?.upgrade_level === "automated_income"

  if (!hasAccess) {
    redirect("/upgrades")
  }

  return <InstantIncomeContent userId={user.id} />
}
