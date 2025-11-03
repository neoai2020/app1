import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import type { LucideIcon } from "lucide-react"
import Link from "next/link"

interface QuickActionCardProps {
  title: string
  description: string
  icon: LucideIcon
  href: string
  buttonText: string
  glowColor?: "cyan" | "violet" | "jade"
}

export function QuickActionCard({
  title,
  description,
  icon: Icon,
  href,
  buttonText,
  glowColor = "cyan",
}: QuickActionCardProps) {
  const glowClass = glowColor === "cyan" ? "glow-cyan" : glowColor === "violet" ? "glow-violet" : "glow-jade"

  return (
    <Card className={`glass ${glowClass} border-border/50 h-full`}>
      <CardContent className="p-6 flex flex-col h-full">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center mb-4 glow-cyan">
          <Icon className="w-8 h-8 text-background" />
        </div>
        <h3 className="text-2xl font-bold text-foreground mb-2">{title}</h3>
        <p className="text-base text-muted-foreground mb-6 flex-grow leading-relaxed">{description}</p>
        <Button asChild className="w-full h-14 text-lg font-bold" size="lg">
          <Link href={href}>{buttonText}</Link>
        </Button>
      </CardContent>
    </Card>
  )
}
