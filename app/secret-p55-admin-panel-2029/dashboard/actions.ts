"use server"

import { createClient } from "@supabase/supabase-js"

// Use service role key for admin operations
const supabaseAdmin = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
})

export async function searchUserByEmail(email: string) {
  try {
    const { data: user, error } = await supabaseAdmin
      .from("users")
      .select("id, email, created_at")
      .eq("email", email.toLowerCase())
      .single()

    if (error || !user) {
      return { success: false, error: "User not found" }
    }

    return { success: true, user }
  } catch (error) {
    console.error("[v0] Admin search error:", error)
    return { success: false, error: "Failed to search user" }
  }
}

export async function resetUserPassword(userId: string, newPassword: string) {
  try {
    // Use Supabase Admin API to update user password
    const { data, error } = await supabaseAdmin.auth.admin.updateUserById(userId, { password: newPassword })

    if (error) {
      console.error("[v0] Password reset error:", error)
      return { success: false, error: error.message }
    }

    console.log("[v0] Password successfully reset for user:", userId)
    return { success: true }
  } catch (error) {
    console.error("[v0] Admin password reset error:", error)
    return { success: false, error: "Failed to reset password" }
  }
}
