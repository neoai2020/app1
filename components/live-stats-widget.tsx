"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, FileText, DollarSign, MousePointerClick, Users } from "lucide-react"

function getDailyBaseValues() {
  const today = new Date().toDateString()
  const seed = today.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0)

  // Use seed to generate consistent random values for the day
  const seededRandom = (min: number, max: number, offset: number) => {
    const x = Math.sin(seed + offset) * 10000
    return Math.floor(min + (x - Math.floor(x)) * (max - min + 1))
  }

  const seededRandomFloat = (min: number, max: number, offset: number) => {
    const x = Math.sin(seed + offset) * 10000
    return Number.parseFloat((min + (x - Math.floor(x)) * (max - min)).toFixed(2))
  }

  return {
    articlesPublished: seededRandom(1182, 1367, 1),
    avgFastCash: seededRandomFloat(3.1, 4.25, 2),
    affiliateClicks: seededRandom(8900, 11500, 3),
    activeMembers: seededRandom(2700, 3200, 4),
    totalMoney: seededRandom(42000, 52000, 5),
  }
}

export function LiveStatsWidget() {
  const [stats, setStats] = useState(getDailyBaseValues())
  const [flickerStates, setFlickerStates] = useState({
    articles: false,
    fastCash: false,
    clicks: false,
    members: false,
    money: false,
  })

  useEffect(() => {
    // Articles flicker every 3-5 seconds
    const articlesInterval = setInterval(
      () => {
        setFlickerStates((prev) => ({ ...prev, articles: true }))
        setStats((prev) => ({
          ...prev,
          articlesPublished: prev.articlesPublished + Math.floor(Math.random() * 3) + 1,
        }))
        setTimeout(() => setFlickerStates((prev) => ({ ...prev, articles: false })), 300)
      },
      3000 + Math.random() * 2000,
    )

    // Fast Cash flicker every 4-6 seconds
    const fastCashInterval = setInterval(
      () => {
        setFlickerStates((prev) => ({ ...prev, fastCash: true }))
        setStats((prev) => ({
          ...prev,
          avgFastCash: Number.parseFloat((prev.avgFastCash + Math.random() * 0.04 + 0.01).toFixed(2)),
        }))
        setTimeout(() => setFlickerStates((prev) => ({ ...prev, fastCash: false })), 300)
      },
      4000 + Math.random() * 2000,
    )

    // Clicks flicker every 2-4 seconds
    const clicksInterval = setInterval(
      () => {
        setFlickerStates((prev) => ({ ...prev, clicks: true }))
        setStats((prev) => ({
          ...prev,
          affiliateClicks: prev.affiliateClicks + Math.floor(Math.random() * 11) + 5,
        }))
        setTimeout(() => setFlickerStates((prev) => ({ ...prev, clicks: false })), 300)
      },
      2000 + Math.random() * 2000,
    )

    // Members flicker every 5-7 seconds
    const membersInterval = setInterval(
      () => {
        setFlickerStates((prev) => ({ ...prev, members: true }))
        setStats((prev) => ({
          ...prev,
          activeMembers: prev.activeMembers + Math.floor(Math.random() * 5) + 1,
        }))
        setTimeout(() => setFlickerStates((prev) => ({ ...prev, members: false })), 300)
      },
      5000 + Math.random() * 2000,
    )

    // Money flicker every 3-5 seconds
    const moneyInterval = setInterval(
      () => {
        setFlickerStates((prev) => ({ ...prev, money: true }))
        setStats((prev) => ({
          ...prev,
          totalMoney: prev.totalMoney + Math.floor(Math.random() * 151) + 50,
        }))
        setTimeout(() => setFlickerStates((prev) => ({ ...prev, money: false })), 300)
      },
      3000 + Math.random() * 2000,
    )

    return () => {
      clearInterval(articlesInterval)
      clearInterval(fastCashInterval)
      clearInterval(clicksInterval)
      clearInterval(membersInterval)
      clearInterval(moneyInterval)
    }
  }, [])

  return (
    <Card className="glass-strong border-2 border-cyan-500/30 shadow-xl overflow-hidden relative scale-75 origin-top">
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-emerald-500/5 to-amber-500/5" />

      <CardHeader className="relative z-10 pb-3 text-center">
        <CardTitle className="text-2xl font-bold text-white flex items-center justify-center gap-2">
          <span className="text-3xl">💵</span>
          <span>What's Happening Inside P55 Right Now</span>
        </CardTitle>
        <p className="text-sm text-muted-foreground mt-1 font-medium">
          Members are generating real results every single day through their P55 Accounts.
        </p>
      </CardHeader>

      <CardContent className="space-y-4 relative z-10">
        <div className="grid grid-cols-2 gap-3">
          <div
            className={`p-3 rounded-lg bg-gradient-to-br from-cyan-500/10 to-cyan-500/5 border border-cyan-500/30 transition-all duration-300 text-center ${flickerStates.articles ? "scale-105 border-cyan-400/50 shadow-lg shadow-cyan-500/20" : ""}`}
          >
            <div className="flex items-center justify-center gap-1 mb-1">
              <FileText className="w-4 h-4 text-cyan-400" />
              <p className="text-xs font-semibold text-muted-foreground">Articles Today</p>
            </div>
            <p className="text-2xl font-bold text-cyan-400">{stats.articlesPublished.toLocaleString()}</p>
          </div>

          <div
            className={`p-3 rounded-lg bg-gradient-to-br from-emerald-500/10 to-emerald-500/5 border border-emerald-500/30 transition-all duration-300 text-center ${flickerStates.fastCash ? "scale-105 border-emerald-400/50 shadow-lg shadow-emerald-500/20" : ""}`}
          >
            <div className="flex items-center justify-center gap-1 mb-1">
              <DollarSign className="w-4 h-4 text-emerald-400" />
              <p className="text-xs font-semibold text-muted-foreground">Avg Fast Cash</p>
            </div>
            <p className="text-2xl font-bold text-emerald-400">{stats.avgFastCash}</p>
          </div>

          <div
            className={`p-3 rounded-lg bg-gradient-to-br from-violet-500/10 to-violet-500/5 border border-violet-500/30 transition-all duration-300 text-center ${flickerStates.clicks ? "scale-105 border-violet-400/50 shadow-lg shadow-violet-500/20" : ""}`}
          >
            <div className="flex items-center justify-center gap-1 mb-1">
              <MousePointerClick className="w-4 h-4 text-violet-400" />
              <p className="text-xs font-semibold text-muted-foreground">Clicks Tracked</p>
            </div>
            <p className="text-2xl font-bold text-violet-400">{stats.affiliateClicks.toLocaleString()}</p>
          </div>

          <div
            className={`p-3 rounded-lg bg-gradient-to-br from-amber-500/10 to-amber-500/5 border border-amber-500/30 transition-all duration-300 text-center ${flickerStates.members ? "scale-105 border-amber-400/50 shadow-lg shadow-amber-500/20" : ""}`}
          >
            <div className="flex items-center justify-center gap-1 mb-1">
              <Users className="w-4 h-4 text-amber-400" />
              <p className="text-xs font-semibold text-muted-foreground">Active This Week</p>
            </div>
            <p className="text-2xl font-bold text-amber-400">{stats.activeMembers.toLocaleString()}</p>
          </div>
        </div>

        <div
          className={`p-4 rounded-xl bg-gradient-to-r from-emerald-500/20 via-amber-500/20 to-emerald-500/20 border-2 border-emerald-400/50 shadow-xl shadow-emerald-500/20 transition-all duration-300 text-center ${flickerStates.money ? "scale-[1.02] border-emerald-300/70 shadow-emerald-500/40" : ""}`}
        >
          <p className="text-xs font-bold text-foreground mb-2 uppercase tracking-wide">Total Money Generated Today</p>
          <div className="flex items-center justify-center gap-2">
            <p className="text-3xl font-black text-emerald-400">${stats.totalMoney.toLocaleString()}</p>
            <TrendingUp className="w-6 h-6 text-emerald-400" />
          </div>
        </div>

        <div className="flex items-center justify-center gap-2">
          <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-lg shadow-emerald-500/50" />
          <p className="text-xs font-bold text-emerald-400 uppercase tracking-wider">Live</p>
        </div>
      </CardContent>
    </Card>
  )
}
