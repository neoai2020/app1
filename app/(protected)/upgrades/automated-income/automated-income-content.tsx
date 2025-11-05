"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Rocket, ArrowLeft, Workflow, CheckCircle2, Loader2 } from "lucide-react"
import Link from "next/link"
import { createPageFromSequence } from "./actions"
import { useRouter } from "next/navigation"

interface Sequence {
  id: string
  title: string
  category: string
  emails: number
  content: string
  avgEarnings: string
  author: string
  bestFor: string
}

const sequences: Sequence[] = [
  {
    id: "seq1",
    title: "7-Day Welcome & Warm-Up Sequence",
    category: "Email Sequences",
    emails: 7,
    avgEarnings: "$847",
    author: "Jennifer K.",
    bestFor: "Building trust with new subscribers",
    content: `EMAIL 1 - Day 1: Welcome!
Subject: Welcome! Here's what to expect...

Hi there!

Thanks for joining our community. I'm so excited to have you here!

Over the next 7 days, I'm going to share some incredible tips and strategies that have helped thousands of people just like you achieve [DESIRED OUTCOME].

Tomorrow, I'll send you [BENEFIT/TIP #1].

Talk soon!
[Your Name]

P.S. - Make sure to whitelist this email so you don't miss anything!

---

EMAIL 2 - Day 2: Value Bomb #1
Subject: Here's your first tip (this one's powerful)

Hey!

As promised, here's your first tip...

[SHARE VALUABLE TIP OR STRATEGY]

This alone has helped people [SPECIFIC RESULT].

Tomorrow, I'll share an even better strategy.

Stay tuned!
[Your Name]

---

EMAIL 3 - Day 3: Value Bomb #2
Subject: This changes everything...

Quick question...

Did you try the tip I sent yesterday?

If so, great! If not, no worries - today's tip is even better.

[SHARE ANOTHER VALUABLE TIP]

Try this out and let me know how it goes!

[Your Name]

---

EMAIL 4 - Day 4: Story + Soft Pitch
Subject: How I went from [BEFORE] to [AFTER]

I want to share a quick story with you...

[SHARE PERSONAL STORY OF TRANSFORMATION]

The tool that made all the difference? [PRODUCT NAME]

I'll tell you more about it tomorrow, but if you're curious, you can check it out here: [INSERT YOUR AFFILIATE LINK HERE]

[Your Name]

---

EMAIL 5 - Day 5: Product Introduction
Subject: The tool that changed my life

Remember that story I shared yesterday?

Let me tell you more about [PRODUCT NAME]...

[EXPLAIN WHAT IT IS AND WHY IT WORKS]

✅ [Benefit 1]
✅ [Benefit 2]
✅ [Benefit 3]

If you're serious about [DESIRED OUTCOME], this is the tool you need: [INSERT YOUR AFFILIATE LINK HERE]

[Your Name]

---

EMAIL 6 - Day 6: Objection Handler
Subject: "But what if it doesn't work for me?"

I get it.

You're probably thinking: "This sounds great, but what if it doesn't work for ME?"

Fair question. Here's the truth...

[ADDRESS COMMON OBJECTIONS]

Plus, they offer a [X]-day money-back guarantee. So there's literally zero risk.

Give it a try: [INSERT YOUR AFFILIATE LINK HERE]

[Your Name]

---

EMAIL 7 - Day 7: Final Push
Subject: Last chance to grab this...

Hey,

I've been telling you about [PRODUCT NAME] all week.

And I really hope you grabbed it, because the special offer ends tonight.

After midnight, the price goes back up to [REGULAR PRICE].

Don't miss out: [INSERT YOUR AFFILIATE LINK HERE]

This is your moment. Take it.

[Your Name]`,
  },
  {
    id: "seq2",
    title: "30-Day Evergreen Promotion Sequence",
    category: "Email Sequences",
    emails: 30,
    avgEarnings: "$1,247",
    author: "Mike R.",
    bestFor: "Automated passive income, long-term nurturing",
    content: `This is a complete 30-day email sequence that promotes your affiliate offer on autopilot.

WEEK 1 (Days 1-7): Build Trust & Provide Value
- Day 1: Welcome email
- Day 2: Quick win tip #1
- Day 3: Quick win tip #2
- Day 4: Personal story
- Day 5: Case study
- Day 6: Common mistake to avoid
- Day 7: Soft product mention

WEEK 2 (Days 8-14): Introduce Solution
- Day 8: The problem (agitate pain points)
- Day 9: The solution exists
- Day 10: Product introduction
- Day 11: How it works
- Day 12: Success story #1
- Day 13: Success story #2
- Day 14: Special offer announcement

WEEK 3 (Days 15-21): Overcome Objections
- Day 15: "But what if..."
- Day 16: Comparison with alternatives
- Day 17: ROI breakdown
- Day 18: Testimonial compilation
- Day 19: Behind the scenes
- Day 20: Urgency (limited spots/time)
- Day 21: Final call

WEEK 4 (Days 22-30): Re-engagement & Upsell
- Day 22: "Did you miss this?"
- Day 23: New angle/benefit
- Day 24: FAQ email
- Day 25: Bonus announcement
- Day 26: Last chance reminder
- Day 27: Post-purchase follow-up
- Day 28: Upsell opportunity
- Day 29: Request for feedback
- Day 30: Thank you + next steps

[FULL EMAIL COPY FOR ALL 30 DAYS INCLUDED]

Each email includes:
✅ Subject line
✅ Complete body copy
✅ Call-to-action
✅ P.S. line

Just add your affiliate link: [INSERT YOUR AFFILIATE LINK HERE]

And you're done! This sequence runs on autopilot forever.`,
  },
  {
    id: "funnel1",
    title: "Complete Product Launch Funnel",
    category: "Funnel Blueprints",
    emails: 12,
    avgEarnings: "$2,134",
    author: "Sarah T.",
    bestFor: "Launching new products, big promotions",
    content: `COMPLETE PRODUCT LAUNCH FUNNEL BLUEPRINT

This is the exact funnel that generated $47,000 in 5 days.

PHASE 1: PRE-LAUNCH (Days 1-3)
Goal: Build anticipation and curiosity

Email 1 - Day 1: "Something big is coming..."
Subject: You're going to want to see this...

[TEASE THE UPCOMING LAUNCH WITHOUT REVEALING TOO MUCH]

Email 2 - Day 2: "Here's a sneak peek..."
Subject: [SNEAK PEEK] This is going to be huge

[REVEAL ONE EXCITING FEATURE OR BENEFIT]

Email 3 - Day 3: "Tomorrow is the day!"
Subject: It's almost here (get ready!)

[BUILD MAXIMUM ANTICIPATION FOR LAUNCH DAY]

---

PHASE 2: LAUNCH (Days 4-6)
Goal: Drive immediate sales

Email 4 - Day 4: "IT'S HERE!"
Subject: 🚀 LIVE NOW: [PRODUCT NAME]

[FULL PRODUCT REVEAL WITH ALL BENEFITS AND FEATURES]
[INSERT YOUR AFFILIATE LINK HERE]

Email 5 - Day 5: "Early bird bonus ending soon"
Subject: Your early bird bonus expires tonight

[REMIND ABOUT LIMITED-TIME BONUS]
[INSERT YOUR AFFILIATE LINK HERE]

Email 6 - Day 6: "Success stories already coming in!"
Subject: People are already getting results...

[SHARE EARLY SUCCESS STORIES AND TESTIMONIALS]
[INSERT YOUR AFFILIATE LINK HERE]

---

PHASE 3: SCARCITY (Days 7-9)
Goal: Create urgency and FOMO

Email 7 - Day 7: "Only 3 days left..."
Subject: This offer disappears in 72 hours

[EMPHASIZE LIMITED TIME REMAINING]
[INSERT YOUR AFFILIATE LINK HERE]

Email 8 - Day 8: "Last 48 hours"
Subject: 48 hours left (don't miss this)

[SHARE MORE TESTIMONIALS AND RESULTS]
[INSERT YOUR AFFILIATE LINK HERE]

Email 9 - Day 9: "FINAL CALL"
Subject: This is it. Last chance.

[FINAL PUSH WITH MAXIMUM URGENCY]
[INSERT YOUR AFFILIATE LINK HERE]

---

PHASE 4: POST-LAUNCH (Days 10-12)
Goal: Catch stragglers and re-engage

Email 10 - Day 10: "Did you miss it?"
Subject: I'm reopening this for 24 hours only...

[SURPRISE REOPENING FOR THOSE WHO MISSED IT]
[INSERT YOUR AFFILIATE LINK HERE]

Email 11 - Day 11: "Seriously, last chance"
Subject: Closing the doors in 12 hours (for real this time)

[ABSOLUTE FINAL OPPORTUNITY]
[INSERT YOUR AFFILIATE LINK HERE]

Email 12 - Day 12: "Thank you + what's next"
Subject: Thank you (and here's what's coming next)

[THANK EVERYONE AND TEASE NEXT PROMOTION]

---

COMPLETE COPY FOR ALL 12 EMAILS INCLUDED
Just add your affiliate link and launch!`,
  },
]

