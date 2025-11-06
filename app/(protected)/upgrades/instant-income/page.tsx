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

  return <InstantIncomeContent userId={user.id} />
}
