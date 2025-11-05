import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Check, Zap, ArrowLeft, Video, FileText, Target, TrendingUp } from "lucide-react"
import Link from "next/link"

export default async function InstantIncomePage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) {
    redirect("/auth/login")
  }

  const { data: profile } = await supabase.from("users").select("*").eq("id", user.id).single()

  const hasAccess = profile?.upgrade_level === "instant_income" || profile?.upgrade_level === "automated_income"

  // If user has access, show the deliverables
  if (hasAccess) {
    const trafficTrainings = [
      { title: "Facebook Ads Masterclass", duration: "2h 15min", modules: 12 },
      { title: "Google Ads for Affiliates", duration: "1h 45min", modules: 8 },
      { title: "TikTok Ads Strategy", duration: "1h 30min", modules: 7 },
      { title: "Instagram Ads Blueprint", duration: "1h 20min", modules: 6 },
      { title: "YouTube Ads Mastery", duration: "1h 50min", modules: 9 },
    ]

    const landingPages = [
      { name: "High-Converting VSL Template", conversions: "15.2%" },
      { name: "Product Review Landing Page", conversions: "12.8%" },
      { name: "Lead Magnet Opt-in Page", conversions: "28.5%" },
      { name: "Webinar Registration Page", conversions: "22.3%" },
      { name: "Product Comparison Page", conversions: "14.7%" },
    ]

    return (
      <div className="space-y-8 max-w-7xl mx-auto">
        <Button asChild variant="ghost" className="text-primary hover:text-primary/80">
          <Link href="/dashboard">
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Dashboard
          </Link>
        </Button>

        <div className="text-center space-y-4">
          <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-secondary to-primary flex items-center justify-center mx-auto glow-violet">
            <Zap className="w-10 h-10 text-background" />
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold text-foreground">Instant Income</h1>
          <p className="text-xl text-muted-foreground">Fast-Track Your Earnings with Paid Traffic</p>
        </div>

        <Card className="glass-strong border-border/50 glow-violet">
          <CardHeader>
            <CardTitle className="text-2xl flex items-center gap-3">
              <Video className="w-6 h-6 text-secondary" />
              Paid Traffic Training
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {trafficTrainings.map((training, index) => (
                <Card key={index} className="glass border-border/50 hover:border-secondary/50 transition-colors">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-lg bg-secondary/20 flex items-center justify-center">
                          <Video className="w-6 h-6 text-secondary" />
                        </div>
                        <div>
                          <h3 className="text-lg font-bold text-foreground">{training.title}</h3>
                          <p className="text-sm text-muted-foreground">
                            {training.duration} • {training.modules} modules
                          </p>
                        </div>
                      </div>
                      <Button className="bg-secondary hover:bg-secondary/90">Start Course</Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="glass-strong border-border/50">
          <CardHeader>
            <CardTitle className="text-2xl flex items-center gap-3">
              <Target className="w-6 h-6 text-secondary" />
              Landing Page Templates
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {landingPages.map((page, index) => (
                <Card key={index} className="glass border-border/50 hover:border-secondary/50 transition-colors">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-foreground mb-1">{page.name}</h3>
                        <p className="text-sm text-muted-foreground">Avg. Conversion Rate</p>
                      </div>
                      <span className="text-lg font-bold text-accent">{page.conversions}</span>
                    </div>
                    <Button className="w-full" size="sm">
                      Use Template
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="glass-strong border-border/50">
          <CardHeader>
            <CardTitle className="text-2xl flex items-center gap-3">
              <TrendingUp className="w-6 h-6 text-secondary" />
              Split Testing & Analytics
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="glass border-border/50">
                <CardContent className="p-6 text-center space-y-3">
                  <Target className="w-10 h-10 text-secondary mx-auto" />
                  <h3 className="text-lg font-bold text-foreground">A/B Testing Tool</h3>
                  <p className="text-sm text-muted-foreground">Test headlines, CTAs, and layouts</p>
                  <Button variant="outline" className="w-full bg-transparent">
                    Launch Tool
                  </Button>
                </CardContent>
              </Card>
              <Card className="glass border-border/50">
                <CardContent className="p-6 text-center space-y-3">
                  <TrendingUp className="w-10 h-10 text-secondary mx-auto" />
                  <h3 className="text-lg font-bold text-foreground">Analytics Dashboard</h3>
                  <p className="text-sm text-muted-foreground">Track clicks, conversions, ROI</p>
                  <Button variant="outline" className="w-full bg-transparent">
                    View Dashboard
                  </Button>
                </CardContent>
              </Card>
              <Card className="glass border-border/50">
                <CardContent className="p-6 text-center space-y-3">
                  <FileText className="w-10 h-10 text-secondary mx-auto" />
                  <h3 className="text-lg font-bold text-foreground">Ad Copy Swipe File</h3>
                  <p className="text-sm text-muted-foreground">200+ proven ad templates</p>
                  <Button variant="outline" className="w-full bg-transparent">
                    Download
                  </Button>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-strong border-secondary/50 glow-violet">
          <CardContent className="p-8 text-center space-y-4">
            <h3 className="text-2xl font-bold text-foreground">Book Your 1-on-1 Strategy Call</h3>
            <p className="text-lg text-muted-foreground">
              Get personalized guidance from a 7-figure affiliate marketer
            </p>
            <Button className="h-14 text-lg font-bold px-12 bg-secondary hover:bg-secondary/90" size="lg">
              Schedule Call ($500 Value - FREE)
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  // If no access, show sales page
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
