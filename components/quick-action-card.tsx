import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import type { LucideIcon } from "lucide-react"
import Link from "next/link"

interface QuickActionCardProps {
  title: string
  description: string
  icon: LucideIcon
  href: string
  buttonText: string
  glowColor?: "primary" | "secondary" | "accent"
}

export function QuickActionCard({ title, description, icon: Icon, href, buttonText, glowColor = "primary" }: QuickActionCardProps) {
  const glowClass = "glow-gold"
  const borderClass = "border-primary/40"
  const iconColorClass = "text-primary"
  const buttonClass = "bg-linear-to-r from-primary to-secondary text-primary-foreground hover:brightness-110"

  return (
    <Card className={`glass-strong border-2 ${borderClass} ${glowClass} hover:scale-105 transition-transform duration-300`}>
      <CardHeader className="space-y-4">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-linear-to-br from-primary/20 to-secondary/20 flex items-center justify-center border-2 border-primary/20">
            <Icon className={`w-7 h-7 ${iconColorClass}`} />
          </div>
          <CardTitle className="text-2xl font-extrabold text-white tracking-tight">{title}</CardTitle>
        </div>
        <CardDescription className="text-base text-secondary leading-relaxed">{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <Button asChild className={`w-full h-14 text-base font-extrabold rounded-2xl ${buttonClass} text-white shadow-lg transition-all duration-300`}>
          <Link href={href}>{buttonText}</Link>
        </Button>
      </CardContent>
    </Card>
  )
}
