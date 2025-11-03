import { Card, CardContent } from "@/components/ui/card"
import type { LucideIcon } from "lucide-react"

interface StatCardProps {
  title: string
  value: string | number
  icon: LucideIcon
  trend?: string
  glowColor?: "cyan" | "violet" | "jade"
}

export function StatCard({ title, value, icon: Icon, trend, glowColor = "cyan" }: StatCardProps) {
  const glowClass = glowColor === "cyan" ? "glow-cyan" : glowColor === "violet" ? "glow-violet" : "glow-jade"

  return (
    <Card className={`glass ${glowClass} border-border/50`}>
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <p className="text-base text-muted-foreground font-medium">{title}</p>
            <p className="text-4xl font-bold text-foreground">{value}</p>
            {trend && <p className="text-sm text-accent font-semibold">{trend}</p>}
          </div>
          <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center">
            <Icon className="w-7 h-7 text-primary" />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
