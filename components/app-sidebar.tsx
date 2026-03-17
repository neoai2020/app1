"use client"

import {
  LayoutDashboard,
  ShoppingCart,
  BarChart2,
  Users,
  MessageSquare,
  Star,
  Settings,
  HelpCircle,
  Search,
  LogOut,
  TrendingUp,
  Brain,
  Video,
  FileText,
  Zap,
  Crown,
  Sparkles,
} from "lucide-react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"

const dashboardItems = [
  { title: "Control Hub", url: "/dashboard", icon: LayoutDashboard },
  { title: "Trend Hijacker", url: "/create", icon: TrendingUp },
  { title: "Asset Library", url: "/pages", icon: FileText },
  { title: "Link Hub", url: "/share", icon: Zap },
  { title: "Training Hub", url: "/training", icon: Brain },
]

const premiumItems = [
  { title: "Unlock", url: "/unlock", icon: Sparkles },
  { title: "Bonus Training", url: "/bonus-training", icon: Video },
  { title: "Upgrades", url: "/upgrades", icon: Crown },
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
    <aside className="fixed left-0 top-0 h-screen w-72 bg-background border-r border-white/5 flex flex-col z-50">
      {/* User Profile */}
      <div className="p-6">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-full bg-[#B3FF00] flex items-center justify-center">
            <Users className="w-5 h-5 text-black" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white leading-none">Guy Hawkins</h3>
            <p className="text-[10px] text-zinc-500 mt-1 uppercase tracking-tighter">Creator Account</p>
          </div>
        </div>

        {/* Search */}
        <div className="relative group mb-6">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500 group-hover:text-primary transition-colors" />
          <input 
            type="text" 
            placeholder="Search..." 
            className="w-full bg-[#161616] border border-white/5 rounded-xl py-2.5 pl-10 pr-4 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-primary/30 transition-all font-medium"
          />
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-zinc-600 font-bold bg-secondary px-1.5 py-0.5 rounded cursor-help">⌘ K</span>
        </div>
      </div>

      {/* Menu Sections */}
      <div className="flex-1 py-0 overflow-y-auto px-4 custom-scrollbar">
        {/* MAIN NAVIGATION */}
        <div className="mb-8">
          <p className="text-[10px] font-black text-[#B3FF00]/60 px-4 mb-3 uppercase tracking-[0.2em] italic">Command Center</p>
          <nav className="space-y-1">
            {dashboardItems.map((item) => {
              const isActive = pathname === item.url
              const Icon = item.icon
              return (
                <Link
                  key={item.title}
                  href={item.url}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all duration-200 ${
                    isActive
                      ? "bg-[#B3FF00] text-black shadow-[0_4px_15px_rgba(179,255,0,0.2)]"
                      : "text-zinc-500 hover:text-white hover:bg-white/3"
                  }`}
                >
                  <Icon className={`w-4 h-4 shrink-0 transition-colors ${isActive ? "text-black" : "text-zinc-500 group-hover:text-white"}`} />
                  <span>{item.title}</span>
                </Link>
              )
            })}
          </nav>
        </div>

        {/* PREMIUM FEATURES */}
        <div className="mb-8">
          <p className="text-[10px] font-black text-[#B3FF00]/60 px-4 mb-3 uppercase tracking-[0.2em] italic">Premium Sectors</p>
          <nav className="space-y-1">
            {premiumItems.map((item) => {
              const isActive = pathname === item.url
              const Icon = item.icon
              return (
                <Link
                  key={item.title}
                  href={item.url}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all duration-200 ${
                    isActive
                      ? "bg-[#B3FF00] text-black shadow-[0_4px_15px_rgba(179,255,0,0.2)]"
                      : "text-zinc-500 hover:text-white hover:bg-white/3"
                  }`}
                >
                  <Icon className={`w-4 h-4 shrink-0 transition-colors ${isActive ? "text-black" : "text-zinc-500 group-hover:text-white"}`} />
                  <span>{item.title}</span>
                </Link>
              )
            })}
          </nav>
        </div>

      </div>

      {/* Footer - Logo */}
      <div className="p-6 mt-auto">
        <div className="flex items-center gap-2 mb-6">
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <div className="flex items-center gap-0.5">
                {[1,2,3].map(i => <div key={i} className="w-1 h-3.5 bg-[#B3FF00]/40 rounded-full" />)}
              </div>
              <span className="text-lg font-black text-white tracking-widest uppercase italic">DWISON</span>
            </div>
          </div>
        </div>
        <button
          onClick={handleSignOut}
          className="w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-bold text-zinc-500 hover:text-white hover:bg-white/3 transition-all"
        >
          <span>Logout</span>
          <LogOut className="w-4 h-4" />
        </button>
      </div>
    </aside>
  )
}
