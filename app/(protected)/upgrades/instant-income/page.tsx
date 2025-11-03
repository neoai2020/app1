import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Check, Zap, ArrowLeft } from "lucide-react"
import Link from "next/link"

export default async function InstantIncomePage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) {
    redirect("/auth/login")
  }

  const features = [
    "Everything in DFY Vault",
    "Paid Traffic Training (FB, Google, TikTok)",
    "FB Ads Masterclass ($297 value)",
    "Landing Page Builder with 20+ Templates",
    "Split Testing Tools & Analytics",
    "1-on-1 Strategy Call ($500 value)",
    "Traffic Scaling Blueprint",
    "Ad Copy Swipe File",
  ]

  const testimonials = [
    {
      name: "James K.",
      earnings: "$8,340",
      quote: "The paid traffic training helped me scale from $100/day to $500/day in 2 weeks!",
    },
    {
      name: "Lisa T.",
      earnings: "$12,500",
      quote: "The strategy call alone was worth 10x the price. Game changer!",
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
        <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-secondary to-primary flex items-center justify-center mx-auto glow-violet">
          <Zap className="w-12 h-12 text-background" />
        </div>
        <div>
          <h1 className="text-5xl lg:text-6xl font-bold text-foreground mb-4">Instant Income</h1>
          <p className="text-2xl text-secondary font-bold mb-2">Fast-Track Your Earnings</p>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Master paid traffic and scale to $1000/day with proven strategies from 7-figure affiliates
          </p>
        </div>
        <div className="flex items-baseline justify-center gap-2">
          <span className="text-6xl font-bold text-secondary">$97</span>
          <span className="text-xl text-muted-foreground">one-time</span>
        </div>
      </div>

      <Card className="glass-strong border-border/50 glow-violet">
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

      <Card className="glass-strong border-secondary/50 glow-violet">
        <CardContent className="p-8 text-center space-y-6">
          <div>
            <h3 className="text-3xl font-bold text-foreground mb-3">Ready to Scale Fast?</h3>
            <p className="text-lg text-muted-foreground">
              Join 847 members who are using paid traffic to generate $1000+ per day
            </p>
          </div>
          <Button className="h-16 text-xl font-bold px-12 glow-violet bg-secondary hover:bg-secondary/90" size="lg">
            Upgrade to Instant Income - $97
          </Button>
          <p className="text-sm text-muted-foreground">30-day money-back guarantee</p>
        </CardContent>
      </Card>
    </div>
  )
}
