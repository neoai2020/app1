"use server"

import { createAdminClient } from "@/lib/supabase/admin"
import { redirect } from "next/navigation"

export async function signUpAction(formData: { email: string; password: string; fullName: string }) {
  const { email, password, fullName } = formData
  const supabase = await createAdminClient()

  // Using admin auth to create the user and skip email confirmation
  const { data, error } = await supabase.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
    user_metadata: {
      full_name: fullName,
    },
  })

  if (error) {
    return { error: error.message }
  }

  // After creating the user, we should sign them in
  // Note: auth.admin.createUser doesn't create a session for the current browser
  // So we need to sign in with password immediately after
  const { error: signInError } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (signInError) {
    return { error: signInError.message }
  }

  return { success: true }
}
