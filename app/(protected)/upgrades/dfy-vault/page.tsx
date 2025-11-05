import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { DFYVaultContent } from "./dfy-vault-content"

export default async function DFYVaultPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) {
    redirect("/auth/login")
  }

  const { data: profile } = await supabase.from("users").select("*").eq("id", user.id).single()

  console.log("[v0] DFY Vault - User upgrade level:", profile?.upgrade_level)

  const hasAccess =
    profile?.upgrade_level === "dfy_vault" ||
    profile?.upgrade_level === "instant_income" ||
    profile?.upgrade_level === "automated_income"

  if (!hasAccess) {
    redirect("/upgrades")
  }

  return <DFYVaultContent />
}
