"use client"

import {
  Home,
  Zap,
  FileText,
  GraduationCap,
  Crown,
  Settings,
  LogOut,
  Share2,
  DollarSign,
  TrendingUp,
  Sparkles,
  Rocket,
} from "lucide-react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"

const menuItems = [
  { title: "Dashboard", url: "/dashboard", icon: Home },
  { title: "Build P55 Page", url: "/create", icon: Zap },
  { title: "Your P55 Pages", url: "/pages", icon: FileText },
  { title: "Share & Promote", url: "/share", icon: Share2 },
  { title: "Instant Cash Injection", url: "/instant-cash", icon: DollarSign },
  { title: "New System to Earn $1,000-$5,000 Per Day", url: "/bonus-training", icon: TrendingUp },
  { title: "P55 Training", url: "/training", icon: GraduationCap },
  { title: "Settings", url: "/settings", icon: Settings },
]

const premiumItems = [
  { title: "DFY Vault", url: "/upgrades/dfy-vault", icon: Crown },
  { title: "Instant Income", url: "/upgrades/instant-income", icon: Sparkles },
  { title: "Automated Income", url: "/upgrades/automated-income", icon: Rocket },
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
    <aside className="fixed left-0 top-0 h-screen w-64 border-r border-white/10 bg-[#0A0E12] flex flex-col z-50">
      {/* Header */}
      <div className="p-6 border-b border-white/10">
        <Link href="/dashboard" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#00f0ff] via-[#7a5cff] to-[#1ce5a1] flex items-center justify-center shadow-[0_0_40px_rgba(0,240,255,0.4)]">
            <span className="text-2xl font-bold text-[#0A0E12]">P</span>
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">P55 Account</h2>
            <p className="text-sm text-[#00f0ff]">Your Profit System</p>
          </div>
        </Link>
      </div>

      {/* Menu */}
      <div className="flex-1 py-6 overflow-y-auto">
        <p className="text-base font-semibold text-[#00f0ff]/70 px-4 mb-2">Menu</p>
        <nav className="space-y-1 px-2">
          {menuItems.map((item) => {
            const isActive = pathname === item.url
            const Icon = item.icon
            return (
              <Link
                key={item.title}
                href={item.url}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg text-lg font-medium transition-colors duration-150 ${
                  isActive ? "bg-[#00f0ff]/20 text-[#00f0ff]" : "text-white hover:bg-[#00f0ff]/10 hover:text-[#00f0ff]"
                }`}
              >
                <Icon className="w-6 h-6 flex-shrink-0" />
                <span>{item.title}</span>
              </Link>
            )
          })}
        </nav>

        {/* Premium Features */}
        <div className="mt-6">
          <p className="text-base font-semibold text-[#FFD700] px-4 mb-2 flex items-center gap-2">
            <Sparkles className="w-4 h-4" />
            Premium Features
          </p>
          <nav className="space-y-1 px-2">
            {premiumItems.map((item) => {
              const isActive = pathname === item.url
              const Icon = item.icon
              return (
                <Link
                  key={item.title}
                  href={item.url}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg text-lg font-medium transition-all duration-150 border-2 ${
                    isActive
                      ? "bg-gradient-to-r from-[#FFD700]/20 to-[#FFA500]/20 border-[#FFD700] text-[#FFD700]"
                      : "border-[#FFD700]/30 text-white hover:border-[#FFD700] hover:bg-[#FFD700]/10 hover:text-[#FFD700]"
                  }`}
                >
                  <Icon className="w-6 h-6 flex-shrink-0" />
                  <span>{item.title}</span>
                </Link>
              )
            })}
          </nav>
        </div>
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-white/10">
        <button
          onClick={handleSignOut}
          className="w-full h-14 text-lg font-medium text-white bg-transparent border border-white/20 rounded-lg hover:border-[#00f0ff]/50 hover:text-[#00f0ff] hover:bg-[#00f0ff]/5 transition-all duration-200 flex items-center justify-center gap-2"
        >
          <LogOut className="w-5 h-5" />
          Sign Out
        </button>
      </div>
    </aside>
  )
}
