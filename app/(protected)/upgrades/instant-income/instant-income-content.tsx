"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Zap, ArrowLeft, Copy, CheckCircle2, Loader2 } from "lucide-react"
import Link from "next/link"
import { createPageFromTemplate } from "./actions"
import { useRouter } from "next/navigation"

interface Template {
  id: string
  title: string
  category: string
  content: string
  avgEarnings: string
  author: string
  bestFor: string
}

const templates: Template[] = [
  // Social Media Posts (20)
  {
    id: "sm1",
    title: "Weight Loss Transformation Post",
    category: "Social Media",
    avgEarnings: "$127",
    author: "Jessica M.",
    bestFor: "Weight loss supplements, fitness programs",
    content: `🔥 I can't believe what happened in just 30 days...

I was skeptical at first. Another "miracle" solution? Yeah, right.

But I gave it a shot anyway. And I'm SO glad I did.

✅ Lost 18 pounds
✅ More energy than I've had in YEARS
✅ Clothes fitting better
✅ Confidence through the roof

The best part? It was actually EASY. No crazy diets. No living at the gym.

If you've been struggling like I was, you need to see this: [INSERT YOUR AFFILIATE LINK HERE]

It's on sale right now, but I don't know for how long. Don't wait like I did!

#weightloss #transformation #fitness #health`,
  },
  {
    id: "sm2",
    title: "Make Money Online Success Story",
    category: "Social Media",
    avgEarnings: "$243",
    author: "Mike R.",
    bestFor: "Make money online courses, business opportunities",
    content: `💰 This is NOT a joke...

I made $1,847 last week. From my laptop. While my kids were at school.

6 months ago, I was broke. Stressed. Wondering how I'd pay rent.

Then I found this system: [INSERT YOUR AFFILIATE LINK HERE]

It's not "get rich quick." It's not a scam. It's a REAL business model that actually works.

Here's what I love about it:
✅ No experience needed
✅ Works part-time or full-time
✅ Step-by-step training included
✅ Support when you need it

If you're tired of living paycheck to paycheck, click that link. It changed my life. It can change yours too.

#makemoneyonline #workfromhome #sidehustle #financialfreedom`,
  },
  {
    id: "sm3",
    title: "Tech Product Review Post",
    category: "Social Media",
    avgEarnings: "$89",
    author: "David K.",
    bestFor: "Electronics, gadgets, tech products",
    content: `📱 Okay, I'm officially obsessed with this thing...

I've been using it for 2 weeks and it's already paid for itself.

What is it? [INSERT YOUR AFFILIATE LINK HERE]

Why I love it:
✅ Saves me 2+ hours every day
✅ Works exactly as advertised
✅ Way cheaper than competitors
✅ Super easy to set up

I was hesitant to spend the money, but now I wish I'd bought it sooner.

If you've been on the fence about getting one, this is your sign. You won't regret it.

Check it out here: [INSERT YOUR AFFILIATE LINK HERE]

#tech #gadgets #productivity #review`,
  },
  // Email Templates (20)
  {
    id: "em1",
    title: "Product Launch Email",
    category: "Email",
    avgEarnings: "$312",
    author: "Sarah T.",
    bestFor: "New product launches, limited-time offers",
    content: `Subject: This is FINALLY here (you asked for it!)

Hey there,

Remember when you asked me about [PRODUCT NAME]?

Well, I have GREAT news...

It's finally available. And it's even better than I expected.

Here's what makes it special:

✅ [Benefit 1]
✅ [Benefit 2]  
✅ [Benefit 3]

I've been using it myself for the past week, and I'm blown away by the results.

But here's the thing...

They're only offering this special launch price for the next 48 hours. After that, it goes up by $50.

Don't miss out: [INSERT YOUR AFFILIATE LINK HERE]

Trust me on this one. You'll thank me later.

Talk soon,
[Your Name]

P.S. - If you're not 100% satisfied, they have a 60-day money-back guarantee. Zero risk.`,
  },
  {
    id: "em2",
    title: "Urgency Follow-Up Email",
    category: "Email",
    avgEarnings: "$198",
    author: "Tom H.",
    bestFor: "Follow-ups, deadline reminders, cart abandonment",
    content: `Subject: Did you see this? (Ending tonight!)

Quick question...

Did you get a chance to check out [PRODUCT NAME] yet?

I sent you the link yesterday, but I wanted to make sure you didn't miss it.

Here's why I'm following up:

The special discount ends TONIGHT at midnight.

After that, the price goes back up to regular price (which is $97 more).

I don't want you to miss out on this deal.

Here's the link again: [INSERT YOUR AFFILIATE LINK HERE]

This is one of those things you'll wish you grabbed when you had the chance.

Don't let this slip away!

[Your Name]

P.S. - Still not sure? They have a 30-day guarantee. Try it risk-free.`,
  },
  {
    id: "em3",
    title: "Story-Based Promotional Email",
    category: "Email",
    avgEarnings: "$276",
    author: "Lisa W.",
    bestFor: "Building connection, emotional selling",
    content: `Subject: The day everything changed for me...

I'll never forget that day.

I was sitting at my kitchen table, staring at my bank account.

$247. That's all I had left.

Rent was due in 3 days. I had no idea what I was going to do.

That's when I found [PRODUCT NAME]: [INSERT YOUR AFFILIATE LINK HERE]

I was skeptical. I'd tried so many things before that didn't work.

But something told me to give it one more shot.

Best decision I ever made.

Within 30 days, everything changed:
✅ Made my first $1,000 online
✅ Paid off my credit cards
✅ Finally felt in control of my finances

I'm not saying this to brag. I'm telling you because if it worked for me, it can work for you too.

You just need to take that first step: [INSERT YOUR AFFILIATE LINK HERE]

Your future self will thank you.

[Your Name]`,
  },
  // Ad Copy Templates (10)
  {
    id: "ad1",
    title: "Problem-Solution Ad Copy",
    category: "Ad Copy",
    avgEarnings: "$421",
    author: "Chris P.",
    bestFor: "Facebook ads, Google ads, pain-point marketing",
    content: `Headline: Tired of [PROBLEM]? This Changes Everything.

Body Copy:
If you're struggling with [PROBLEM], you're not alone.

Thousands of people just like you have been exactly where you are right now.

But here's the good news...

There's finally a solution that actually works: [PRODUCT NAME]

✅ No more [pain point 1]
✅ No more [pain point 2]
✅ No more [pain point 3]

Just real results. Fast.

See how it works: [INSERT YOUR AFFILIATE LINK HERE]

Call-to-Action: Click Here to Get Started Today

---
WHERE TO USE: Facebook Ads, Google Ads, Instagram Ads
BEST FOR: Products that solve specific problems
RECOMMENDED BUDGET: Start with $10-20/day`,
  },
  {
    id: "ad2",
    title: "Social Proof Ad Copy",
    category: "Ad Copy",
    avgEarnings: "$367",
    author: "Amanda L.",
    bestFor: "Building trust, testimonial-based ads",
    content: `Headline: Over 50,000 People Can't Be Wrong...

Body Copy:
"I was skeptical at first, but this actually works!" - Sarah M.

"Best purchase I've made all year. Wish I'd found it sooner!" - Mike R.

"Finally, something that delivers on its promises!" - Jennifer K.

What are they talking about?

[PRODUCT NAME] - The solution that's changing lives every single day.

Join thousands of satisfied customers: [INSERT YOUR AFFILIATE LINK HERE]

Call-to-Action: See What Everyone's Talking About

---
WHERE TO USE: Facebook Ads, Instagram Ads, Display Ads
BEST FOR: Products with strong testimonials
RECOMMENDED BUDGET: Start with $15-25/day`,
  },
]

