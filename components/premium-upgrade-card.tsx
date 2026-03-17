"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Zap, ChevronRight } from "lucide-react"

export function PremiumUpgradeCard() {
  return (
    <Card className="glass-card border-white/5 bg-[#111111] overflow-hidden relative group">
      {/* Premium Linear Gradient Background */}
      <div className="absolute inset-0 bg-linear-to-br from-primary/20 via-primary/5 to-transparent opacity-50 group-hover:opacity-70 transition-opacity duration-500" />
      
      <CardContent className="p-8 relative z-10 flex flex-col gap-6">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-primary flex items-center justify-center shadow-[0_0_20px_rgba(179,255,0,0.4)]">
            <Zap className="w-8 h-8 text-black fill-black" />
          </div>
          <div>
            <h3 className="text-xl font-black text-white tracking-tight leading-tight uppercase">Upgrade to<br />Premium</h3>
          </div>
        </div>

        <p className="text-xs text-zinc-400 font-bold uppercase tracking-tight leading-relaxed">
          Unlock exclusive community insights, higher earnings cap, and priority manager support.
        </p>

        <Button className="w-full h-14 bg-white/3 hover:bg-white/5 text-white font-black text-xs uppercase tracking-[0.2em] border border-white/10 rounded-2xl flex items-center justify-between px-8 group/btn">
          <span>Go Premium</span>
          <ChevronRight className="w-4 h-4 text-primary group-hover/btn:translate-x-1 transition-transform" />
        </Button>
        
        <p className="text-[9px] text-zinc-600 font-bold uppercase tracking-widest text-center">Join 1,200+ active premium members</p>
      </CardContent>
    </Card>
  )
}
