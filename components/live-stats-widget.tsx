"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, FileText, DollarSign, MousePointerClick, Users, CheckCircle2 } from "lucide-react"

const SUCCESS_STORIES = [
  { name: "Sarah M.", amount: 247, action: "earned from her P55 page" },
  { name: "Mike T.", amount: 1834, action: "generated this week" },
]

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

function getInitialStats() {
  if (typeof window === "undefined") return getDailyBaseValues()

  const stored = localStorage.getItem("p55-live-stats")
  const today = new Date().toDateString()

  if (stored) {
    const parsed = JSON.parse(stored)
    // Check if it's the same day
    if (parsed.date === today) {
      return parsed.stats
    }
  }

  // New day or no stored data - get fresh base values
  const baseValues = getDailyBaseValues()
  localStorage.setItem("p55-live-stats", JSON.stringify({ date: today, stats: baseValues }))
  return baseValues
}

export function LiveStatsWidget() {
  const [stats, setStats] = useState(getInitialStats())
  const [flickerStates, setFlickerStates] = useState({
    articles: false,
    fastCash: false,
    clicks: false,
    members: false,
    money: false,
  })
  const [currentStory, setCurrentStory] = useState<{ name: string; amount: number; action: string } | null>(null)
  const [isStoryVisible, setIsStoryVisible] = useState(false)

  useEffect(() => {
    const incrementStats = () => {
      setStats((prev) => {
        const newStats = {
          articlesPublished: prev.articlesPublished + Math.floor(Math.random() * 3) + 1, // +1 to +3
          avgFastCash: Number.parseFloat((prev.avgFastCash + Math.random() * 0.05).toFixed(2)), // +0 to +0.05
          affiliateClicks: prev.affiliateClicks + Math.floor(Math.random() * 15) + 5, // +5 to +20
          activeMembers: prev.activeMembers + Math.floor(Math.random() * 2), // +0 to +1
          totalMoney: prev.totalMoney + Math.floor(Math.random() * 50) + 20, // +20 to +70
        }

        // Save to localStorage
        const today = new Date().toDateString()
        localStorage.setItem("p55-live-stats", JSON.stringify({ date: today, stats: newStats }))

        return newStats
      })

      // Trigger random flicker effect
      const keys = Object.keys(flickerStates) as Array<keyof typeof flickerStates>
      const randomKey = keys[Math.floor(Math.random() * keys.length)]
      setFlickerStates((prev) => ({ ...prev, [randomKey]: true }))
      setTimeout(() => {
        setFlickerStates((prev) => ({ ...prev, [randomKey]: false }))
      }, 300)
    }

    // Increment every 4-6 seconds
    const interval = setInterval(
      () => {
        incrementStats()
      },
      4000 + Math.random() * 2000,
    )

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const showRandomStory = () => {
      const randomStory = SUCCESS_STORIES[Math.floor(Math.random() * SUCCESS_STORIES.length)]
      setCurrentStory(randomStory)
      setIsStoryVisible(true)

      setTimeout(() => {
        setIsStoryVisible(false)
      }, 5000)
    }

    const initialStoryTimeout = setTimeout(showRandomStory, 3000)
    const storyInterval = setInterval(
      () => {
        showRandomStory()
      },
      60000 + Math.random() * 60000,
    )

    return () => {
      clearTimeout(initialStoryTimeout)
      clearInterval(storyInterval)
    }
  }, [])

  return (
    <Card className="glass-strong border-2 border-cyan-500/30 shadow-xl overflow-hidden relative scale-90 origin-top">
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-emerald-500/5 to-amber-500/5" />

      <CardHeader className="relative z-10 pb-3 text-center">
        <CardTitle className="text-3xl font-bold text-white flex items-center justify-center gap-2">
          <span className="text-3xl">💵</span>
          <span>What's Happening Inside P55 Right Now</span>
        </CardTitle>
        <p className="text-sm text-gray-300 mt-1 font-medium">
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
              <p className="text-xs font-semibold text-gray-300">Articles Today</p>
            </div>
            <p className="text-2xl font-bold text-cyan-400">{stats.articlesPublished.toLocaleString()}</p>
          </div>

          <div
            className={`p-3 rounded-lg bg-gradient-to-br from-emerald-500/10 to-emerald-500/5 border border-emerald-500/30 transition-all duration-300 text-center ${flickerStates.fastCash ? "scale-105 border-emerald-400/50 shadow-lg shadow-emerald-500/20" : ""}`}
          >
            <div className="flex items-center justify-center gap-1 mb-1">
              <DollarSign className="w-4 h-4 text-emerald-400" />
              <p className="text-xs font-semibold text-gray-300">Avg Fast Cash</p>
            </div>
            <p className="text-2xl font-bold text-emerald-400">{stats.avgFastCash}</p>
          </div>

          <div
            className={`p-3 rounded-lg bg-gradient-to-br from-violet-500/10 to-violet-500/5 border border-violet-500/30 transition-all duration-300 text-center ${flickerStates.clicks ? "scale-105 border-violet-400/50 shadow-lg shadow-violet-500/20" : ""}`}
          >
            <div className="flex items-center justify-center gap-1 mb-1">
              <MousePointerClick className="w-4 h-4 text-violet-400" />
              <p className="text-xs font-semibold text-gray-300">Clicks Tracked</p>
            </div>
            <p className="text-2xl font-bold text-violet-400">{stats.affiliateClicks.toLocaleString()}</p>
          </div>

          <div
            className={`p-3 rounded-lg bg-gradient-to-br from-amber-500/10 to-amber-500/5 border border-amber-500/30 transition-all duration-300 text-center ${flickerStates.members ? "scale-105 border-amber-400/50 shadow-lg shadow-amber-500/20" : ""}`}
          >
            <div className="flex items-center justify-center gap-1 mb-1">
              <Users className="w-4 h-4 text-amber-400" />
              <p className="text-xs font-semibold text-gray-300">Active This Week</p>
            </div>
            <p className="text-2xl font-bold text-amber-400">{stats.activeMembers.toLocaleString()}</p>
          </div>
        </div>

        <div
          className={`p-4 rounded-xl bg-gradient-to-r from-emerald-500/20 via-amber-500/20 to-emerald-500/20 border-2 border-emerald-400/50 shadow-xl shadow-emerald-500/20 transition-all duration-300 text-center ${flickerStates.money ? "scale-[1.02] border-emerald-300/70 shadow-emerald-500/40" : ""}`}
        >
          <p className="text-xs font-bold text-gray-200 mb-2 uppercase tracking-wide">Total Money Generated Today</p>
          <div className="flex items-center justify-center gap-2">
            <p className="text-3xl font-black text-emerald-400">${stats.totalMoney.toLocaleString()}</p>
            <TrendingUp className="w-6 h-6 text-emerald-400" />
          </div>
        </div>

        <div className="min-h-[80px] flex items-center justify-center">
          {isStoryVisible && currentStory ? (
            <div className="w-full animate-in slide-in-from-bottom-3 fade-in duration-500">
              <div className="bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 p-[2px] rounded-lg">
                <div className="bg-background/95 rounded-lg p-3 flex items-start gap-3">
                  <div className="flex-shrink-0 mt-0.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  </div>
                  <div className="flex-1 text-center">
                    <p className="text-xs font-bold text-foreground mb-1">
                      {currentStory.name} just {currentStory.action}!
                    </p>
                    <div className="flex items-center justify-center gap-1">
                      <DollarSign className="w-3 h-3 text-emerald-400" />
                      <p className="text-sm font-black text-emerald-400">${currentStory.amount.toLocaleString()}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center gap-2">
              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-lg shadow-emerald-500/50" />
              <p className="text-xs font-bold text-emerald-400 uppercase tracking-wider">Live</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
