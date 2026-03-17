"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, Target, Award } from "lucide-react"

// Completely NEW social proof concept: Collective Progress Tracker
// Shows community milestones and goals - NOT individual earnings

interface MilestoneData {
  current: number
  goal: number
  label: string
}

function getDailyMilestones(): MilestoneData[] {
  const today = new Date().toDateString()
  const seed = today.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0)
  
  const seededRandom = (min: number, max: number, offset: number) => {
    const x = Math.sin(seed + offset) * 10000
    return Math.floor(min + (x - Math.floor(x)) * (max - min + 1))
  }

  return [
    {
      current: seededRandom(2340, 3890, 1),
      goal: 5000,
      label: "Comments Posted Today",
    },
    {
      current: seededRandom(567, 892, 2),
      goal: 1000,
      label: "Packs Created This Week",
    },
    {
      current: seededRandom(1240, 1890, 3),
      goal: 2500,
      label: "Active Members This Month",
    },
  ]
}

export function CommunityProgress() {
  const [milestones, setMilestones] = useState(getDailyMilestones())
  const [celebration, setCelebration] = useState<string | null>(null)

  useEffect(() => {
    // Increment progress every 8 seconds
    const interval = setInterval(() => {
      setMilestones((prev) =>
        prev.map((milestone) => {
          const increment = Math.floor(Math.random() * 3) + 1
          const newCurrent = Math.min(milestone.current + increment, milestone.goal)
          
          // Check if we just hit the goal
          if (newCurrent === milestone.goal && milestone.current < milestone.goal) {
            setCelebration(milestone.label)
            setTimeout(() => setCelebration(null), 5000)
          }
          
          return { ...milestone, current: newCurrent }
        })
      )
    }, 8000)

    return () => clearInterval(interval)
  }, [])

  return (
    <Card className="glass-strong border-2 border-primary/40 glow-gold overflow-hidden relative">
      <div className="absolute inset-0 bg-linear-to-br from-primary/5 via-secondary/5 to-primary/5" />

      <CardHeader className="relative z-10 pb-4 border-b-2 border-primary/30">
        <CardTitle className="text-2xl font-extrabold text-white flex items-center gap-3">
          <Target className="w-7 h-7 text-primary" />
          <span>Community Goals</span>
        </CardTitle>
        <p className="text-sm text-secondary mt-2 font-semibold">
          Help us reach today's milestones together
        </p>
      </CardHeader>

      <CardContent className="space-y-5 relative z-10 pt-6">
        {milestones.map((milestone, index) => {
          const percentage = Math.min((milestone.current / milestone.goal) * 100, 100)
          const isComplete = percentage >= 100

          return (
            <div key={index} className="space-y-2">
              <div className="flex items-center justify-between">
                <p className="text-sm font-bold text-white">{milestone.label}</p>
                <p className="text-xs font-extrabold text-primary">
                  {milestone.current.toLocaleString()} / {milestone.goal.toLocaleString()}
                </p>
              </div>
              <div className="relative w-full h-3 rounded-full bg-background border-2 border-primary/30 overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-1000 ${
                    isComplete
                      ? "bg-linear-to-r from-primary to-accent animate-pulse"
                      : "bg-linear-to-r from-primary to-secondary"
                  }`}
                  style={{ width: `${percentage}%` }}
                />
              </div>
              {isComplete && (
                <div className="flex items-center gap-2 text-primary animate-in fade-in slide-in-from-bottom-2">
                  <Award className="w-4 h-4" />
                  <p className="text-xs font-extrabold">Goal Reached! 🎉</p>
                </div>
              )}
            </div>
          )
        })}

        {celebration && (
          <div className="p-4 rounded-2xl bg-linear-to-r from-primary/20 to-secondary/20 border-2 border-primary/50 animate-in fade-in zoom-in duration-500">
            <div className="flex items-center gap-3 justify-center">
              <Award className="w-6 h-6 text-primary" />
              <p className="text-base font-extrabold text-white">
                🎉 Community hit: {celebration}!
              </p>
            </div>
          </div>
        )}

        <div className="pt-3 border-t-2 border-primary/20">
          <div className="flex items-center justify-center gap-2">
            <TrendingUp className="w-5 h-5 text-primary" />
            <p className="text-sm font-bold text-secondary">
              Together we're stronger - keep going!
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

