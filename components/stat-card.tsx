import { Card, CardContent } from "@/components/ui/card"
import type { LucideIcon } from "lucide-react"

interface StatCardProps {
  title: string
  value: string | number
  icon: LucideIcon
  trend?: string
    glowColor?: "primary" | "secondary" | "accent"
  }
  
  export function StatCard({ title, value, icon: Icon, trend, glowColor = "primary" }: StatCardProps) {
    const glowClass = glowColor === "primary" ? "glow-gold" : glowColor === "secondary" ? "glow-emerald" : "glow-gold"
    const iconColorClass = "text-primary"
    const iconBgClass = "bg-primary/15"
    const borderClass = "border-primary/30"

  return (
    <Card className={`glass ${glowClass} border-2 ${borderClass}`}>
      <CardContent className="p-7">
        <div className="flex items-start justify-between">
          <div className="space-y-3">
            <p className="text-sm text-secondary font-bold uppercase tracking-wider">{title}</p>
            <p className="text-5xl font-extrabold text-white tracking-tight">{value}</p>
            {trend && <p className="text-sm text-primary font-bold">{trend}</p>}
          </div>
          <div className={`w-16 h-16 rounded-2xl ${iconBgClass} flex items-center justify-center border-2 ${borderClass}`}>
            <Icon className={`w-8 h-8 ${iconColorClass}`} />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
