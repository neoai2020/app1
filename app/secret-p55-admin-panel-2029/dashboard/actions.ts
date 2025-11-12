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
    console.log("[v0] Searching for user:", email)

    const { data, error } = await supabaseAdmin.auth.admin.listUsers()

    if (error) {
      console.error("[v0] Error listing users:", error)
      return { success: false, error: "Failed to search users" }
    }

    // Find user by email
    const user = data.users.find((u) => u.email?.toLowerCase() === email.toLowerCase())

    if (!user) {
      console.log("[v0] User not found")
      return { success: false, error: "User not found" }
    }

    console.log("[v0] User found:", user.id, user.email)

    return {
      success: true,
      user: {
        id: user.id,
        email: user.email || "",
        created_at: user.created_at,
      },
    }
  } catch (error) {
    console.error("[v0] Admin search error:", error)
    return { success: false, error: "Failed to search user" }
  }
}

export async function resetUserPassword(userId: string, newPassword: string) {
  try {
    console.log("[v0] Resetting password for user:", userId)

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
