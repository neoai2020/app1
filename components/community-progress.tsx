"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, Target, Award } from "lucide-react"

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
    { current: seededRandom(2340, 3890, 1), goal: 5000, label: "Comments Posted Today" },
    { current: seededRandom(567, 892, 2), goal: 1000, label: "Packs Created Today" },
    { current: seededRandom(1240, 1890, 3), goal: 2500, label: "Members Online" },
  ]
}

export function CommunityProgress() {
  const [milestones, setMilestones] = useState(getDailyMilestones())

  useEffect(() => {
    const interval = setInterval(() => {
      setMilestones((prev) =>
        prev.map((milestone) => {
          const increment = Math.floor(Math.random() * 3) + 1
          return { ...milestone, current: Math.min(milestone.current + increment, milestone.goal) }
        })
      )
    }, 8000)
    return () => clearInterval(interval)
  }, [])

  return (
    <Card className="glass-card border-white/5 bg-[#111111] overflow-hidden relative group">
      <CardHeader className="relative z-10 p-8 pb-6 border-b border-white/5">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center border border-primary/20">
            <Target className="w-6 h-6 text-primary" />
          </div>
          <div>
            <CardTitle className="text-lg font-black text-white uppercase tracking-wider">
              Community Goals
            </CardTitle>
            <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-tight mt-1">
              Collective progress today
            </p>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-6 relative z-10 p-8">
        {milestones.map((milestone, index) => {
          const percentage = Math.min((milestone.current / milestone.goal) * 100, 100)
          return (
            <div key={index} className="space-y-3">
              <div className="flex items-center justify-between">
                <p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">{milestone.label}</p>
                <p className="text-[10px] font-black text-primary">
                  {milestone.current} / {milestone.goal}
                </p>
              </div>
              <div className="h-2 bg-white/5 rounded-full overflow-hidden border border-white/2">
                <div
                  className="h-full bg-primary rounded-full transition-all duration-1000 shadow-[0_0_10px_rgba(179,255,0,0.5)]"
                  style={{ width: `${percentage}%` }}
                />
              </div>
            </div>
          )
        })}

        <div className="pt-4 border-t border-white/5 flex items-center justify-center gap-2">
          <TrendingUp className="w-4 h-4 text-primary" />
          <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Growth target active</p>
        </div>
      </CardContent>
    </Card>
  )
}
