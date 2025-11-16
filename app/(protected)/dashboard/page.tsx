import { redirect } from 'next/navigation'
import { createClient } from "@/lib/supabase/server"
import { StatCard } from "@/components/stat-card"
import { QuickActionCard } from "@/components/quick-action-card"
import { MotivationalTicker } from "@/components/motivational-ticker"
import { VideoIntroModal } from "@/components/video-intro-modal"
import { FeaturedVideoCard } from "@/components/featured-video-card"
import { LiveStatsWidget } from "@/components/live-stats-widget"
import { FileText, Eye, MousePointerClick, DollarSign, Zap, GraduationCap, Crown, Headphones } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

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

        {/* Support Desk Card */}
        <Card className="glass-strong border-accent/50 glow-jade">
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center">
                  <Headphones className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-foreground">Need Help?</h3>
                  <p className="text-muted-foreground">Our support team is here to assist you 24/7</p>
                </div>
              </div>
              <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground font-bold px-8">
                <a href="https://p55account.zendesk.com/" target="_blank" rel="noopener noreferrer">
                  Contact Support
                </a>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  )
}
