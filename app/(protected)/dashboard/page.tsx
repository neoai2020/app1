import { redirect } from 'next/navigation'
import { createClient } from "@/lib/supabase/server"
import { RevenueMiniCard } from "@/components/revenue-mini-card"
import { SalesOverviewChart } from "@/components/sales-overview-chart"
import { CustomerListTable } from "@/components/customer-list-table"
import { FeaturedVideoCard } from "@/components/featured-video-card"
import { EarningsShowcase } from "@/components/earnings-showcase"
import { CommunityProgress } from "@/components/community-progress"
import { LiveActivitiesSidebar } from "@/components/live-activities-sidebar"
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
      {/* Top Header Section */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-zinc-500 text-sm font-bold">
          <span className="hover:text-white transition-colors cursor-pointer">Dashboards</span>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-white">Overview</span>
        </div>
        
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-4 border-r border-white/5 pr-6">
            <Sun className="w-5 h-5 text-zinc-500 hover:text-white cursor-pointer transition-colors" />
            <RotateCcw className="w-5 h-5 text-zinc-500 hover:text-white cursor-pointer transition-colors" />
            <Bell className="w-5 h-5 text-zinc-500 hover:text-white cursor-pointer transition-colors" />
          </div>
          <Globe className="w-5 h-5 text-zinc-500 hover:text-white cursor-pointer transition-colors" />
        </div>
      </div>

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
            <Button variant="outline" className="h-14 bg-white/2 border-white/5 rounded-2xl text-xs font-black uppercase tracking-widest px-8 hover:bg-white/5 transition-all">
              DATA RANGE: TODAY <ChevronDown className="w-4 h-4 ml-3 text-[#B3FF00]" />
            </Button>
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
              <SalesOverviewChart />
            </div>
            <div>
              <FeaturedVideoCard />
            </div>
          </div>

          {/* Quad 3: Customers & Showcase */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <CustomerListTable />
            </div>
            <div className="space-y-8">
              <EarningsShowcase />
              <CommunityProgress />
            </div>
          </div>
        </div>

        {/* Right Sidebar Area (1 Column) */}
        <div className="space-y-8">
           <LiveActivitiesSidebar />
           <PremiumUpgradeCard />
        </div>
      </div>
    </div>
  )
}
