import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Check, Rocket, ArrowLeft } from "lucide-react"
import Link from "next/link"

export default async function AutomatedIncomePage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) {
    redirect("/auth/login")
  }

  const features = [
    "Everything in Instant Income",
    "Email Automation System (30+ sequences)",
    "Auto-Responder Templates",
    "Traffic Automation Tools",
    "Advanced Analytics Dashboard",
    "Lifetime Updates & Support",
    "Private Mastermind Access",
    "Done-For-You Funnel Setup",
  ]

  const testimonials = [
    {
      name: "David P.",
      earnings: "$47,200",
      quote: "Set it up once, now it runs on autopilot. Making $1500/day consistently!",
    },
    {
      name: "Rachel S.",
      earnings: "$31,800",
      quote: "The automation changed everything. I work 2 hours a week now.",
    },
  ]

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      <Button asChild variant="ghost" className="text-primary hover:text-primary/80">
        <Link href="/upgrades">
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Upgrades
        </Link>
      </Button>

      <div className="text-center space-y-6">
        <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-accent to-primary flex items-center justify-center mx-auto glow-jade">
          <Rocket className="w-12 h-12 text-background" />
        </div>
        <div>
          <h1 className="text-5xl lg:text-6xl font-bold text-foreground mb-4">Automated Income</h1>
          <p className="text-2xl text-accent font-bold mb-2">Set It and Forget It</p>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Build a fully automated affiliate business that generates passive income 24/7
          </p>
        </div>
        <div className="flex items-baseline justify-center gap-2">
          <span className="text-6xl font-bold text-accent">$197</span>
          <span className="text-xl text-muted-foreground">one-time</span>
        </div>
      </div>

      <Card className="glass-strong border-border/50 glow-jade">
        <CardContent className="p-8 space-y-6">
          <h2 className="text-3xl font-bold text-foreground text-center mb-6">What You Get</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {features.map((feature, index) => (
              <div key={index} className="flex items-start gap-3">
                <Check className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
                <p className="text-lg text-foreground leading-relaxed">{feature}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="space-y-6">
        <h2 className="text-3xl font-bold text-foreground text-center">Success Stories</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="glass border-border/50">
              <CardContent className="p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <p className="text-xl font-bold text-foreground">{testimonial.name}</p>
                  <span className="text-lg font-bold text-accent">{testimonial.earnings}</span>
                </div>
                <p className="text-base text-muted-foreground leading-relaxed">"{testimonial.quote}"</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <Card className="glass-strong border-accent/50 glow-jade">
        <CardContent className="p-8 text-center space-y-6">
          <div>
            <h3 className="text-3xl font-bold text-foreground mb-3">Ready for True Passive Income?</h3>
            <p className="text-lg text-muted-foreground">
              Join 423 members who have automated their way to $5000+ per month
            </p>
          </div>
          <Button
            className="h-16 text-xl font-bold px-12 glow-jade bg-accent hover:bg-accent/90 text-background"
            size="lg"
          >
            Upgrade to Automated Income - $197
          </Button>
          <p className="text-sm text-muted-foreground">30-day money-back guarantee</p>
        </CardContent>
      </Card>
    </div>
  )
}
