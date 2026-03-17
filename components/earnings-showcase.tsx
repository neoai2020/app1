"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DollarSign, TrendingUp, Users, Sparkles, Star } from "lucide-react"

// Money-focused social proof with rotating success cases
const SUCCESS_CASES = [
  { name: "Michael R.", amount: 847, timeframe: "last 30 days", method: "consistent commenting" },
  { name: "Sarah K.", amount: 1240, timeframe: "this month", method: "targeting trending shorts" },
  { name: "James P.", amount: 623, timeframe: "last 3 weeks", method: "early morning posts" },
  { name: "Lisa M.", amount: 1580, timeframe: "past month", method: "niche-specific engagement" },
  { name: "David T.", amount: 920, timeframe: "last 4 weeks", method: "reply strategy" },
  { name: "Ryan B.", amount: 1120, timeframe: "last 30 days", method: "viral short targeting" },
  { name: "Ashley D.", amount: 890, timeframe: "past 3 weeks", method: "consistent daily posting" },
]

const COMMUNITY_STATS = {
  totalEarnings: 847320,
  activeEarners: 1847,
  avgPerMember: 459,
}

export function EarningsShowcase() {
  const [currentCase, setCurrentCase] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true)
      setTimeout(() => {
        setCurrentCase((prev) => (prev + 1) % SUCCESS_CASES.length)
        setIsAnimating(false)
      }, 300)
    }, 5000) // Change every 5 seconds

    return () => clearInterval(interval)
  }, [])

  const currentSuccess = SUCCESS_CASES[currentCase]

  return (
    <Card className="glass-card border-white/5 bg-[#111111] overflow-hidden relative group">
      <div className="absolute inset-0 bg-linear-to-br from-primary/5 via-transparent to-primary/5 opacity-50" />
      
      <CardHeader className="relative z-10 p-8 pb-6 border-b border-white/5">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center border border-primary/20">
            <DollarSign className="w-6 h-6 text-primary" />
          </div>
          <div>
            <CardTitle className="text-lg font-black text-white uppercase tracking-wider">
              Earnings Showcase
            </CardTitle>
            <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-tight mt-1">
              Verified community results
            </p>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-6 relative z-10 p-8">
        {/* Featured Success Story */}
        <div
          className={`p-6 rounded-2xl border border-white/5 bg-white/2 transition-all duration-300 ${
            isAnimating ? "opacity-50 scale-95" : "opacity-100 scale-100"
          }`}
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-black font-black text-sm">
                {currentSuccess.name.charAt(0)}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <p className="text-sm font-black text-white">{currentSuccess.name}</p>
                  <Star className="w-3 h-3 text-primary fill-primary" />
                </div>
                <p className="text-[10px] text-primary font-black uppercase tracking-widest">Verified</p>
              </div>
            </div>
            <div className="text-3xl font-black text-primary drop-shadow-[0_0_15px_rgba(179,255,0,0.3)]">
              ${currentSuccess.amount}
            </div>
          </div>
          
          <div className="space-y-3">
            <p className="text-xs text-zinc-400 font-medium">
              Earned in <span className="text-white font-bold">{currentSuccess.timeframe}</span>
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-primary/5 border border-primary/10">
              <Sparkles className="w-3 h-3 text-primary" />
              <span className="text-[10px] font-black text-primary uppercase tracking-tight">{currentSuccess.method}</span>
            </div>
          </div>
        </div>

        {/* Community Stats Grid */}
        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-white/2 border border-white/5 text-center group-hover:border-primary/20 transition-colors">
            <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest mb-1">Total</p>
            <p className="text-xl font-black text-white">${(COMMUNITY_STATS.totalEarnings / 1000).toFixed(0)}K+</p>
          </div>
          <div className="p-4 rounded-xl bg-white/2 border border-white/5 text-center group-hover:border-primary/20 transition-colors">
            <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest mb-1">Earners</p>
            <p className="text-xl font-black text-white">{COMMUNITY_STATS.activeEarners}</p>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="p-4 rounded-xl bg-black/40 border border-white/5">
          <p className="text-[9px] text-zinc-500 leading-relaxed font-medium">
            <span className="font-bold text-zinc-400">DISCLAIMER:</span> Results shown are from
            select members and not typical. Your results will vary. No earnings are guaranteed.
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
