import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { AutomatedIncomeContent } from "./automated-income-content"

export default async function AutomatedIncomePage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth/login")
  }

  return <AutomatedIncomeContent userId={user.id} />
}
