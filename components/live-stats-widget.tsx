"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Activity, Clock } from "lucide-react"

// Completely different social proof - Activity Feed style
const ACTIVITY_TEMPLATES = [
  { user: "Alex P.", action: "generated a new comment pack", time: "2m ago", color: "text-primary" },
  { user: "Jordan K.", action: "posted 8 comments on trending Shorts", time: "5m ago", color: "text-secondary" },
  { user: "Sam R.", action: "got 12 replies on their comments", time: "7m ago", color: "text-accent" },
  { user: "Casey M.", action: "saved 3 packs this morning", time: "11m ago", color: "text-primary" },
  { user: "Morgan T.", action: "launched the AI Content Scout", time: "15m ago", color: "text-secondary" },
  { user: "Riley B.", action: "got featured on a trending Short", time: "18m ago", color: "text-accent" },
  { user: "Drew S.", action: "completed Training Academy", time: "22m ago", color: "text-primary" },
  { user: "Avery L.", action: "copied 25 high-quality comments", time: "28m ago", color: "text-secondary" },
]

function generateTimeAgo(minutes: number) {
  if (minutes < 60) return `${minutes}m ago`
  if (minutes < 1440) return `${Math.floor(minutes / 60)}h ago`
  return `${Math.floor(minutes / 1440)}d ago`
}

export function LiveStatsWidget() {
  const [activities, setActivities] = useState<Array<{ user: string; action: string; time: string; color: string; id: number }>>([])
  const [nextId, setNextId] = useState(0)

  useEffect(() => {
    // Initialize with 5 activities
    const initial = ACTIVITY_TEMPLATES.slice(0, 5).map((activity, index) => ({
      ...activity,
      id: index,
    }))
    setActivities(initial)
    setNextId(5)

    // Add new activity every 8-15 seconds
    const interval = setInterval(() => {
      const randomActivity = ACTIVITY_TEMPLATES[Math.floor(Math.random() * ACTIVITY_TEMPLATES.length)]
      const newMinutes = Math.floor(Math.random() * 5) + 1
      
      setActivities((prev) => {
        const newActivity = {
          ...randomActivity,
          time: generateTimeAgo(newMinutes),
          id: nextId,
        }
        setNextId((id) => id + 1)
        
        // Keep only last 5 activities
        const updated = [newActivity, ...prev].slice(0, 5)
        return updated
      })
    }, Math.random() * 7000 + 8000) // 8-15 seconds

    // Update times every minute
    const timeInterval = setInterval(() => {
      setActivities((prev) =>
        prev.map((activity) => {
          const currentMinutes = parseInt(activity.time.match(/\d+/)?.[0] || "1")
          return {
            ...activity,
            time: generateTimeAgo(currentMinutes + 1),
          }
        })
      )
    }, 60000)

    return () => {
      clearInterval(interval)
      clearInterval(timeInterval)
    }
  }, [nextId])

  return (
    <Card className="glass-strong border-2 border-secondary/40 glow-emerald overflow-hidden relative">
      <div className="absolute inset-0 bg-linear-to-br from-primary/5 via-secondary/5 to-accent/5" />

      <CardHeader className="relative z-10 pb-4 border-b-2 border-secondary/30">
        <CardTitle className="text-2xl font-extrabold text-white flex items-center gap-3">
          <Activity className="w-7 h-7 text-secondary" />
          <span>Live Activity Feed</span>
        </CardTitle>
        <p className="text-sm text-secondary mt-2 font-semibold flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-primary animate-pulse shadow-lg shadow-primary/50" />
          Real-time updates from Robinhood members
        </p>
      </CardHeader>

      <CardContent className="space-y-0 relative z-10 p-0">
        <div className="divide-y-2 divide-primary/10">
          {activities.map((activity, index) => (
            <div
              key={activity.id}
              className={`p-4 transition-all duration-500 hover:bg-primary/5 ${
                index === 0 ? "bg-primary/10 animate-in slide-in-from-top-2 fade-in" : ""
              }`}
            >
              <div className="flex items-start gap-3">
                <div className={`w-10 h-10 rounded-xl bg-linear-to-br from-primary to-secondary flex items-center justify-center shrink-0 text-white font-bold text-sm shadow-lg`}>
                  {activity.user.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-white">
                    <span className={`font-extrabold ${activity.color}`}>{activity.user}</span>{" "}
                    <span className="text-secondary">{activity.action}</span>
                  </p>
                  <div className="flex items-center gap-1.5 mt-1">
                    <Clock className="w-3 h-3 text-primary" />
                    <p className="text-xs text-primary font-semibold">{activity.time}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="p-4 bg-linear-to-r from-primary/20 to-secondary/20 border-t-2 border-primary/30">
          <p className="text-xs text-center text-secondary font-semibold">
            ✨ Join {Math.floor(Math.random() * 200 + 800)} active members taking action right now
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
