import { Facebook, Play, CheckCircle2, DollarSign, BookOpen, MousePointer2, ArrowRight, Video } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"

export default function InstantIncomePage() {
  const niches = [
    "All Niches", "Weight Loss", "Make Money Online", "Health & Fitness",
    "Beauty & Skincare", "Relationships", "Tech & Gadgets", "Pets", "Home & Garden"
  ]

  return (
    <div className="max-w-[1200px] mx-auto p-4 md:p-10 space-y-12 pb-20">
      {/* Back Button */}
      <Link href="/dashboard" className="inline-flex items-center gap-2 text-zinc-500 hover:text-white transition-colors text-sm font-bold uppercase tracking-widest">
        <ArrowRight className="w-4 h-4 rotate-180" />
        Back to Dashboard
      </Link>

      {/* Hero Section */}
      <Card className="glass-strong border-2 border-primary/20 bg-[#111111] overflow-hidden rounded-4xl text-center py-16 px-6 relative">
        <div className="absolute inset-0 bg-linear-to-b from-primary/5 via-transparent to-transparent pointer-events-none" />
        <div className="relative z-10 space-y-8">
            <div className="flex justify-center">
                <div className="w-20 h-20 rounded-3xl bg-blue-600 flex items-center justify-center shadow-[0_0_40px_rgba(37,99,235,0.4)]">
                    <Facebook className="w-12 h-12 text-white fill-white" />
                </div>
            </div>
            <div className="space-y-4">
                <h1 className="text-4xl md:text-6xl font-black text-white uppercase italic tracking-tighter leading-none">
                    Instant Income: <span className="text-primary italic">Facebook Posts</span>
                </h1>
                <p className="text-lg md:text-2xl text-primary font-black uppercase tracking-widest">
                    200+ Ready-to-Post Messages for Facebook Groups
                </p>
                <p className="text-zinc-500 font-bold max-w-2xl mx-auto leading-relaxed uppercase text-sm tracking-tight px-4 transition-all">
                    Copy these proven posts, paste them in Facebook groups, and start making 
                    money TODAY. No tech skills needed!
                </p>
            </div>
        </div>
      </Card>

      {/* Watch First Section */}
      <Card className="glass border-2 border-white/5 bg-[#111111] overflow-hidden rounded-4xl">
        <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="aspect-video bg-zinc-900 relative group cursor-pointer overflow-hidden">
                <img 
                    src="https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?q=80&w=1074&auto=format&fit=crop" 
                    className="w-full h-full object-cover opacity-40 group-hover:scale-105 transition-transform duration-700"
                    alt="Tutorial Thumbnail"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="flex flex-col items-center gap-4">
                        <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center shadow-[0_0_30px_rgba(179,255,0,0.3)] group-hover:scale-110 transition-transform">
                            <Play className="w-7 h-7 text-black fill-black ml-1" />
                        </div>
                        <span className="text-white font-black uppercase tracking-widest text-sm drop-shadow-lg">Watch Instant Income Tutorial</span>
                    </div>
                </div>
            </div>
            <div className="p-10 flex flex-col justify-center space-y-6 bg-white/2">
                <div className="flex items-center gap-3">
                    <Video className="w-5 h-5 text-primary" />
                    <span className="text-primary font-black uppercase tracking-[0.2em] text-xs -skew-x-12">Watch First</span>
                </div>
                <h2 className="text-3xl font-black text-white uppercase italic leading-tight tracking-tighter">
                    How to Use Instant Income
                </h2>
                <p className="text-zinc-400 font-medium leading-relaxed">
                    Watch this quick tutorial to learn how to copy these Facebook posts and start making money instantly. Simple and easy!
                </p>
            </div>
        </div>
      </Card>

      {/* Guide Section */}
      <div className="space-y-8">
        <div className="flex items-center gap-4 px-4">
            <BookOpen className="w-8 h-8 text-blue-400" />
            <h2 className="text-3xl font-black text-white uppercase italic tracking-tighter">How to Find & Post in Facebook Groups</h2>
        </div>

        <div className="grid grid-cols-1 gap-6">
            <Card className="glass border border-white/5 bg-[#111111] rounded-3xl p-8 hover:bg-white/3 transition-colors group">
                <h3 className="text-xl font-black text-white uppercase italic mb-4 flex items-center gap-3">
                    <span className="text-blue-400">Step 1:</span> Find Facebook Groups
                </h3>
                <ul className="space-y-4 text-zinc-400 font-bold text-sm">
                    <li className="flex gap-4">
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-2 shrink-0" />
                        Go to Facebook and click the search bar at the top. Type keywords like "weight loss support", "make money online", or "fitness motivation"
                    </li>
                    <li className="flex gap-4">
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-2 shrink-0" />
                        Click "Groups" in the left sidebar to see only groups (not pages or people)
                    </li>
                    <li className="flex gap-4">
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-2 shrink-0" />
                        Join 10-15 groups with 5,000+ members. Bigger groups = more people seeing your posts = more money!
                    </li>
                    <li className="flex gap-4">
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-2 shrink-0" />
                        Wait for the group admin to approve you (usually takes 1-24 hours). Be patient - it's worth it!
                    </li>
                </ul>
            </Card>

            <Card className="glass border border-white/5 bg-[#111111] rounded-3xl p-8 hover:bg-white/3 transition-colors group">
                <h3 className="text-xl font-black text-white uppercase italic mb-4 flex items-center gap-3">
                    <span className="text-blue-400">Step 2:</span> Read the Group Rules
                </h3>
                <ul className="space-y-4 text-zinc-400 font-bold text-sm">
                    <li className="flex gap-4">
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-2 shrink-0" />
                        Click "About" in the group to see the rules. Most groups allow personal stories but not direct selling
                    </li>
                    <li className="flex gap-4">
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-2 shrink-0" />
                        Our posts are written as personal success stories, so they're usually allowed. But always check first!
                    </li>
                    <li className="flex gap-4">
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-2 shrink-0" />
                        If a group says "no links", you can still post the message and send the link in private messages to people who ask
                    </li>
                </ul>
            </Card>

            <Card className="glass border border-white/5 bg-[#111111] rounded-3xl p-8 hover:bg-white/3 transition-colors group">
                <h3 className="text-xl font-black text-white uppercase italic mb-4 flex items-center gap-3">
                    <span className="text-blue-400">Step 3:</span> Post Your Message
                </h3>
                <ul className="space-y-4 text-zinc-400 font-bold text-sm">
                    <li className="flex gap-4">
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-2 shrink-0" />
                        Click "Write something..." in the group. Paste your copied message. Click "Post". That's it!
                    </li>
                    <li className="flex gap-4">
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-2 shrink-0" />
                        Best times to post: 7-9 AM (before work), 12-1 PM (lunch break), 7-9 PM (after work). People are most active then!
                    </li>
                    <li className="flex gap-4">
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-2 shrink-0" />
                        Post in 3-5 different groups per day. DON'T post in all groups at once or Facebook might think you're spamming
                    </li>
                    <li className="flex gap-4">
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-2 shrink-0" />
                        When people comment, reply within 1 hour! Be friendly and helpful. This makes your post show up more in the group
                    </li>
                </ul>
            </Card>
        </div>
      </div>

      {/* Income Math */}
      <Card className="bg-[#0b171c] border-2 border-blue-500/20 rounded-4xl p-10 space-y-8">
        <div className="flex items-center gap-4">
            <DollarSign className="w-10 h-10 text-[#d4af37]" />
            <h2 className="text-3xl font-black text-white uppercase italic tracking-tighter">How Much Can You Make?</h2>
        </div>
        <p className="text-zinc-300 font-bold uppercase tracking-tight text-lg">
            Each post can generate <span className="text-primary">$40-$400</span> per day depending on the niche and how many groups you post in. Here's the math:
        </p>
        <ul className="space-y-4">
            <li className="flex items-center gap-4 text-zinc-300 font-bold">
                <CheckCircle2 className="w-6 h-6 text-primary shrink-0" />
                Post in 5 groups per day = 5 posts. If each post makes $50/day, that's $250/day total!
            </li>
            <li className="flex items-center gap-4 text-zinc-300 font-bold">
                <CheckCircle2 className="w-6 h-6 text-primary shrink-0" />
                Do this for 30 days = $7,500/month. Just from copying and pasting!
            </li>
            <li className="flex items-center gap-4 text-zinc-300 font-bold">
                <CheckCircle2 className="w-6 h-6 text-primary shrink-0" />
                The more groups you join and post in, the more money you make. It's that simple!
            </li>
        </ul>
      </Card>

      {/* Form Section */}
      <div className="space-y-10">
        <h2 className="text-4xl font-black text-white uppercase italic tracking-tighter text-center">Get Your Posts Now</h2>
        
        <Card className="glass-strong border-2 border-primary/20 bg-[#111111] overflow-hidden rounded-4xl">
            <CardContent className="p-10 md:p-14 space-y-12">
                {/* Step 1: Niche */}
                <div className="space-y-6">
                    <Label className="text-xl font-black text-white uppercase italic tracking-tighter">Step 1: Choose Your Niche</Label>
                    <div className="flex flex-wrap gap-3">
                        {niches.map((niche) => (
                            <button
                                key={niche}
                                className={`px-6 py-3 rounded-xl text-sm font-black uppercase italic tracking-wider transition-all duration-300 border-2 ${
                                    niche === "All Niches" 
                                    ? "bg-primary text-black border-primary shadow-[0_4px_15px_rgba(179,255,0,0.3)]" 
                                    : "bg-background border-white/5 text-zinc-500 hover:border-primary/50 hover:text-white"
                                }`}
                            >
                                {niche}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Info Box */}
                <div className="bg-blue-600/10 border border-blue-600/20 rounded-3xl p-8 space-y-6">
                    <div className="flex items-center gap-3 text-blue-400">
                        <CheckCircle2 className="w-5 h-5" />
                        <span className="font-black uppercase tracking-widest text-sm italic">Where to Get Your Affiliate Link</span>
                    </div>
                    <p className="text-zinc-300 text-sm font-medium">
                        We recommend using <Link href="#" className="text-blue-400 font-bold hover:underline">DigiStore24</Link> - a free affiliate marketplace where you can find thousands of products to promote and earn commissions.
                    </p>
                    <div className="space-y-4">
                        <p className="font-bold text-white uppercase text-xs tracking-widest">How to Get Started (3 Easy Steps):</p>
                        <ol className="space-y-3 text-sm text-zinc-400 font-bold">
                            <li className="flex gap-4"><span className="text-blue-400">1.</span> Go to <Link href="#" className="text-blue-400 underline">digistore24.com</Link> and create a FREE account (takes 2 minutes)</li>
                            <li className="flex gap-4"><span className="text-blue-400">2.</span> Browse products in your chosen niche above and click "Promote" on any product</li>
                            <li className="flex gap-4"><span className="text-blue-400">3.</span> Copy your unique affiliate link and paste it in the box below</li>
                        </ol>
                    </div>
                    <Button variant="outline" className="w-full h-14 border-blue-600/30 bg-blue-600/5 hover:bg-blue-600/10 text-blue-400 font-black uppercase italic rounded-2xl">
                        Create Free DigiStore24 Account →
                    </Button>
                </div>

                {/* Step 2: Link */}
                <div className="space-y-6">
                    <div className="space-y-2">
                        <Label className="text-xl font-black text-white uppercase italic tracking-tighter">Step 2: Enter Your Affiliate Link</Label>
                        <Input 
                            placeholder="https://your-affiliate-link.com" 
                            className="h-16 bg-[#161616] border-2 border-white/5 focus:border-primary/50 rounded-2xl text-lg font-bold text-white placeholder:text-zinc-700"
                        />
                    </div>
                    <p className="text-zinc-500 text-sm font-bold uppercase tracking-tight italic">We'll automatically add your link to all the posts below</p>
                </div>

                {/* Submit */}
                <Button className="w-full h-24 bg-primary hover:bg-[#c4ff33] text-black font-black text-3xl md:text-4xl uppercase italic tracking-tighter rounded-4xl shadow-[0_15px_40px_rgba(179,255,0,0.25)] transition-all duration-300 hover:scale-[1.02] flex items-center justify-center gap-4">
                    <MousePointer2 className="w-10 h-10 rotate-[-15deg] fill-black" />
                    Show Me My 50 Posts!
                </Button>
            </CardContent>
        </Card>
      </div>
    </div>
  )
}
