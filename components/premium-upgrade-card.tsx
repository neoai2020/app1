"use client"

import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Zap, ChevronRight } from "lucide-react"

export function PremiumUpgradeCard() {
  return (
    <Card className="glass-card border-2 border-white/5 bg-[#111111] overflow-hidden relative group rounded-3xl">
      {/* Premium Linear Gradient Background */}
      <div className="absolute inset-0 bg-linear-to-br from-[#B3FF00]/10 via-transparent to-transparent opacity-50 group-hover:opacity-70 transition-opacity duration-500" />
      
      <CardContent className="p-8 relative z-10 flex flex-col gap-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-[#B3FF00] flex items-center justify-center shadow-[0_0_30px_rgba(179,255,0,0.3)]">
            <Zap className="w-9 h-9 text-black fill-black" />
          </div>
          <div>
            <h3 className="text-2xl font-black text-white tracking-tight leading-tight uppercase italic">Upgrade to<br />Premium</h3>
          </div>
        </div>

        <p className="text-[11px] text-zinc-100 font-bold uppercase tracking-tight leading-relaxed">
          Unlock exclusive community insights, higher earnings cap, and priority manager support.
        </p>

        <Button asChild className="w-full h-14 bg-[#1a1a1a] hover:bg-[#222222] text-white font-black text-xs uppercase tracking-[0.2em] border border-white/10 rounded-2xl flex items-center justify-between px-8 group/btn transition-all duration-300">
          <Link href="/upgrades" className="flex items-center justify-between w-full">
            <span>Go Premium</span>
            <ChevronRight className="w-5 h-5 text-[#B3FF00] group-hover/btn:translate-x-1 transition-transform" />
          </Link>
        </Button>
        
        <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-[0.15em] text-center">Join 1,200+ active premium members</p>
      </CardContent>
    </Card>
  )
}
