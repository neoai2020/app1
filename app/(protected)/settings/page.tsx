import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ProfileForm } from "@/components/profile-form"
import { Badge } from "@/components/ui/badge"

export default async function SettingsPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) {
    redirect("/auth/login")
  }

  const { data: profile } = await supabase.from("users").select("*").eq("id", user.id).single()

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <div>
        <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-2">Settings</h1>
        <p className="text-xl text-muted-foreground">Manage your account and preferences</p>
      </div>

      <Card className="glass-strong border-border/50">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-3xl font-bold text-foreground">Account Information</CardTitle>
            <Badge variant="secondary" className="text-base px-4 py-2">
              {profile?.upgrade_level === "free"
                ? "Free Plan"
                : profile?.upgrade_level === "dfy_vault"
                  ? "DFY Vault"
                  : profile?.upgrade_level === "instant_income"
                    ? "Instant Income"
                    : "Automated Income"}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <ProfileForm profile={profile} userEmail={user.email || ""} />
        </CardContent>
      </Card>

      <Card className="glass border-border/50">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-foreground">Account Stats</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="glass rounded-xl p-6 text-center">
              <p className="text-base text-muted-foreground mb-2">Pages Generated</p>
              <p className="text-4xl font-bold text-primary">{profile?.pages_generated || 0}</p>
            </div>
            <div className="glass rounded-xl p-6 text-center">
              <p className="text-base text-muted-foreground mb-2">Member Since</p>
              <p className="text-xl font-bold text-foreground">
                {new Date(profile?.created_at || "").toLocaleDateString("en-US", {
                  month: "short",
                  year: "numeric",
                })}
              </p>
            </div>
            <div className="glass rounded-xl p-6 text-center">
              <p className="text-base text-muted-foreground mb-2">Account Status</p>
              <p className="text-xl font-bold text-accent">Active</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="glass border-border/50">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-foreground">Legal & Compliance</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <a
            href="/legal/privacy"
            className="block p-4 glass rounded-xl hover:glow-cyan transition-all duration-300 text-lg text-foreground font-semibold"
          >
            Privacy Policy
          </a>
          <a
            href="/legal/terms"
            className="block p-4 glass rounded-xl hover:glow-cyan transition-all duration-300 text-lg text-foreground font-semibold"
          >
            Terms of Service
          </a>
          <a
            href="/legal/disclaimer"
            className="block p-4 glass rounded-xl hover:glow-cyan transition-all duration-300 text-lg text-foreground font-semibold"
          >
            Earnings Disclaimer
          </a>
        </CardContent>
      </Card>
    </div>
  )
}
