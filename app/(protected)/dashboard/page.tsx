import { redirect } from 'next/navigation'
import { createClient } from "@/lib/supabase/server"
import { RevenueMiniCard } from "@/components/revenue-mini-card"
import { SalesOverviewChart } from "@/components/sales-overview-chart"
import { CustomerListTable } from "@/components/customer-list-table"
import { FeaturedVideoCard } from "@/components/featured-video-card"
import { EarningsShowcase } from "@/components/earnings-showcase"
import { CommunityProgress } from "@/components/community-progress"
import { LiveActivityFeed, ManagerSupportCard } from "@/components/live-activities-sidebar"
import { PremiumUpgradeCard } from "@/components/premium-upgrade-card"
import { 
  BarChart2,
  Users,
  Sun, 
  RotateCcw, 
  Bell, 
  Globe, 
  ChevronRight,
  ChevronDown,
} from 'lucide-react'
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default async function DashboardPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()
  
  if (!user) {
    redirect("/auth/login")
  }

  // Fetch user profile with error handling
  let profile = null

  try {
    const { data: profileData } = await supabase
      .from("users")
      .select("*")
      .eq("id", user.id)
      .single()
    profile = profileData
  } catch (error) {
    console.error("[robinhood] Error fetching profile:", error)
  }

  return (
    <div className="flex flex-col gap-8 max-w-[1700px] mx-auto pb-12">
      <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
        {/* Main Content Area (3 Columns) */}
        <div className="xl:col-span-3 space-y-12">
          {/* Title Row */}
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-8">
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <div className="w-1.5 h-10 bg-[#B3FF00] rounded-full" />
                <h1 className="text-5xl font-black text-white uppercase italic tracking-tighter">CONTROL HUB</h1>
              </div>
              <p className="text-zinc-500 font-bold uppercase text-sm tracking-tight ml-4">
                Command center: Initialized for {profile?.full_name?.split(' ')[0] || "Creator"}
              </p>
            </div>
          </div>

          {/* Quad 1: Top Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            <RevenueMiniCard title="Net revenue" value="$3,131,021" trend="0.4%" trendValue="0.4%" isUp={true} />
            <RevenueMiniCard title="ARR" value="$1,511,121" trend="32%" trendValue="32%" isUp={true} />
            <RevenueMiniCard title="Quarterly revenue goal" value="71%" goal="$1.1M" progress={71} trend="" trendValue="" />
            <RevenueMiniCard title="New orders" value="18,221" trend="11%" trendValue="11%" isUp={true} />
          </div>

          {/* Quad 2: Analytics & Video */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <FeaturedVideoCard />
            </div>
            <div>
              <SalesOverviewChart />
            </div>
          </div>

          {/* Quad 3: Customers & Showcase */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <CustomerListTable />
            </div>
            <div className="space-y-8">
              <EarningsShowcase />
            </div>
          </div>
        </div>

        {/* Right Sidebar Area (1 Column) - Granular Reordering */}
        <div className="xl:mt-32 space-y-8">
           <CommunityProgress />
           <LiveActivityFeed />
           <PremiumUpgradeCard />
           <ManagerSupportCard />
        </div>
      </div>
    </div>
  )
}
