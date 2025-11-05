import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { StatCard } from "@/components/stat-card"
import { QuickActionCard } from "@/components/quick-action-card"
import { MotivationalTicker } from "@/components/motivational-ticker"
import { VideoIntroModal } from "@/components/video-intro-modal"
import { FeaturedVideoCard } from "@/components/featured-video-card"
import { LiveStatsWidget } from "@/components/live-stats-widget"
import { FileText, Eye, MousePointerClick, DollarSign, Zap, GraduationCap, Crown } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default async function DashboardPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) {
    redirect("/auth/login")
  }

  // Fetch user profile
  const { data: profile } = await supabase.from("users").select("*").eq("id", user.id).single()

  // Fetch user's pages stats
  const { data: pages } = await supabase.from("pages").select("*").eq("user_id", user.id)

  const totalPages = pages?.length || 0
  const totalViews = pages?.reduce((sum, page) => sum + (page.views || 0), 0) || 0
  const totalClicks = pages?.reduce((sum, page) => sum + (page.clicks || 0), 0) || 0

  // Fetch recent testimonials
  const { data: testimonials } = await supabase
    .from("testimonials")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(3)

  return (
    <>
      <VideoIntroModal />

      <div className="space-y-8 max-w-7xl mx-auto">
        {/* Welcome Section */}
        <div className="space-y-4">
          <div>
            <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-2">
              Welcome to Your P55 Account, {profile?.full_name || "there"}!
            </h1>
            <p className="text-xl text-muted-foreground">Ready to build your next profit page?</p>
          </div>
          <MotivationalTicker />
        </div>

        {/* Featured Video Card and Live Stats Widget */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <FeaturedVideoCard />
          <LiveStatsWidget testimonials={testimonials} />
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard title="Pages Created" value={totalPages} icon={FileText} trend="+2 this week" glowColor="cyan" />
          <StatCard title="Total Views" value={totalViews} icon={Eye} trend="+156 this week" glowColor="violet" />
          <StatCard
            title="Total Clicks"
            value={totalClicks}
            icon={MousePointerClick}
            trend="+43 this week"
            glowColor="jade"
          />
          <StatCard
            title="Est. Earnings"
            value={`$${((totalClicks * 0.05 * 47) / 100).toFixed(2)}`}
            icon={DollarSign}
            glowColor="cyan"
          />
        </div>

        {/* Quick Actions */}
        <div>
          <h2 className="text-3xl font-bold text-foreground mb-6">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <QuickActionCard
              title="Build New Page"
              description="Create your P55 profit page in under 3 minutes"
              icon={Zap}
              href="/create"
              buttonText="Start Building"
              glowColor="cyan"
            />
            <QuickActionCard
              title="Learn & Earn"
              description="Master the P55 system with proven training"
              icon={GraduationCap}
              href="/training"
              buttonText="Watch Now"
              glowColor="violet"
            />
            <QuickActionCard
              title="Upgrade Your Account"
              description="Unlock premium P55 features and 10x your results"
              icon={Crown}
              href="/upgrades"
              buttonText="View Upgrades"
              glowColor="jade"
            />
          </div>
        </div>

        {/* Progress Tracker */}
        <Card className="glass-strong border-border/50 glow-violet">
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-foreground">Your P55 Progress</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-lg font-semibold text-foreground">Pages Created</span>
                <span className="text-lg font-bold text-primary">
                  {totalPages} / 10 <span className="text-sm text-muted-foreground">(Free Tier)</span>
                </span>
              </div>
              <div className="w-full h-4 rounded-full bg-muted overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-primary to-secondary glow-cyan transition-all duration-500"
                  style={{ width: `${Math.min((totalPages / 10) * 100, 100)}%` }}
                />
              </div>
            </div>
            {totalPages >= 10 && (
              <div className="p-4 rounded-xl bg-accent/10 border border-accent/30">
                <p className="text-base text-accent font-semibold">
                  You've reached your free tier limit! Upgrade your P55 Account to create unlimited pages.
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </>
  )
}
