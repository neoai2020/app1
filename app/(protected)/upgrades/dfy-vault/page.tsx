import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Check, Crown, ArrowLeft, Download, FileText, Video, BookOpen } from "lucide-react"
import Link from "next/link"

export default async function DFYVaultPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) {
    redirect("/auth/login")
  }

  const { data: profile } = await supabase.from("users").select("*").eq("id", user.id).single()

  const hasAccess =
    profile?.upgrade_level === "dfy_vault" ||
    profile?.upgrade_level === "instant_income" ||
    profile?.upgrade_level === "automated_income"

  // If user has access, show the deliverables
  if (hasAccess) {
    const templates = [
      { id: 1, name: "Weight Loss Affiliate Page", category: "Health & Fitness", conversions: "8.2%" },
      { id: 2, name: "Make Money Online Review", category: "Business", conversions: "12.5%" },
      { id: 3, name: "Tech Product Comparison", category: "Technology", conversions: "9.8%" },
      { id: 4, name: "Dating App Review", category: "Relationships", conversions: "11.3%" },
      { id: 5, name: "Crypto Trading Guide", category: "Finance", conversions: "10.1%" },
      { id: 6, name: "Fitness Equipment Review", category: "Health & Fitness", conversions: "7.9%" },
      { id: 7, name: "Software Tool Comparison", category: "Technology", conversions: "13.2%" },
      { id: 8, name: "Travel Booking Review", category: "Travel", conversions: "6.5%" },
      { id: 9, name: "Online Course Review", category: "Education", conversions: "9.4%" },
      { id: 10, name: "Supplement Stack Guide", category: "Health & Fitness", conversions: "8.7%" },
    ]

    const trainings = [
      { title: "SEO Fundamentals for Affiliates", duration: "45 min", views: "12.4K" },
      { title: "Keyword Research Masterclass", duration: "38 min", views: "9.8K" },
      { title: "On-Page SEO Optimization", duration: "52 min", views: "11.2K" },
      { title: "Link Building Strategies", duration: "41 min", views: "8.5K" },
      { title: "Content Optimization Secrets", duration: "35 min", views: "10.1K" },
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
          <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center mx-auto glow-cyan">
            <Crown className="w-10 h-10 text-background" />
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold text-foreground">DFY Vault</h1>
          <p className="text-xl text-muted-foreground">Your Done-For-You Template Library</p>
        </div>

        <Card className="glass-strong border-border/50 glow-cyan">
          <CardHeader>
            <CardTitle className="text-2xl flex items-center gap-3">
              <FileText className="w-6 h-6 text-primary" />
              Pre-Written Page Templates
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {templates.map((template) => (
                <Card key={template.id} className="glass border-border/50 hover:border-primary/50 transition-colors">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-foreground mb-1">{template.name}</h3>
                        <p className="text-sm text-muted-foreground">{template.category}</p>
                      </div>
                      <span className="text-sm font-bold text-accent">{template.conversions}</span>
                    </div>
                    <Button className="w-full" size="sm">
                      <Download className="w-4 h-4 mr-2" />
                      Use Template
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
            <div className="mt-6 text-center">
              <Button variant="outline" size="lg">
                <Download className="w-5 h-5 mr-2" />
                Download All Templates (ZIP)
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-strong border-border/50">
          <CardHeader>
            <CardTitle className="text-2xl flex items-center gap-3">
              <Video className="w-6 h-6 text-primary" />
              SEO Training Videos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {trainings.map((training, index) => (
                <Card key={index} className="glass border-border/50 hover:border-primary/50 transition-colors">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center">
                          <Video className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                          <h3 className="text-lg font-bold text-foreground">{training.title}</h3>
                          <p className="text-sm text-muted-foreground">
                            {training.duration} • {training.views} views
                          </p>
                        </div>
                      </div>
                      <Button>Watch Now</Button>
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
              <BookOpen className="w-6 h-6 text-primary" />
              Bonus Resources
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="glass border-border/50">
                <CardContent className="p-6 text-center space-y-3">
                  <FileText className="w-10 h-10 text-primary mx-auto" />
                  <h3 className="text-lg font-bold text-foreground">Swipe File</h3>
                  <p className="text-sm text-muted-foreground">100+ proven headlines and CTAs</p>
                  <Button variant="outline" className="w-full bg-transparent">
                    Download
                  </Button>
                </CardContent>
              </Card>
              <Card className="glass border-border/50">
                <CardContent className="p-6 text-center space-y-3">
                  <BookOpen className="w-10 h-10 text-primary mx-auto" />
                  <h3 className="text-lg font-bold text-foreground">SEO Checklist</h3>
                  <p className="text-sm text-muted-foreground">Step-by-step optimization guide</p>
                  <Button variant="outline" className="w-full bg-transparent">
                    Download
                  </Button>
                </CardContent>
              </Card>
              <Card className="glass border-border/50">
                <CardContent className="p-6 text-center space-y-3">
                  <FileText className="w-10 h-10 text-primary mx-auto" />
                  <h3 className="text-lg font-bold text-foreground">Conversion Guide</h3>
                  <p className="text-sm text-muted-foreground">Boost your page conversions</p>
                  <Button variant="outline" className="w-full bg-transparent">
                    Download
                  </Button>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  // If no access, show sales page
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
