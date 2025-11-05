"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, FileText, DollarSign, MousePointerClick, Users } from "lucide-react"

function randomBetween(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

function randomFloatBetween(min: number, max: number): number {
  return Number.parseFloat((Math.random() * (max - min) + min).toFixed(2))
}

export function LiveStatsWidget() {
  const [stats, setStats] = useState({
    articlesPublished: randomBetween(1182, 1367),
    avgFastCash: randomFloatBetween(3.1, 4.25),
    affiliateClicks: randomBetween(8900, 11500),
    activeMembers: randomBetween(2700, 3200),
    totalMoney: randomBetween(42000, 52000),
  })

  const [flicker, setFlicker] = useState(false)

  useEffect(() => {
    const flickerInterval = setInterval(
      () => {
        setFlicker(true)
        setStats((prev) => ({
          articlesPublished: prev.articlesPublished + randomBetween(1, 3),
          avgFastCash: Number.parseFloat((prev.avgFastCash + randomFloatBetween(0.01, 0.05)).toFixed(2)),
          affiliateClicks: prev.affiliateClicks + randomBetween(5, 15),
          activeMembers: prev.activeMembers + randomBetween(1, 5),
          totalMoney: prev.totalMoney + randomBetween(50, 200),
        }))
        setTimeout(() => setFlicker(false), 300)
      },
      randomBetween(2000, 4000),
    )

    return () => clearInterval(flickerInterval)
  }, [])

  return (
    <Card className="glass-strong border-2 border-cyan-500/30 shadow-2xl overflow-hidden relative">
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-emerald-500/5 to-amber-500/5 animate-pulse" />

      <CardHeader className="relative z-10 pb-4">
        <CardTitle className="text-2xl lg:text-3xl font-bold text-foreground flex items-center gap-3">
          <span className="text-4xl animate-bounce">💵</span>
          <span className="bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent">
            What's Happening Inside P55 Right Now
          </span>
        </CardTitle>
        <p className="text-base lg:text-lg text-muted-foreground mt-2 font-medium">
          Members are generating real results every single day through their P55 Accounts.
        </p>
      </CardHeader>

      <CardContent className="space-y-6 relative z-10">
        <div className="grid grid-cols-2 gap-4">
          <div
            className={`p-5 rounded-xl bg-gradient-to-br from-cyan-500/10 to-cyan-500/5 border-2 border-cyan-500/30 transition-all duration-300 ${flicker ? "scale-105 border-cyan-400/50 shadow-lg shadow-cyan-500/20" : ""}`}
          >
            <div className="flex items-center gap-2 mb-2">
              <FileText className="w-5 h-5 text-cyan-400" />
              <p className="text-sm font-semibold text-muted-foreground">Articles Published Today</p>
            </div>
            <p className="text-3xl lg:text-4xl font-bold text-cyan-400">{stats.articlesPublished.toLocaleString()}</p>
          </div>

          <div
            className={`p-5 rounded-xl bg-gradient-to-br from-emerald-500/10 to-emerald-500/5 border-2 border-emerald-500/30 transition-all duration-300 ${flicker ? "scale-105 border-emerald-400/50 shadow-lg shadow-emerald-500/20" : ""}`}
          >
            <div className="flex items-center gap-2 mb-2">
              <DollarSign className="w-5 h-5 text-emerald-400" />
              <p className="text-sm font-semibold text-muted-foreground">Avg Fast Cash Completed</p>
            </div>
            <p className="text-3xl lg:text-4xl font-bold text-emerald-400">{stats.avgFastCash}</p>
          </div>

          <div
            className={`p-5 rounded-xl bg-gradient-to-br from-violet-500/10 to-violet-500/5 border-2 border-violet-500/30 transition-all duration-300 ${flicker ? "scale-105 border-violet-400/50 shadow-lg shadow-violet-500/20" : ""}`}
          >
            <div className="flex items-center gap-2 mb-2">
              <MousePointerClick className="w-5 h-5 text-violet-400" />
              <p className="text-sm font-semibold text-muted-foreground">Affiliate Clicks Tracked</p>
            </div>
            <p className="text-3xl lg:text-4xl font-bold text-violet-400">{stats.affiliateClicks.toLocaleString()}</p>
          </div>

          <div
            className={`p-5 rounded-xl bg-gradient-to-br from-amber-500/10 to-amber-500/5 border-2 border-amber-500/30 transition-all duration-300 ${flicker ? "scale-105 border-amber-400/50 shadow-lg shadow-amber-500/20" : ""}`}
          >
            <div className="flex items-center gap-2 mb-2">
              <Users className="w-5 h-5 text-amber-400" />
              <p className="text-sm font-semibold text-muted-foreground">Members Active This Week</p>
            </div>
            <p className="text-3xl lg:text-4xl font-bold text-amber-400">{stats.activeMembers.toLocaleString()}</p>
          </div>
        </div>

        <div
          className={`p-8 rounded-2xl bg-gradient-to-r from-emerald-500/20 via-amber-500/20 to-emerald-500/20 border-4 border-emerald-400/50 shadow-2xl shadow-emerald-500/30 transition-all duration-300 ${flicker ? "scale-[1.02] border-emerald-300/70 shadow-emerald-500/50" : ""}`}
        >
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <p className="text-base lg:text-lg font-bold text-foreground mb-3 uppercase tracking-wide">
                Total Money Generated With P55 Today For Our Members
              </p>
              <p className="text-5xl lg:text-6xl font-black bg-gradient-to-r from-emerald-400 via-amber-400 to-emerald-400 bg-clip-text text-transparent animate-pulse">
                ${stats.totalMoney.toLocaleString()}
              </p>
            </div>
            <TrendingUp className="w-16 h-16 lg:w-20 lg:h-20 text-emerald-400 animate-bounce" />
          </div>
        </div>

        <div className="flex items-center justify-center gap-2">
          <div className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse shadow-lg shadow-emerald-500/50" />
          <p className="text-sm font-bold text-emerald-400 uppercase tracking-wider">Live Updates</p>
        </div>
      </CardContent>
    </Card>
  )
}
