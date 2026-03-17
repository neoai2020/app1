import { Card } from "@/components/ui/card"
import { TrendingUp, TrendingDown } from "lucide-react"

interface RevenueMiniCardProps {
  title: string
  value: string
  trend: string
  trendValue: string
  isUp?: boolean
  goal?: string
  progress?: number
}

export function RevenueMiniCard({ title, value, trend, trendValue, isUp, goal, progress }: RevenueMiniCardProps) {
  return (
    <Card className="glass-card p-6 bg-[#111111] border-white/5">
      <div className="flex flex-col gap-1 mb-4">
        <p className="text-sm font-medium text-zinc-500">{title}</p>
        <h3 className="text-2xl font-black text-white tracking-tight">{value}</h3>
      </div>
      
      {trend && (
        <div className="flex items-center gap-1.5 mt-auto">
          {isUp ? (
            <TrendingUp className="w-3.5 h-3.5 text-primary" />
          ) : (
            <TrendingDown className="w-3.5 h-3.5 text-red-500" />
          )}
          <span className={`text-xs font-bold ${isUp ? "text-primary" : "text-red-500"}`}>{trendValue}</span>
          <span className="text-xs text-zinc-600 font-medium">vs last month</span>
        </div>
      )}

      {goal && (
        <div className="mt-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-white">{progress}%</span>
            <span className="text-[10px] text-zinc-600 font-medium">Goal: {goal}</span>
          </div>
          <div className="h-1.5 bg-zinc-800/50 rounded-full overflow-hidden border border-white/3">
            <div 
              className="h-full bg-primary rounded-full shadow-[0_0_8px_rgba(179,255,0,0.3)] transition-all duration-1000" 
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      )}
    </Card>
  )
}
