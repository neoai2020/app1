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
  { name: "Emma W.", amount: 735, timeframe: "this month", method: "quality over quantity" },
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
    <Card className="glass-strong border-2 border-[#fbbf24]/40 glow-gold overflow-hidden relative">
      <div className="absolute inset-0 bg-gradient-to-br from-[#fbbf24]/5 via-transparent to-[#fb923c]/5" />
      
      <CardHeader className="relative z-10 pb-5 border-b-2 border-[#fbbf24]/20">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#fbbf24] to-[#fb923c] flex items-center justify-center shadow-lg">
            <DollarSign className="w-7 h-7 text-[#0d0a1a]" />
          </div>
          <div>
            <CardTitle className="text-2xl font-extrabold text-white">
              Member Earnings Dashboard
            </CardTitle>
            <p className="text-sm text-[#c4b5fd] font-semibold mt-1">
              Real results from Robinhood members
            </p>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-6 relative z-10 pt-6">
        {/* Featured Success Story */}
        <div
          className={`p-6 rounded-2xl border-2 border-[#fbbf24]/40 bg-gradient-to-br from-[#fbbf24]/10 to-[#fb923c]/5 transition-all duration-300 ${
            isAnimating ? "opacity-50 scale-95" : "opacity-100 scale-100"
          }`}
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#a855f7] to-[#d946ef] flex items-center justify-center text-white font-bold text-lg shadow-lg">
                {currentSuccess.name.charAt(0)}
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <p className="text-xl font-extrabold text-white">{currentSuccess.name}</p>
                  <Star className="w-4 h-4 text-[#fbbf24] fill-[#fbbf24]" />
                </div>
                <p className="text-xs text-[#fbbf24] font-bold uppercase tracking-wide">Verified Member</p>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="text-5xl font-black bg-gradient-to-r from-[#fbbf24] to-[#fb923c] bg-clip-text text-transparent">
                ${currentSuccess.amount.toLocaleString()}
              </span>
            </div>
            <p className="text-base text-[#c4b5fd]">
              Earned in <span className="font-bold text-white">{currentSuccess.timeframe}</span>
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#a855f7]/20 border border-[#a855f7]/30">
              <Sparkles className="w-4 h-4 text-[#a855f7]" />
              <span className="text-sm font-bold text-[#a855f7]">{currentSuccess.method}</span>
            </div>
          </div>
        </div>

        {/* Community Stats Grid */}
        <div className="grid grid-cols-3 gap-4">
          <div className="p-4 rounded-xl glass border-2 border-[#a855f7]/30 text-center hover:scale-105 transition-transform">
            <DollarSign className="w-6 h-6 text-[#fbbf24] mx-auto mb-2" />
            <p className="text-2xl font-black text-white">
              ${(COMMUNITY_STATS.totalEarnings / 1000).toFixed(0)}K+
            </p>
            <p className="text-xs text-[#c4b5fd] font-bold mt-1">Community Total</p>
          </div>

          <div className="p-4 rounded-xl glass border-2 border-[#d946ef]/30 text-center hover:scale-105 transition-transform">
            <Users className="w-6 h-6 text-[#d946ef] mx-auto mb-2" />
            <p className="text-2xl font-black text-white">{COMMUNITY_STATS.activeEarners.toLocaleString()}</p>
            <p className="text-xs text-[#c4b5fd] font-bold mt-1">Active Earners</p>
          </div>

          <div className="p-4 rounded-xl glass border-2 border-[#fbbf24]/30 text-center hover:scale-105 transition-transform">
            <TrendingUp className="w-6 h-6 text-[#fbbf24] mx-auto mb-2" />
            <p className="text-2xl font-black text-white">${COMMUNITY_STATS.avgPerMember}</p>
            <p className="text-xs text-[#c4b5fd] font-bold mt-1">Avg/Member</p>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="p-4 rounded-xl bg-[#1a1429]/80 border border-[#a855f7]/20">
          <p className="text-xs text-[#c4b5fd] leading-relaxed">
            <span className="font-bold text-white">⚠️ Disclaimer:</span> Results shown are from
            select members and not typical. Your results will vary. No earnings are guaranteed.
            Past performance does not indicate future results.
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
