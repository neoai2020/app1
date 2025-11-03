import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Check, Crown, ArrowLeft } from "lucide-react"
import Link from "next/link"

export default async function DFYVaultPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) {
    redirect("/auth/login")
  }

  const features = [
    "50+ Pre-Written Page Templates",
    "Swipe File of Top Performers",
    "Advanced SEO Training Videos",
    "Priority Email Support",
    "Unlimited Page Generation",
    "Custom Branding Options",
    "Conversion Optimization Guide",
    "Monthly Template Updates",
  ]

  const testimonials = [
    {
      name: "Sarah M.",
      earnings: "$2,847",
      quote: "The templates saved me hours of work. I just customize and publish!",
    },
    {
      name: "Mike R.",
      earnings: "$4,120",
      quote: "Finally, professional pages without hiring a copywriter.",
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
        <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center mx-auto glow-cyan">
          <Crown className="w-12 h-12 text-background" />
        </div>
        <div>
          <h1 className="text-5xl lg:text-6xl font-bold text-foreground mb-4">DFY Vault</h1>
          <p className="text-2xl text-primary font-bold mb-2">Done-For-You Templates</p>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Get instant access to 50+ proven templates that have generated over $500K in commissions
          </p>
        </div>
        <div className="flex items-baseline justify-center gap-2">
          <span className="text-6xl font-bold text-primary">$47</span>
          <span className="text-xl text-muted-foreground">one-time</span>
        </div>
      </div>

      <Card className="glass-strong border-border/50 glow-cyan">
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

      <Card className="glass-strong border-primary/50 glow-cyan">
        <CardContent className="p-8 text-center space-y-6">
          <div>
            <h3 className="text-3xl font-bold text-foreground mb-3">Ready to Get Started?</h3>
            <p className="text-lg text-muted-foreground">
              Join 1,247 members who are using DFY templates to scale their affiliate business
            </p>
          </div>
          <Button className="h-16 text-xl font-bold px-12 glow-cyan" size="lg">
            Upgrade to DFY Vault - $47
          </Button>
          <p className="text-sm text-muted-foreground">30-day money-back guarantee</p>
        </CardContent>
      </Card>
    </div>
  )
}
