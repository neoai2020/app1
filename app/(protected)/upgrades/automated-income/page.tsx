import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Rocket,
  ArrowLeft,
  Mail,
  BarChart3,
  Zap,
  Users,
  CheckCircle2,
  Play,
  Download,
  Settings,
  TrendingUp,
  Target,
} from "lucide-react"
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

  if (!hasAccess) {
    redirect("/upgrades")
  }

  const emailSequences = [
    {
      name: "Welcome & Warm-Up Series",
      emails: 7,
      description: "Introduce yourself and build trust with new subscribers over 7 days",
      avgOpen: "42%",
      avgClick: "18%",
    },
    {
      name: "Product Launch Sequence",
      emails: 5,
      description: "Build excitement and sell any product with this proven 5-email sequence",
      avgOpen: "38%",
      avgClick: "22%",
    },
    {
      name: "Re-Engagement Campaign",
      emails: 4,
      description: "Win back inactive subscribers and turn them into buyers again",
      avgOpen: "35%",
      avgClick: "15%",
    },
    {
      name: "Abandoned Cart Recovery",
      emails: 3,
      description: "Automatically recover lost sales from people who didn't complete checkout",
      avgOpen: "45%",
      avgClick: "28%",
    },
    {
      name: "Upsell & Cross-Sell Series",
      emails: 6,
      description: "Sell more to existing customers with strategic follow-up offers",
      avgOpen: "40%",
      avgClick: "20%",
    },
    {
      name: "Evergreen Promotion Sequence",
      emails: 10,
      description: "Automated sequence that promotes your offers on repeat forever",
      avgOpen: "36%",
      avgClick: "16%",
    },
  ]

  const automationTools = [
    {
      name: "Email Automation Builder",
      description: "Drag-and-drop builder to create automated email sequences without any coding",
      icon: Mail,
    },
    {
      name: "Social Media Auto-Poster",
      description: "Automatically post your affiliate links to Facebook, Twitter, and Instagram",
      icon: Zap,
    },
    {
      name: "Lead Magnet Delivery System",
      description: "Automatically send free downloads to new subscribers instantly",
      icon: Download,
    },
    {
      name: "Retargeting Pixel Manager",
      description: "Track visitors and show them ads automatically across the web",
      icon: Target,
    },
    {
      name: "Auto-Responder Setup Wizard",
      description: "Set up your entire email system in 10 minutes with our simple wizard",
      icon: Settings,
    },
    {
      name: "Traffic Rotation System",
      description: "Automatically rotate between multiple affiliate offers to maximize earnings",
      icon: TrendingUp,
    },
  ]

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-12">
      <Button asChild variant="ghost" className="text-emerald-400 hover:text-emerald-300">
        <Link href="/dashboard">
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Dashboard
        </Link>
      </Button>

      <div className="text-center space-y-6 bg-gradient-to-br from-emerald-500/10 to-green-500/10 rounded-2xl p-12 border border-emerald-500/20">
        <div className="w-24 h-24 rounded-full bg-gradient-to-br from-emerald-400 to-green-500 flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/50">
          <Rocket className="w-12 h-12 text-white animate-bounce" />
        </div>
        <div>
          <h1 className="text-5xl lg:text-6xl font-bold text-white mb-4">Welcome to Automated Income!</h1>
          <p className="text-2xl text-emerald-300 font-semibold mb-4">Your Passive Income Machine is Ready to Launch</p>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            This is it - the ultimate upgrade. Set up your automation once, and it works for you 24/7 while you sleep,
            travel, or spend time with family. Members using these systems are making $5,000-$15,000 per month on
            autopilot.
          </p>
        </div>
      </div>

      <Card className="bg-gradient-to-br from-emerald-900/30 to-green-900/30 border-emerald-500/30 shadow-xl">
        <CardHeader>
          <CardTitle className="text-3xl text-white flex items-center gap-3">
            <CheckCircle2 className="w-8 h-8 text-emerald-400" />
            Your Automation Setup Plan
          </CardTitle>
          <p className="text-gray-300 text-lg mt-2">
            Follow these 5 steps to build your passive income machine (Takes 2-3 hours total):
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-6">
            <div className="bg-emerald-500/10 rounded-xl p-8 border border-emerald-500/30">
              <div className="flex items-start gap-6">
                <div className="w-16 h-16 rounded-full bg-emerald-500 flex items-center justify-center flex-shrink-0 text-2xl font-bold text-white shadow-lg">
                  1
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-white mb-3">Connect Your Email Service</h3>
                  <p className="text-lg text-gray-300 leading-relaxed mb-4">
                    We'll show you how to connect a free email service (like MailerLite or Mailchimp) to your P55
                    account. This takes about 10 minutes and we have video instructions for every step.
                  </p>
                  <Button className="bg-emerald-500 hover:bg-emerald-600 text-white font-semibold" size="lg">
                    <Play className="w-5 h-5 mr-2" />
                    Watch Setup Video
                  </Button>
                </div>
              </div>
            </div>

            <div className="bg-green-500/10 rounded-xl p-8 border border-green-500/30">
              <div className="flex items-start gap-6">
                <div className="w-16 h-16 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0 text-2xl font-bold text-white shadow-lg">
                  2
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-white mb-3">Import Your Email Sequences</h3>
                  <p className="text-lg text-gray-300 leading-relaxed mb-4">
                    Choose one of the 6 proven email sequences below and import it with one click. These emails are
                    already written for you - just add your affiliate links and you're done.
                  </p>
                  <Button className="bg-green-500 hover:bg-green-600 text-white font-semibold" size="lg">
                    View Email Sequences
                  </Button>
                </div>
              </div>
            </div>

            <div className="bg-teal-500/10 rounded-xl p-8 border border-teal-500/30">
              <div className="flex items-start gap-6">
                <div className="w-16 h-16 rounded-full bg-teal-500 flex items-center justify-center flex-shrink-0 text-2xl font-bold text-white shadow-lg">
                  3
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-white mb-3">Set Up Your Lead Magnet</h3>
                  <p className="text-lg text-gray-300 leading-relaxed mb-4">
                    Create a simple free offer (like a PDF guide or checklist) to collect email addresses. We provide
                    50+ ready-made lead magnets you can use, or create your own in minutes.
                  </p>
                  <Button className="bg-teal-500 hover:bg-teal-600 text-white font-semibold" size="lg">
                    Browse Lead Magnets
                  </Button>
                </div>
              </div>
            </div>

            <div className="bg-cyan-500/10 rounded-xl p-8 border border-cyan-500/30">
              <div className="flex items-start gap-6">
                <div className="w-16 h-16 rounded-full bg-cyan-500 flex items-center justify-center flex-shrink-0 text-2xl font-bold text-white shadow-lg">
                  4
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-white mb-3">Turn On Traffic Automation</h3>
                  <p className="text-lg text-gray-300 leading-relaxed mb-4">
                    Use our social media auto-poster to automatically share your lead magnet on Facebook, Twitter, and
                    Instagram. Set it once and it posts for you every day.
                  </p>
                  <Button className="bg-cyan-500 hover:bg-cyan-600 text-white font-semibold" size="lg">
                    Setup Auto-Posting
                  </Button>
                </div>
              </div>
            </div>

            <div className="bg-emerald-500/10 rounded-xl p-8 border border-emerald-500/30">
              <div className="flex items-start gap-6">
                <div className="w-16 h-16 rounded-full bg-emerald-600 flex items-center justify-center flex-shrink-0 text-2xl font-bold text-white shadow-lg">
                  5
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-white mb-3">Monitor & Optimize</h3>
                  <p className="text-lg text-gray-300 leading-relaxed mb-4">
                    Check your analytics dashboard once a week to see your results. We'll show you exactly what numbers
                    to watch and how to improve them over time.
                  </p>
                  <Button className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold" size="lg">
                    View Analytics
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-emerald-500/20 rounded-xl p-6 border border-emerald-500/40 text-center">
            <p className="text-xl text-emerald-200 font-semibold">
              🚀 Once set up, your system runs 24/7 automatically - No daily work required!
            </p>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gray-900/50 border-emerald-500/20 shadow-xl">
        <CardHeader>
          <CardTitle className="text-3xl text-white flex items-center gap-3">
            <Mail className="w-8 h-8 text-emerald-400" />
            Done-For-You Email Sequences
          </CardTitle>
          <p className="text-gray-300 text-lg mt-2">
            6 complete email sequences - Just import, add your links, and activate
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {emailSequences.map((sequence, index) => (
              <Card
                key={index}
                className="bg-gradient-to-r from-gray-800/80 to-gray-900/80 border-emerald-500/20 hover:border-emerald-400/50 transition-all"
              >
                <CardContent className="p-8">
                  <div className="flex items-start gap-6">
                    <div className="w-20 h-20 rounded-xl bg-gradient-to-br from-emerald-500 to-green-500 flex items-center justify-center flex-shrink-0 shadow-lg">
                      <Mail className="w-10 h-10 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <span className="px-3 py-1 bg-emerald-500/20 text-emerald-300 text-sm font-bold rounded-full">
                          {sequence.emails} Emails
                        </span>
                        <span className="text-gray-400">{sequence.avgOpen} avg open rate</span>
                        <span className="text-gray-400">• {sequence.avgClick} avg click rate</span>
                      </div>
                      <h3 className="text-2xl font-bold text-white mb-3">{sequence.name}</h3>
                      <p className="text-lg text-gray-300 leading-relaxed mb-4">{sequence.description}</p>
                      <div className="flex gap-4">
                        <Button className="bg-emerald-500 hover:bg-emerald-600 text-white font-semibold px-8" size="lg">
                          Import Sequence
                        </Button>
                        <Button
                          variant="outline"
                          className="border-emerald-500 text-emerald-300 hover:bg-emerald-500/20 bg-transparent"
                          size="lg"
                        >
                          Preview Emails
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gray-900/50 border-emerald-500/20 shadow-xl">
        <CardHeader>
          <CardTitle className="text-3xl text-white flex items-center gap-3">
            <Zap className="w-8 h-8 text-emerald-400" />
            Automation Tools & Systems
          </CardTitle>
          <p className="text-gray-300 text-lg mt-2">Everything you need to automate your entire affiliate business</p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {automationTools.map((tool, index) => {
              const Icon = tool.icon
              return (
                <Card
                  key={index}
                  className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 border-emerald-500/20 hover:border-emerald-400/50 transition-all"
                >
                  <CardContent className="p-6 space-y-4">
                    <div className="w-16 h-16 rounded-xl bg-emerald-500/20 flex items-center justify-center">
                      <Icon className="w-8 h-8 text-emerald-400" />
                    </div>
                    <h3 className="text-xl font-bold text-white">{tool.name}</h3>
                    <p className="text-gray-300 leading-relaxed">{tool.description}</p>
                    <Button className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-semibold" size="lg">
                      Launch Tool
                    </Button>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gray-900/50 border-emerald-500/20 shadow-xl">
        <CardHeader>
          <CardTitle className="text-3xl text-white flex items-center gap-3">
            <BarChart3 className="w-8 h-8 text-emerald-400" />
            Your Advanced Analytics Dashboard
          </CardTitle>
          <p className="text-gray-300 text-lg mt-2">Track every metric that matters for your automated business</p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card className="bg-gradient-to-br from-emerald-500/20 to-green-500/20 border-emerald-500/30">
              <CardContent className="p-6 text-center">
                <p className="text-4xl font-bold text-emerald-400 mb-2">$12,847</p>
                <p className="text-gray-300 font-semibold">Total Revenue</p>
                <p className="text-sm text-gray-400 mt-1">Last 30 days</p>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-emerald-500/20 to-green-500/20 border-emerald-500/30">
              <CardContent className="p-6 text-center">
                <p className="text-4xl font-bold text-emerald-400 mb-2">2,341</p>
                <p className="text-gray-300 font-semibold">Email Subscribers</p>
                <p className="text-sm text-gray-400 mt-1">Growing daily</p>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-emerald-500/20 to-green-500/20 border-emerald-500/30">
              <CardContent className="p-6 text-center">
                <p className="text-4xl font-bold text-emerald-400 mb-2">8.4%</p>
                <p className="text-gray-300 font-semibold">Conversion Rate</p>
                <p className="text-sm text-gray-400 mt-1">Above average</p>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-emerald-500/20 to-green-500/20 border-emerald-500/30">
              <CardContent className="p-6 text-center">
                <p className="text-4xl font-bold text-emerald-400 mb-2">$247</p>
                <p className="text-gray-300 font-semibold">Avg Order Value</p>
                <p className="text-sm text-gray-400 mt-1">Per customer</p>
              </CardContent>
            </Card>
          </div>
          <Button className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-lg" size="lg">
            <BarChart3 className="w-5 h-5 mr-2" />
            Open Full Analytics Dashboard
          </Button>
        </CardContent>
      </Card>

      <Card className="bg-gray-900/50 border-emerald-500/20 shadow-xl">
        <CardHeader>
          <CardTitle className="text-3xl text-white flex items-center gap-3">
            <Users className="w-8 h-8 text-emerald-400" />
            Private Mastermind Community
          </CardTitle>
          <p className="text-gray-300 text-lg mt-2">Connect with other successful affiliates and get expert guidance</p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <Card className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 border-emerald-500/20">
              <CardContent className="p-8 text-center space-y-4">
                <div className="w-16 h-16 rounded-xl bg-emerald-500/20 flex items-center justify-center mx-auto">
                  <Users className="w-8 h-8 text-emerald-400" />
                </div>
                <h3 className="text-xl font-bold text-white">Weekly Live Calls</h3>
                <p className="text-gray-300 leading-relaxed">
                  Join our weekly Q&A calls with 7-figure affiliates. Ask questions and get real answers.
                </p>
                <Button
                  variant="outline"
                  className="w-full border-emerald-500 text-emerald-300 hover:bg-emerald-500/20 bg-transparent"
                  size="lg"
                >
                  Join Next Call
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 border-emerald-500/20">
              <CardContent className="p-8 text-center space-y-4">
                <div className="w-16 h-16 rounded-xl bg-emerald-500/20 flex items-center justify-center mx-auto">
                  <Download className="w-8 h-8 text-emerald-400" />
                </div>
                <h3 className="text-xl font-bold text-white">Case Study Library</h3>
                <p className="text-gray-300 leading-relaxed">
                  See exactly how other members built their automated income streams step-by-step.
                </p>
                <Button
                  variant="outline"
                  className="w-full border-emerald-500 text-emerald-300 hover:bg-emerald-500/20 bg-transparent"
                  size="lg"
                >
                  Browse Case Studies
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 border-emerald-500/20">
              <CardContent className="p-8 text-center space-y-4">
                <div className="w-16 h-16 rounded-xl bg-emerald-500/20 flex items-center justify-center mx-auto">
                  <Zap className="w-8 h-8 text-emerald-400" />
                </div>
                <h3 className="text-xl font-bold text-white">Hot Offers Alert</h3>
                <p className="text-gray-300 leading-relaxed">
                  Get notified when new high-converting affiliate offers become available.
                </p>
                <Button
                  variant="outline"
                  className="w-full border-emerald-500 text-emerald-300 hover:bg-emerald-500/20 bg-transparent"
                  size="lg"
                >
                  View Hot Offers
                </Button>
              </CardContent>
            </Card>
          </div>
          <div className="bg-emerald-500/10 rounded-xl p-6 border border-emerald-500/20 text-center">
            <p className="text-lg text-emerald-300 font-semibold">
              💎 Mastermind members report 3x higher earnings on average
            </p>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-emerald-500/10 to-green-500/10 border-emerald-500/30 shadow-xl">
        <CardContent className="p-8 text-center space-y-4">
          <h3 className="text-3xl font-bold text-white">We're With You Every Step of the Way</h3>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Building an automated income system is easier than you think, but if you ever get stuck, our team is here to
            help. Email support@p55account.com anytime and we'll get you back on track within 24 hours.
          </p>
          <Button className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-lg px-12" size="lg">
            Contact Support Team
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
