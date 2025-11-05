import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Check, Rocket, ArrowLeft, Mail, BarChart3, Zap, Users, FileText } from "lucide-react"
import Link from "next/link"

export default async function AutomatedIncomePage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) {
    redirect("/auth/login")
  }

  const { data: profile } = await supabase.from("users").select("*").eq("id", user.id).single()

  const hasAccess = profile?.upgrade_level === "automated_income"

  // If user has access, show the deliverables
  if (hasAccess) {
    const emailSequences = [
      { name: "Welcome Series (7 emails)", opens: "42%", clicks: "18%" },
      { name: "Product Launch Sequence (5 emails)", opens: "38%", clicks: "22%" },
      { name: "Re-engagement Campaign (4 emails)", opens: "35%", clicks: "15%" },
      { name: "Abandoned Cart Series (3 emails)", opens: "45%", clicks: "28%" },
      { name: "Upsell Sequence (6 emails)", opens: "40%", clicks: "20%" },
    ]

    const automationTools = [
      { name: "Email Automation Builder", description: "Drag-and-drop email sequence creator" },
      { name: "Traffic Automation System", description: "Auto-post to social media platforms" },
      { name: "Lead Magnet Delivery", description: "Automatic lead magnet fulfillment" },
      { name: "Retargeting Pixel Manager", description: "Track and retarget visitors automatically" },
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
          <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-accent to-primary flex items-center justify-center mx-auto glow-jade">
            <Rocket className="w-10 h-10 text-background" />
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold text-foreground">Automated Income</h1>
          <p className="text-xl text-muted-foreground">Build Your Passive Income Machine</p>
        </div>

        <Card className="glass-strong border-border/50 glow-jade">
          <CardHeader>
            <CardTitle className="text-2xl flex items-center gap-3">
              <Mail className="w-6 h-6 text-accent" />
              Email Automation Sequences
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {emailSequences.map((sequence, index) => (
                <Card key={index} className="glass border-border/50 hover:border-accent/50 transition-colors">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-lg bg-accent/20 flex items-center justify-center">
                          <Mail className="w-6 h-6 text-accent" />
                        </div>
                        <div>
                          <h3 className="text-lg font-bold text-foreground">{sequence.name}</h3>
                          <p className="text-sm text-muted-foreground">
                            {sequence.opens} open rate • {sequence.clicks} click rate
                          </p>
                        </div>
                      </div>
                      <Button className="bg-accent hover:bg-accent/90 text-background">Import Sequence</Button>
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
              <Zap className="w-6 h-6 text-accent" />
              Automation Tools
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {automationTools.map((tool, index) => (
                <Card key={index} className="glass border-border/50 hover:border-accent/50 transition-colors">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-bold text-foreground mb-2">{tool.name}</h3>
                    <p className="text-sm text-muted-foreground mb-4">{tool.description}</p>
                    <Button className="w-full" size="sm">
                      Launch Tool
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
              <BarChart3 className="w-6 h-6 text-accent" />
              Advanced Analytics Dashboard
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <Card className="glass border-border/50">
                <CardContent className="p-6 text-center">
                  <p className="text-3xl font-bold text-accent mb-1">$12,847</p>
                  <p className="text-sm text-muted-foreground">Total Revenue</p>
                </CardContent>
              </Card>
              <Card className="glass border-border/50">
                <CardContent className="p-6 text-center">
                  <p className="text-3xl font-bold text-accent mb-1">2,341</p>
                  <p className="text-sm text-muted-foreground">Email Subscribers</p>
                </CardContent>
              </Card>
              <Card className="glass border-border/50">
                <CardContent className="p-6 text-center">
                  <p className="text-3xl font-bold text-accent mb-1">8.4%</p>
                  <p className="text-sm text-muted-foreground">Conversion Rate</p>
                </CardContent>
              </Card>
              <Card className="glass border-border/50">
                <CardContent className="p-6 text-center">
                  <p className="text-3xl font-bold text-accent mb-1">$247</p>
                  <p className="text-sm text-muted-foreground">Avg. Order Value</p>
                </CardContent>
              </Card>
            </div>
            <Button className="w-full" size="lg">
              View Full Analytics Dashboard
            </Button>
          </CardContent>
        </Card>

        <Card className="glass-strong border-border/50">
          <CardHeader>
            <CardTitle className="text-2xl flex items-center gap-3">
              <Users className="w-6 h-6 text-accent" />
              Private Mastermind Access
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p className="text-lg text-muted-foreground">
                Join our exclusive community of top-earning affiliates. Get weekly coaching calls, networking
                opportunities, and insider strategies.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="glass border-border/50">
                  <CardContent className="p-6 text-center space-y-3">
                    <Users className="w-10 h-10 text-accent mx-auto" />
                    <h3 className="text-lg font-bold text-foreground">Weekly Calls</h3>
                    <p className="text-sm text-muted-foreground">Live Q&A with experts</p>
                    <Button variant="outline" className="w-full bg-transparent">
                      Join Next Call
                    </Button>
                  </CardContent>
                </Card>
                <Card className="glass border-border/50">
                  <CardContent className="p-6 text-center space-y-3">
                    <FileText className="w-10 h-10 text-accent mx-auto" />
                    <h3 className="text-lg font-bold text-foreground">Case Studies</h3>
                    <p className="text-sm text-muted-foreground">Real success breakdowns</p>
                    <Button variant="outline" className="w-full bg-transparent">
                      View Library
                    </Button>
                  </CardContent>
                </Card>
                <Card className="glass border-border/50">
                  <CardContent className="p-6 text-center space-y-3">
                    <Zap className="w-10 h-10 text-accent mx-auto" />
                    <h3 className="text-lg font-bold text-foreground">Hot Offers</h3>
                    <p className="text-sm text-muted-foreground">Exclusive affiliate deals</p>
                    <Button variant="outline" className="w-full bg-transparent">
                      Browse Offers
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  // If no access, show sales page
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
