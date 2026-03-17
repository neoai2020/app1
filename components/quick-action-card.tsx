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

export function QuickActionCard({ title, description, icon: Icon, href, buttonText }: QuickActionCardProps) {
  const borderClass = "border-primary/20 hover:border-primary/50"
  const iconColorClass = "text-primary shadow-[0_0_10px_rgba(193,255,0,0.5)]"
  const buttonClass = "bg-primary text-[#0B0F12] font-black hover:brightness-110 shadow-[0_0_15px_rgba(193,255,0,0.3)] hover:shadow-[0_0_25px_rgba(193,255,0,0.5)]"

  return (
    <Card className={`glass-card ${borderClass} transition-all duration-300 group`}>
      <CardHeader className="space-y-4">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-zinc-800/50 flex items-center justify-center border border-zinc-700 group-hover:border-primary/30 transition-colors">
            <Icon className={`w-7 h-7 ${iconColorClass}`} />
          </div>
          <CardTitle className="text-2xl font-extrabold text-white tracking-tight">{title}</CardTitle>
        </div>
        <CardDescription className="text-base text-zinc-400 leading-relaxed font-medium">{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <Button asChild className={`w-full h-14 text-base font-extrabold rounded-2xl ${buttonClass} transition-all duration-300`}>
          <Link href={href}>{buttonText}</Link>
        </Button>
      </CardContent>
    </Card>
  )
}
