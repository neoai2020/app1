import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, Lock, Play } from "lucide-react"

export default async function TrainingPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) {
    redirect("/auth/login")
  }

  // Fetch user profile to check upgrade level
  const { data: profile } = await supabase.from("users").select("*").eq("id", user.id).single()

  // Fetch all videos
  const { data: videos } = await supabase.from("videos").select("*").order("created_at", { ascending: true })

  const categories = ["Getting Started", "Strategy", "Traffic", "Advanced"]

  const canAccessVideo = (videoUpgradeRequired: string) => {
    const upgradeHierarchy = ["free", "dfy_vault", "instant_income", "automated_income"]
    const userLevel = upgradeHierarchy.indexOf(profile?.upgrade_level || "free")
    const requiredLevel = upgradeHierarchy.indexOf(videoUpgradeRequired)
    return userLevel >= requiredLevel
  }

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      <div>
        <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-2">P55 Training Center</h1>
        <p className="text-xl text-muted-foreground">Master the P55 system and maximize your earnings</p>
      </div>

      <div className="glass-strong border-border/50 rounded-2xl p-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-accent/20 flex items-center justify-center">
            <Play className="w-6 h-6 text-accent" />
          </div>
          <div>
            <p className="text-lg font-bold text-foreground">Your Progress</p>
            <p className="text-base text-muted-foreground">
              {videos?.filter((v) => canAccessVideo(v.upgrade_required)).length || 0} videos available
            </p>
          </div>
        </div>
      </div>

      {categories.map((category) => {
        const categoryVideos = videos?.filter((v) => v.category === category) || []
        if (categoryVideos.length === 0) return null

        return (
          <div key={category} className="space-y-4">
            <h2 className="text-3xl font-bold text-foreground">{category}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {categoryVideos.map((video) => {
                const hasAccess = canAccessVideo(video.upgrade_required)

                return (
                  <Card
                    key={video.id}
                    className={`glass border-border/50 ${hasAccess ? "hover:glow-violet cursor-pointer" : "opacity-60"} transition-all duration-300`}
                  >
                    <CardContent className="p-0">
                      <div className="relative">
                        <img
                          src={video.thumbnail_url || "/placeholder.svg"}
                          alt={video.title}
                          className="w-full h-48 object-cover rounded-t-xl"
                        />
                        {!hasAccess && (
                          <div className="absolute inset-0 bg-background/80 flex items-center justify-center rounded-t-xl">
                            <div className="text-center space-y-2">
                              <Lock className="w-12 h-12 text-muted-foreground mx-auto" />
                              <p className="text-sm font-bold text-muted-foreground">Upgrade Required</p>
                            </div>
                          </div>
                        )}
                        <div className="absolute bottom-3 right-3 px-3 py-1 rounded-full bg-background/90 backdrop-blur-sm flex items-center gap-2">
                          <Clock className="w-4 h-4 text-primary" />
                          <span className="text-sm font-semibold text-foreground">{video.duration}</span>
                        </div>
                      </div>
                      <div className="p-6 space-y-3">
                        <div className="flex items-start justify-between gap-2">
                          <h3 className="text-xl font-bold text-foreground leading-tight">{video.title}</h3>
                          {video.upgrade_required !== "free" && (
                            <Badge variant="secondary" className="flex-shrink-0">
                              {video.upgrade_required === "dfy_vault"
                                ? "DFY"
                                : video.upgrade_required === "instant_income"
                                  ? "Instant"
                                  : "Auto"}
                            </Badge>
                          )}
                        </div>
                        <p className="text-base text-muted-foreground leading-relaxed">{video.description}</p>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        )
      })}

      {profile?.upgrade_level === "free" && (
        <Card className="glass-strong glow-jade border-border/50">
          <CardContent className="p-8 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-accent/20 flex items-center justify-center mx-auto">
              <Lock className="w-8 h-8 text-accent" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-foreground mb-2">Unlock Advanced P55 Training</h3>
              <p className="text-lg text-muted-foreground">
                Upgrade your P55 Account to access advanced strategies and scale to $1000/day
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
