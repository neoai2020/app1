import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Zap, ArrowLeft, Video, Target, TrendingUp, CheckCircle2, Play, Download, Calendar } from "lucide-react"
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

  console.log("[v0] Instant Income - User upgrade level:", profile?.upgrade_level)

  const hasAccess = profile?.upgrade_level === "instant_income" || profile?.upgrade_level === "automated_income"

  if (!hasAccess) {
    redirect("/upgrades")
  }

  const trafficCourses = [
    {
      title: "Facebook Ads for Complete Beginners",
      description: "Learn how to create your first Facebook ad campaign step-by-step",
      duration: "2 hours 15 minutes",
      lessons: 12,
      level: "Beginner",
    },
    {
      title: "Google Ads Made Simple",
      description: "Get traffic from Google search with easy-to-follow instructions",
      duration: "1 hour 45 minutes",
      lessons: 8,
      level: "Beginner",
    },
    {
      title: "TikTok Ads for Affiliates",
      description: "Tap into TikTok's massive audience with viral ad strategies",
      duration: "1 hour 30 minutes",
      lessons: 7,
      level: "Intermediate",
    },
    {
      title: "Instagram Ads Blueprint",
      description: "Turn Instagram users into buyers with proven ad templates",
      duration: "1 hour 20 minutes",
      lessons: 6,
      level: "Beginner",
    },
    {
      title: "YouTube Ads Masterclass",
      description: "Get cheap clicks from YouTube with video ads that convert",
      duration: "1 hour 50 minutes",
      lessons: 9,
      level: "Intermediate",
    },
    {
      title: "Pinterest Ads Strategy",
      description: "Reach buyers on Pinterest with high-converting pin ads",
      duration: "1 hour 10 minutes",
      lessons: 5,
      level: "Beginner",
    },
  ]

  const landingPages = [
    { name: "Video Sales Letter Template", type: "High-Converting VSL", uses: "Best for expensive products" },
    { name: "Product Review Page", type: "Detailed Review", uses: "Perfect for Amazon affiliates" },
    { name: "Lead Magnet Opt-in", type: "Email Capture", uses: "Build your email list fast" },
    { name: "Webinar Registration", type: "Event Sign-up", uses: "Promote webinars & courses" },
    { name: "Product Comparison", type: "Side-by-Side", uses: "Compare 2-3 products" },
    { name: "Quiz Funnel", type: "Interactive Quiz", uses: "Engage visitors & qualify leads" },
    { name: "Discount/Coupon Page", type: "Special Offer", uses: "Promote limited-time deals" },
    { name: "Case Study Page", type: "Success Story", uses: "Show real results" },
  ]

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-12">
      <Button asChild variant="ghost" className="text-violet-400 hover:text-violet-300">
        <Link href="/dashboard">
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Dashboard
        </Link>
      </Button>

      <div className="text-center space-y-6 bg-gradient-to-br from-violet-500/10 to-purple-500/10 rounded-2xl p-12 border border-violet-500/20">
        <div className="w-24 h-24 rounded-full bg-gradient-to-br from-violet-400 to-purple-500 flex items-center justify-center mx-auto shadow-lg shadow-violet-500/50 animate-pulse">
          <Zap className="w-12 h-12 text-white" />
        </div>
        <div>
          <h1 className="text-5xl lg:text-6xl font-bold text-white mb-4">Welcome to Instant Income!</h1>
          <p className="text-2xl text-violet-300 font-semibold mb-4">Your Fast-Track to $1,000+ Per Day Starts Here</p>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            You've unlocked the secret weapon of top affiliates: PAID TRAFFIC. While others wait months for free
            traffic, you'll start getting visitors TODAY. Everything you need to scale fast is right here.
          </p>
        </div>
      </div>

      <Card className="bg-gradient-to-br from-violet-900/30 to-purple-900/30 border-violet-500/30 shadow-xl">
        <CardHeader>
          <CardTitle className="text-3xl text-white flex items-center gap-3">
            <CheckCircle2 className="w-8 h-8 text-violet-400" />
            Your Fast-Track Action Plan
          </CardTitle>
          <p className="text-gray-300 text-lg mt-2">Follow these 4 steps to get your first sales this week:</p>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-violet-500/10 rounded-xl p-6 border border-violet-500/30">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-violet-500 flex items-center justify-center flex-shrink-0 text-xl font-bold text-white">
                  1
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">Watch the Facebook Ads Course</h3>
                  <p className="text-gray-300 leading-relaxed">
                    Start with Module 1 below. We'll show you exactly how to set up your first ad campaign, even if
                    you've never run ads before. Takes about 2 hours.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-purple-500/10 rounded-xl p-6 border border-purple-500/30">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-purple-500 flex items-center justify-center flex-shrink-0 text-xl font-bold text-white">
                  2
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">Pick a Landing Page Template</h3>
                  <p className="text-gray-300 leading-relaxed">
                    Choose one of the 8 proven landing page templates below. These pages are designed to convert paid
                    traffic into sales. Just add your affiliate link.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-fuchsia-500/10 rounded-xl p-6 border border-fuchsia-500/30">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-fuchsia-500 flex items-center justify-center flex-shrink-0 text-xl font-bold text-white">
                  3
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">Set Up Your First Ad Campaign</h3>
                  <p className="text-gray-300 leading-relaxed">
                    Follow the step-by-step instructions from the course. Start with a small budget ($10-20/day) to
                    test. You'll see results within 24-48 hours.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-pink-500/10 rounded-xl p-6 border border-pink-500/30">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-pink-500 flex items-center justify-center flex-shrink-0 text-xl font-bold text-white">
                  4
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">Scale What Works</h3>
                  <p className="text-gray-300 leading-relaxed">
                    Once you get your first sales, increase your ad budget gradually. Use the split testing tools below
                    to improve your results and scale to $100+ per day.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-violet-500/20 rounded-xl p-6 border border-violet-500/40 text-center">
            <p className="text-xl text-violet-200 font-semibold">
              ⚡ Most members get their first sale within 3-7 days of starting paid traffic!
            </p>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gray-900/50 border-violet-500/20 shadow-xl">
        <CardHeader>
          <CardTitle className="text-3xl text-white flex items-center gap-3">
            <Video className="w-8 h-8 text-violet-400" />
            Complete Paid Traffic Training Library
          </CardTitle>
          <p className="text-gray-300 text-lg mt-2">
            6 full courses covering every major traffic platform - Watch in any order
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {trafficCourses.map((course, index) => (
              <Card
                key={index}
                className="bg-gradient-to-r from-gray-800/80 to-gray-900/80 border-violet-500/20 hover:border-violet-400/50 transition-all"
              >
                <CardContent className="p-8">
                  <div className="flex items-start gap-6">
                    <div className="w-24 h-24 rounded-xl bg-gradient-to-br from-violet-500 to-purple-500 flex items-center justify-center flex-shrink-0 shadow-lg">
                      <Play className="w-12 h-12 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <span className="px-3 py-1 bg-violet-500/20 text-violet-300 text-sm font-bold rounded-full">
                          {course.level}
                        </span>
                        <span className="text-gray-400">{course.duration}</span>
                        <span className="text-gray-400">• {course.lessons} lessons</span>
                      </div>
                      <h3 className="text-2xl font-bold text-white mb-3">{course.title}</h3>
                      <p className="text-lg text-gray-300 leading-relaxed mb-4">{course.description}</p>
                      <Button className="bg-violet-500 hover:bg-violet-600 text-white font-semibold px-8" size="lg">
                        <Play className="w-5 h-5 mr-2" />
                        Start Course
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gray-900/50 border-violet-500/20 shadow-xl">
        <CardHeader>
          <CardTitle className="text-3xl text-white flex items-center gap-3">
            <Target className="w-8 h-8 text-violet-400" />
            High-Converting Landing Page Templates
          </CardTitle>
          <p className="text-gray-300 text-lg mt-2">
            8 proven templates optimized for paid traffic - Just add your affiliate link and go live
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {landingPages.map((page, index) => (
              <Card
                key={index}
                className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 border-violet-500/20 hover:border-violet-400/50 transition-all"
              >
                <CardContent className="p-6">
                  <div className="mb-4">
                    <span className="inline-block px-3 py-1 bg-violet-500/20 text-violet-300 text-sm font-semibold rounded-full mb-3">
                      {page.type}
                    </span>
                    <h3 className="text-xl font-bold text-white mb-2">{page.name}</h3>
                    <p className="text-gray-400 text-sm mb-3">{page.uses}</p>
                  </div>
                  <Button className="w-full bg-violet-500 hover:bg-violet-600 text-white font-semibold" size="lg">
                    Use This Template
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gray-900/50 border-violet-500/20 shadow-xl">
        <CardHeader>
          <CardTitle className="text-3xl text-white flex items-center gap-3">
            <TrendingUp className="w-8 h-8 text-violet-400" />
            Advanced Tools & Resources
          </CardTitle>
          <p className="text-gray-300 text-lg mt-2">Everything you need to optimize and scale your campaigns</p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 border-violet-500/20">
              <CardContent className="p-8 space-y-4">
                <div className="w-16 h-16 rounded-xl bg-violet-500/20 flex items-center justify-center">
                  <Target className="w-8 h-8 text-violet-400" />
                </div>
                <h3 className="text-2xl font-bold text-white">A/B Split Testing Tool</h3>
                <p className="text-gray-300 text-lg leading-relaxed">
                  Test different headlines, images, and buttons to find what converts best. Increase your profits by
                  20-50% with simple tests.
                </p>
                <Button
                  variant="outline"
                  className="w-full border-violet-500 text-violet-300 hover:bg-violet-500/20 bg-transparent"
                  size="lg"
                >
                  Launch Testing Tool
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 border-violet-500/20">
              <CardContent className="p-8 space-y-4">
                <div className="w-16 h-16 rounded-xl bg-violet-500/20 flex items-center justify-center">
                  <TrendingUp className="w-8 h-8 text-violet-400" />
                </div>
                <h3 className="text-2xl font-bold text-white">Real-Time Analytics Dashboard</h3>
                <p className="text-gray-300 text-lg leading-relaxed">
                  Track every click, conversion, and dollar spent. See exactly which ads are profitable and which ones
                  to turn off.
                </p>
                <Button
                  variant="outline"
                  className="w-full border-violet-500 text-violet-300 hover:bg-violet-500/20 bg-transparent"
                  size="lg"
                >
                  View Dashboard
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 border-violet-500/20">
              <CardContent className="p-8 space-y-4">
                <div className="w-16 h-16 rounded-xl bg-violet-500/20 flex items-center justify-center">
                  <Download className="w-8 h-8 text-violet-400" />
                </div>
                <h3 className="text-2xl font-bold text-white">300+ Proven Ad Copy Templates</h3>
                <p className="text-gray-300 text-lg leading-relaxed">
                  Copy and paste winning ad copy that's generated millions in sales. Includes headlines, body text, and
                  call-to-actions.
                </p>
                <Button
                  variant="outline"
                  className="w-full border-violet-500 text-violet-300 hover:bg-violet-500/20 bg-transparent"
                  size="lg"
                >
                  <Download className="w-5 h-5 mr-2" />
                  Download Ad Templates
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 border-violet-500/20">
              <CardContent className="p-8 space-y-4">
                <div className="w-16 h-16 rounded-xl bg-violet-500/20 flex items-center justify-center">
                  <Calendar className="w-8 h-8 text-violet-400" />
                </div>
                <h3 className="text-2xl font-bold text-white">1-on-1 Strategy Call</h3>
                <p className="text-gray-300 text-lg leading-relaxed">
                  Book a free 30-minute call with a 7-figure affiliate marketer. Get personalized advice for your
                  specific situation.
                </p>
                <Button
                  variant="outline"
                  className="w-full border-violet-500 text-violet-300 hover:bg-violet-500/20 bg-transparent"
                  size="lg"
                >
                  <Calendar className="w-5 h-5 mr-2" />
                  Schedule Your Call
                </Button>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-violet-500/10 to-purple-500/10 border-violet-500/30 shadow-xl">
        <CardContent className="p-8 text-center space-y-4">
          <h3 className="text-3xl font-bold text-white">Questions? We're Here to Help!</h3>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Paid traffic can seem complicated at first, but we'll guide you every step of the way. Email us anytime at
            support@p55account.com for help with your campaigns.
          </p>
          <Button className="bg-violet-500 hover:bg-violet-600 text-white font-bold text-lg px-12" size="lg">
            Get Help Now
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
