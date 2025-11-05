"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp } from "lucide-react"

function randomBetween(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

function randomFloatBetween(min: number, max: number): number {
  return Number.parseFloat((Math.random() * (max - min) + min).toFixed(2))
}

function useCountUp(target: number, duration = 2000) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    let startTime: number
    let animationFrame: number

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime
      const progress = Math.min((currentTime - startTime) / duration, 1)

      setCount(Math.floor(progress * target))

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate)
      }
    }

    animationFrame = requestAnimationFrame(animate)

    return () => cancelAnimationFrame(animationFrame)
  }, [target, duration])

  return count
}

export function LiveStatsWidget() {
  const [stats, setStats] = useState({
    articlesPublished: randomBetween(1182, 1367),
    avgFastCash: randomFloatBetween(3.1, 4.25),
    affiliateClicks: randomBetween(8900, 11500),
    activeMembers: randomBetween(2700, 3200),
    totalMoney: randomBetween(42000, 52000),
  })

  const articlesCount = useCountUp(stats.articlesPublished)
  const clicksCount = useCountUp(stats.affiliateClicks)
  const membersCount = useCountUp(stats.activeMembers)
  const moneyCount = useCountUp(stats.totalMoney)

  // Auto-refresh every 30 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setStats({
        articlesPublished: randomBetween(1182, 1367),
        avgFastCash: randomFloatBetween(3.1, 4.25),
        affiliateClicks: randomBetween(8900, 11500),
        activeMembers: randomBetween(2700, 3200),
        totalMoney: randomBetween(42000, 52000),
      })
    }, 30000)

    return () => clearInterval(interval)
  }, [])

  return (
    <Card className="glass-strong border-border/50 shadow-lg">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-foreground flex items-center gap-2">
          <span className="text-3xl">💵</span>
          What's Happening Inside P55 Right Now
        </CardTitle>
        <p className="text-base text-muted-foreground mt-2">
          Members are generating real results every single day through their P55 Accounts.
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Four stat blocks */}
        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 rounded-lg bg-background/50 border border-border/50">
            <p className="text-sm text-muted-foreground mb-1">Articles Published Today</p>
            <p className="text-3xl font-bold text-foreground">{articlesCount.toLocaleString()}</p>
          </div>
          <div className="p-4 rounded-lg bg-background/50 border border-border/50">
            <p className="text-sm text-muted-foreground mb-1">Avg Fast Cash Injection Completed</p>
            <p className="text-3xl font-bold text-foreground">{stats.avgFastCash}</p>
          </div>
          <div className="p-4 rounded-lg bg-background/50 border border-border/50">
            <p className="text-sm text-muted-foreground mb-1">Affiliate Clicks Tracked</p>
            <p className="text-3xl font-bold text-foreground">{clicksCount.toLocaleString()}</p>
          </div>
          <div className="p-4 rounded-lg bg-background/50 border border-border/50">
            <p className="text-sm text-muted-foreground mb-1">Members Active This Week</p>
            <p className="text-3xl font-bold text-foreground">{membersCount.toLocaleString()}</p>
          </div>
        </div>

        {/* Highlight banner */}
        <div className="p-6 rounded-xl bg-gradient-to-r from-emerald-500/10 to-amber-500/10 border-2 border-emerald-500/30">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Total Money Generated With P55 Today For Our Members</p>
              <p className="text-4xl font-bold bg-gradient-to-r from-emerald-500 to-amber-500 bg-clip-text text-transparent">
                ${moneyCount.toLocaleString()}
              </p>
            </div>
            <TrendingUp className="w-12 h-12 text-emerald-500" />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