export function AutomatedIncomeContent({ userId }: { userId: string }) {
  const [selectedSequence, setSelectedSequence] = useState<Sequence | null>(null)
  const [affiliateLink, setAffiliateLink] = useState("")
  const [isCreating, setIsCreating] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<string>("All")
  const router = useRouter()

  const categories = ["All", "Email Sequences", "Funnel Blueprints"]

  const filteredSequences =
    selectedCategory === "All" ? sequences : sequences.filter((s) => s.category === selectedCategory)

  const handleUseSequence = async () => {
    if (!selectedSequence || !affiliateLink.trim()) return

    setIsCreating(true)
    try {
      const result = await createPageFromSequence(userId, selectedSequence, affiliateLink)

      if (result.success) {
        setShowSuccess(true)
        setSelectedSequence(null)
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
      <Button asChild variant="ghost" className="text-emerald-400 hover:text-emerald-300">
        <Link href="/dashboard">
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Dashboard
        </Link>
      </Button>

      {/* Header */}
      <div className="text-center space-y-6 bg-gradient-to-br from-emerald-500/10 to-green-500/10 rounded-2xl p-12 border border-emerald-500/20">
        <div className="w-24 h-24 rounded-full bg-gradient-to-br from-emerald-400 to-green-500 flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/50">
          <Rocket className="w-12 h-12 text-white" />
        </div>
        <div>
          <h1 className="text-5xl lg:text-6xl font-black text-white mb-4">Automated Income Vault</h1>
          <p className="text-2xl text-emerald-300 font-bold mb-4">Complete Systems That Run on Autopilot</p>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed font-semibold">
            Set up once, earn forever. These automated sequences and funnels have generated over $8.7 million in passive
            income for our members.
          </p>
        </div>
      </div>

      {/* Action Plan */}
      <Card className="bg-gradient-to-br from-emerald-900/30 to-green-900/30 border-emerald-500/30 shadow-xl">
        <CardHeader>
          <CardTitle className="text-3xl font-black text-white flex items-center gap-3">
            <CheckCircle2 className="w-8 h-8 text-emerald-400" />
            How to Set Up Your Automated System (3 Simple Steps)
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-emerald-500/10 rounded-xl p-6 border border-emerald-500/30">
              <div className="w-16 h-16 rounded-full bg-emerald-500 flex items-center justify-center mb-4 text-2xl font-black text-white">
                1
              </div>
              <h3 className="text-2xl font-black text-white mb-3">Choose Your System</h3>
              <p className="text-lg text-gray-300 font-semibold leading-relaxed">
                Pick an email sequence or funnel blueprint below. Each one is complete and ready to use.
              </p>
            </div>

            <div className="bg-green-500/10 rounded-xl p-6 border border-green-500/30">
              <div className="w-16 h-16 rounded-full bg-green-500 flex items-center justify-center mb-4 text-2xl font-black text-white">
                2
              </div>
              <h3 className="text-2xl font-black text-white mb-3">Add Your Link</h3>
              <p className="text-lg text-gray-300 font-semibold leading-relaxed">
                Enter your affiliate link and we'll automatically insert it throughout the entire sequence.
              </p>
            </div>

            <div className="bg-teal-500/10 rounded-xl p-6 border border-teal-500/30">
              <div className="w-16 h-16 rounded-full bg-teal-500 flex items-center justify-center mb-4 text-2xl font-black text-white">
                3
              </div>
              <h3 className="text-2xl font-black text-white mb-3">Set & Forget</h3>
              <p className="text-lg text-gray-300 font-semibold leading-relaxed">
                Upload to your email service and let it run on autopilot. Earn money while you sleep!
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
                ? "bg-emerald-500 hover:bg-emerald-600 text-white font-bold"
                : "border-emerald-500/30 text-emerald-300 hover:bg-emerald-500/20 font-bold"
            }
            size="lg"
          >
            {cat}
          </Button>
        ))}
      </div>

      {/* Sequences Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredSequences.map((sequence) => (
          <Card
            key={sequence.id}
            className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 border-emerald-500/20 hover:border-emerald-400/50 transition-all cursor-pointer"
            onClick={() => setSelectedSequence(sequence)}
          >
            <CardContent className="p-8">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="px-3 py-1 bg-emerald-500/20 text-emerald-300 text-sm font-bold rounded-full">
                      {sequence.emails} Emails
                    </span>
                    <span className="text-emerald-400 font-black text-lg">
                      On average: {sequence.avgEarnings}/month
                    </span>
                  </div>
                  <h3 className="text-2xl font-black text-white mb-2">{sequence.title}</h3>
                  <p className="text-gray-400 font-semibold mb-3">By {sequence.author}</p>
                  <p className="text-emerald-300 font-bold mb-4">✨ Best for: {sequence.bestFor}</p>
                </div>
              </div>
              <Button className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-black text-lg" size="lg">
                <Workflow className="w-5 h-5 mr-2" />
                Use This System
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Sequence Modal */}
      <Dialog open={!!selectedSequence} onOpenChange={() => setSelectedSequence(null)}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-gray-900 border-emerald-500/30">
          <DialogHeader>
            <DialogTitle className="text-3xl font-black text-white">{selectedSequence?.title}</DialogTitle>
            <DialogDescription className="text-lg font-semibold text-gray-300">
              On average, this system makes {selectedSequence?.avgEarnings} per month on autopilot
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6">
            <div className="bg-gray-800/50 rounded-xl p-6 border border-emerald-500/20">
              <h4 className="text-xl font-black text-white mb-4">Complete System Content:</h4>
              <pre className="text-gray-300 whitespace-pre-wrap font-mono text-base leading-relaxed font-semibold max-h-96 overflow-y-auto">
                {selectedSequence?.content}
              </pre>
            </div>

            <div className="bg-emerald-500/10 rounded-xl p-6 border border-emerald-500/30">
              <h4 className="text-xl font-black text-white mb-4">💡 Best For:</h4>
              <p className="text-lg text-emerald-300 font-bold">{selectedSequence?.bestFor}</p>
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
                className="bg-gray-800 border-emerald-500/30 text-white text-lg font-semibold"
              />
              <p className="text-sm text-gray-400 font-semibold">
                We'll automatically insert your link throughout the entire sequence
              </p>
            </div>

            <Button
              onClick={handleUseSequence}
              disabled={!affiliateLink.trim() || isCreating}
              className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-black text-xl py-6"
              size="lg"
            >
              {isCreating ? (
                <>
                  <Loader2 className="w-6 h-6 mr-2 animate-spin" />
                  Setting Up Your System...
                </>
              ) : (
                <>
                  <CheckCircle2 className="w-6 h-6 mr-2" />
                  Activate This System Now
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
            <h3 className="text-3xl font-black text-white">System Activated Successfully!</h3>
            <p className="text-xl text-gray-300 font-semibold">Redirecting you to your pages...</p>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
