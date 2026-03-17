"use client"

import {
  LayoutDashboard,
  Brain,
  FolderOpen,
  Upload,
  Banknote,
  TrendingUp,
  Play,
  Settings,
  LogOut,
  Gem,
  Sparkles,
  Zap,
} from "lucide-react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"

const menuItems = [
  { title: "Command Center", url: "/dashboard", icon: LayoutDashboard },
  { title: "Gold Rush", url: "/create", icon: Brain },
  { title: "My Vault", url: "/pages", icon: FolderOpen },
  { title: "Link Vault", url: "/share", icon: Upload },
  { title: "Scale Your Robinhood To $1,000+ Per Day", url: "/bonus-training", icon: TrendingUp },
  { title: "Academy", url: "/training", icon: Play },
]

const premiumItems = [
  { title: "Robinhood DFY", url: "/upgrades/dfy-vault", icon: Gem },
  { title: "Robinhood Instant Income", url: "/upgrades/instant-income", icon: Sparkles },
  { title: "Robinhood Autopilot", url: "/upgrades/automated-income", icon: Zap },
]

export function AppSidebar() {
  const pathname = usePathname()
  const router = useRouter()

  const handleSignOut = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push("/auth/login")
  }

  return (
    <aside className="fixed left-0 top-0 h-screen w-72 border-r-2 border-primary/20 bg-linear-to-b from-background via-card to-background flex flex-col z-50">
      {/* Header - Brain Logo */}
      <div className="p-6 border-b-2 border-primary/20">
        <Link href="/dashboard" className="flex items-center gap-3 hover:opacity-90 transition-opacity group">
          <div className="relative w-14 h-14 rounded-2xl bg-linear-to-br from-primary via-secondary to-accent flex items-center justify-center shadow-[0_0_60px_rgba(212,175,55,0.4)] group-hover:shadow-[0_0_80px_rgba(212,175,55,0.6)] transition-shadow duration-300">
            <div className="w-12 h-12 rounded-xl bg-background flex items-center justify-center">
              <Brain className="w-7 h-7 text-primary" />
            </div>
          </div>
          <div>
            <h2 className="text-xl font-extrabold text-white tracking-tight">Robinhood</h2>
            <p className="text-xs text-secondary font-semibold">Neural Engagement System</p>
          </div>
        </Link>
      </div>

      {/* Menu */}
      <div className="flex-1 py-6 overflow-y-auto">
        <p className="text-xs font-bold text-primary/60 px-6 mb-3 uppercase tracking-widest">Main Functions</p>
        <nav className="space-y-1 px-3">
          {menuItems.map((item) => {
            const isActive = pathname === item.url
            const Icon = item.icon
            return (
              <Link
                key={item.title}
                href={item.url}
                className={`flex items-center gap-3 px-4 py-3.5 rounded-2xl text-base font-bold transition-all duration-200 ${
                  isActive
                    ? "bg-linear-to-r from-primary/20 to-secondary/20 text-white border-2 border-primary/40 shadow-lg shadow-primary/20"
                    : "text-secondary hover:bg-primary/10 hover:text-white border-2 border-transparent"
                }`}
              >
                <Icon className="w-5 h-5 shrink-0" />
                <span>{item.title}</span>
              </Link>
            )
          })}
        </nav>

        {/* Premium Features */}
        <div className="mt-8">
          <div className="mx-6 mb-4 p-3 rounded-xl bg-linear-to-r from-[#fbbf24]/20 to-[#f97316]/20 border border-[#fbbf24]/30">
            <p className="text-xs font-bold text-[#fbbf24] uppercase tracking-widest flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5" />
              Premium Tier
            </p>
          </div>
          <nav className="space-y-2 px-3">
            {premiumItems.map((item) => {
              const isActive = pathname === item.url
              const Icon = item.icon
              return (
                <Link
                  key={item.title}
                  href={item.url}
                  className={`flex items-center gap-3 px-4 py-3.5 rounded-2xl text-base font-bold transition-all duration-200 border-2 ${
                    isActive
                      ? "bg-linear-to-r from-primary/30 to-accent/30 border-primary/60 text-primary shadow-lg shadow-primary/30"
                      : "border-primary/25 text-primary/80 hover:border-primary/50 hover:bg-primary/10 hover:text-primary"
                  }`}
                >
                  <Icon className="w-5 h-5 shrink-0" />
                  <span>{item.title}</span>
                </Link>
              )
            })}
          </nav>
        </div>
      </div>

      {/* Footer */}
      <div className="p-4 border-t-2 border-primary/20">
        <button
          onClick={handleSignOut}
          className="w-full h-14 text-base font-bold text-secondary bg-transparent border-2 border-primary/20 rounded-2xl hover:border-primary/50 hover:text-white hover:bg-primary/5 transition-all duration-200 flex items-center justify-center gap-2"
        >
          <LogOut className="w-5 h-5" />
          Exit Platform
        </button>
      </div>
    </aside>
  )
}
