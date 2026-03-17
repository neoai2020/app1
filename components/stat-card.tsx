import { Card, CardContent } from "@/components/ui/card"
import type { LucideIcon } from "lucide-react"

interface StatCardProps {
  title: string
  value: string | number
  icon: LucideIcon
  trend?: string
    glowColor?: "primary" | "secondary" | "accent"
  }
  
  export function StatCard({ title, value, icon: Icon, trend }: StatCardProps) {
    const iconColorClass = "text-primary"
    const iconBgClass = "bg-primary/10"
    const borderClass = "border-zinc-800 group-hover:border-primary/20"

  return (
    <Card className={`glass-card ${borderClass} group transition-all duration-300`}>
      <CardContent className="p-7">
        <div className="flex items-start justify-between">
          <div className="space-y-3">
            <p className="text-sm text-zinc-400 font-bold uppercase tracking-wider">{title}</p>
            <p className="text-5xl font-extrabold text-white tracking-tight">{value}</p>
            {trend && <p className="text-sm text-primary font-black shadow-primary/20">{trend}</p>}
          </div>
          <div className={`w-16 h-16 rounded-2xl ${iconBgClass} flex items-center justify-center border border-primary/20`}>
            <Icon className={`w-8 h-8 ${iconColorClass} drop-shadow-[0_0_8px_rgba(193,255,0,0.5)]`} />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