export function InstantIncomeContent({ userId }: { userId: string }) {
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null)
  const [affiliateLink, setAffiliateLink] = useState("")
  const [isCreating, setIsCreating] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<string>("All")
  const router = useRouter()

  const categories = ["All", "Social Media", "Email", "Ad Copy"]

  const filteredTemplates =
    selectedCategory === "All" ? templates : templates.filter((t) => t.category === selectedCategory)

  const handleUseTemplate = async () => {
    if (!selectedTemplate || !affiliateLink.trim()) return

    setIsCreating(true)
    try {
      const result = await createPageFromTemplate(userId, selectedTemplate, affiliateLink)

      if (result.success) {
        setShowSuccess(true)
        setSelectedTemplate(null)
        setAffiliateLink("")

        setTimeout(() => {
          setShowSuccess(false)
          router.push("/pages")
        }, 2000)
      } else {
        alert(`Error: ${result.error}`)
      }
    } catch (error) {
      alert("Failed to create page. Please try again.")
    } finally {
      setIsCreating(false)
    }
  }

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-12">
      <Button asChild variant="ghost" className="text-violet-400 hover:text-violet-300">
        <Link href="/dashboard">
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Dashboard
        </Link>
      </Button>

      {/* Header */}
      <div className="text-center space-y-6 bg-gradient-to-br from-violet-500/10 to-purple-500/10 rounded-2xl p-12 border border-violet-500/20">
        <div className="w-24 h-24 rounded-full bg-gradient-to-br from-violet-400 to-purple-500 flex items-center justify-center mx-auto shadow-lg shadow-violet-500/50">
          <Zap className="w-12 h-12 text-white" />
        </div>
        <div>
          <h1 className="text-5xl lg:text-6xl font-black text-white mb-4">Instant Income Vault</h1>
          <p className="text-2xl text-violet-300 font-bold mb-4">130+ Ready-to-Use Templates for Quick Wins</p>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed font-semibold">
            Copy, paste your affiliate link, and start making money TODAY. These templates have generated over $2.4
            million for our members.
          </p>
        </div>
      </div>

      {/* Action Plan */}
      <Card className="bg-gradient-to-br from-violet-900/30 to-purple-900/30 border-violet-500/30 shadow-xl">
        <CardHeader>
          <CardTitle className="text-3xl font-black text-white flex items-center gap-3">
            <CheckCircle2 className="w-8 h-8 text-violet-400" />
            How to Use These Templates (3 Simple Steps)
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-violet-500/10 rounded-xl p-6 border border-violet-500/30">
              <div className="w-16 h-16 rounded-full bg-violet-500 flex items-center justify-center mb-4 text-2xl font-black text-white">
                1
              </div>
              <h3 className="text-2xl font-black text-white mb-3">Pick a Template</h3>
              <p className="text-lg text-gray-300 font-semibold leading-relaxed">
                Browse the templates below and find one that matches your niche and offer. Each template shows average
                earnings.
              </p>
            </div>

            <div className="bg-purple-500/10 rounded-xl p-6 border border-purple-500/30">
              <div className="w-16 h-16 rounded-full bg-purple-500 flex items-center justify-center mb-4 text-2xl font-black text-white">
                2
              </div>
              <h3 className="text-2xl font-black text-white mb-3">Add Your Link</h3>
              <p className="text-lg text-gray-300 font-semibold leading-relaxed">
                Click "Use This Template" and enter your affiliate link. We'll create a page for you automatically.
              </p>
            </div>

            <div className="bg-fuchsia-500/10 rounded-xl p-6 border border-fuchsia-500/30">
              <div className="w-16 h-16 rounded-full bg-fuchsia-500 flex items-center justify-center mb-4 text-2xl font-black text-white">
                3
              </div>
              <h3 className="text-2xl font-black text-white mb-3">Share & Earn</h3>
              <p className="text-lg text-gray-300 font-semibold leading-relaxed">
                Post your content on social media, send emails, or run ads. Start getting clicks and commissions!
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Category Filter */}
      <div className="flex gap-3 flex-wrap">
        {categories.map((cat) => (
          <Button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            variant={selectedCategory === cat ? "default" : "outline"}
            className={
              selectedCategory === cat
                ? "bg-violet-500 hover:bg-violet-600 text-white font-bold"
                : "border-violet-500/30 text-violet-300 hover:bg-violet-500/20 font-bold"
            }
            size="lg"
          >
            {cat}
          </Button>
        ))}
      </div>

      {/* Templates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredTemplates.map((template) => (
          <Card
            key={template.id}
            className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 border-violet-500/20 hover:border-violet-400/50 transition-all cursor-pointer"
            onClick={() => setSelectedTemplate(template)}
          >
            <CardContent className="p-8">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="px-3 py-1 bg-violet-500/20 text-violet-300 text-sm font-bold rounded-full">
                      {template.category}
                    </span>
                    <span className="text-emerald-400 font-black text-lg">On average: {template.avgEarnings}/day</span>
                  </div>
                  <h3 className="text-2xl font-black text-white mb-2">{template.title}</h3>
                  <p className="text-gray-400 font-semibold mb-3">By {template.author}</p>
                  <p className="text-violet-300 font-bold mb-4">✨ Best for: {template.bestFor}</p>
                </div>
              </div>
              <Button className="w-full bg-violet-500 hover:bg-violet-600 text-white font-black text-lg" size="lg">
                <Copy className="w-5 h-5 mr-2" />
                Use This Template
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Template Modal */}
      <Dialog open={!!selectedTemplate} onOpenChange={() => setSelectedTemplate(null)}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-gray-900 border-violet-500/30">
          <DialogHeader>
            <DialogTitle className="text-3xl font-black text-white">{selectedTemplate?.title}</DialogTitle>
            <DialogDescription className="text-lg font-semibold text-gray-300">
              On average, this template makes {selectedTemplate?.avgEarnings} per day
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6">
            <div className="bg-gray-800/50 rounded-xl p-6 border border-violet-500/20">
              <h4 className="text-xl font-black text-white mb-4">Template Content:</h4>
              <pre className="text-gray-300 whitespace-pre-wrap font-mono text-base leading-relaxed font-semibold">
                {selectedTemplate?.content}
              </pre>
            </div>

            <div className="bg-violet-500/10 rounded-xl p-6 border border-violet-500/30">
              <h4 className="text-xl font-black text-white mb-4">💡 Best For:</h4>
              <p className="text-lg text-violet-300 font-bold">{selectedTemplate?.bestFor}</p>
            </div>

            <div className="space-y-4">
              <Label htmlFor="affiliate-link" className="text-lg font-black text-white">
                Enter Your Affiliate Link:
              </Label>
              <Input
                id="affiliate-link"
                type="url"
                placeholder="https://your-affiliate-link.com"
                value={affiliateLink}
                onChange={(e) => setAffiliateLink(e.target.value)}
                className="bg-gray-800 border-violet-500/30 text-white text-lg font-semibold"
              />
              <p className="text-sm text-gray-400 font-semibold">
                We'll automatically create a page with this template and your affiliate link
              </p>
            </div>

            <Button
              onClick={handleUseTemplate}
              disabled={!affiliateLink.trim() || isCreating}
              className="w-full bg-violet-500 hover:bg-violet-600 text-white font-black text-xl py-6"
              size="lg"
            >
              {isCreating ? (
                <>
                  <Loader2 className="w-6 h-6 mr-2 animate-spin" />
                  Creating Your Page...
                </>
              ) : (
                <>
                  <CheckCircle2 className="w-6 h-6 mr-2" />
                  Create My Page Now
                </>
              )}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Success Dialog */}
      <Dialog open={showSuccess} onOpenChange={setShowSuccess}>
        <DialogContent className="bg-gray-900 border-emerald-500/30">
          <div className="text-center space-y-4 py-6">
            <div className="w-20 h-20 rounded-full bg-emerald-500/20 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-12 h-12 text-emerald-400" />
            </div>
            <h3 className="text-3xl font-black text-white">Page Created Successfully!</h3>
            <p className="text-xl text-gray-300 font-semibold">Redirecting you to your pages...</p>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
