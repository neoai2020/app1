"use client"
import React from "react"
import { TrendingUp, Play, MousePointer2, ArrowRight, Video, Target, Link2, ExternalLink, Info } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Progress } from "../../../components/ui/progress"
import Link from "next/link"

export default function AutopilotPage() {
  const niches = [
    "All", "Weight Loss", "Make Money Online", "Health & Fitness",
    "Tech & Gadgets", "Beauty & Skincare", "Relationships", "Pets", "Home & Garden"
  ]

  const [activeNiche, setActiveNiche] = React.useState("All")

  const allTrafficSources = [
    // Weight Loss
    { name: "MyFitnessPal Community", type: "Forum", difficulty: "Easy", traffic: "200-500 visitors/month", time: "10 min", niche: "Weight Loss" },
    { name: "SparkPeople Forums", type: "Forum", difficulty: "Easy", traffic: "150-400 visitors/month", time: "10 min", niche: "Weight Loss" },
    { name: "3FatChicks Forum", type: "Forum", difficulty: "Easy", traffic: "100-300 visitors/month", time: "8 min", niche: "Weight Loss" },
    { name: "LoseIt! Reddit Community", type: "Social", difficulty: "Easy", traffic: "300-800 visitors/month", time: "5 min", niche: "Weight Loss" },
    { name: "Fitness.com Forums", type: "Forum", difficulty: "Medium", traffic: "100-250 visitors/month", time: "12 min", niche: "Weight Loss" },
    { name: "Weight Watchers Connect", type: "Social", difficulty: "Easy", traffic: "500-1k visitors/month", time: "15 min", niche: "Weight Loss" },
    { name: "MyNetDiary Forum", type: "Forum", difficulty: "Easy", traffic: "50-150 visitors/month", time: "10 min", niche: "Weight Loss" },
    { name: "Eat This Much Community", type: "Social", difficulty: "Easy", traffic: "100-200 visitors/month", time: "5 min", niche: "Weight Loss" },
    { name: "Healthy Wage Community", type: "Social", difficulty: "Easy", traffic: "80-160 visitors/month", time: "10 min", niche: "Weight Loss" },
    { name: "T-Nation Forums", type: "Forum", difficulty: "Hard", traffic: "400-900 visitors/month", time: "20 min", niche: "Weight Loss" },
    
    // MMO
    { name: "Warrior Forum", type: "Forum", difficulty: "Medium", traffic: "500-1.2k visitors/month", time: "15 min", niche: "Make Money Online" },
    { name: "BlackHatWorld", type: "Forum", difficulty: "Hard", traffic: "1k-3k visitors/month", time: "25 min", niche: "Make Money Online" },
    { name: "Digital Point", type: "Forum", difficulty: "Medium", traffic: "400-900 visitors/month", time: "12 min", niche: "Make Money Online" },
    { name: "WickedFire", type: "Forum", difficulty: "Hard", traffic: "300-700 visitors/month", time: "30 min", niche: "Make Money Online" },
    { name: "AffLift Community", type: "Forum", difficulty: "Medium", traffic: "200-500 visitors/month", time: "15 min", niche: "Make Money Online" },
    { name: "STM Forum", type: "Forum", difficulty: "Hard", traffic: "150-400 visitors/month", time: "20 min", niche: "Make Money Online" },
    { name: "Builder Society", type: "Forum", difficulty: "Medium", traffic: "100-300 visitors/month", time: "15 min", niche: "Make Money Online" },
    { name: "Offervault Community", type: "Social", difficulty: "Easy", traffic: "200-400 visitors/month", time: "10 min", niche: "Make Money Online" },
    { name: "CPAelites", type: "Forum", difficulty: "Medium", traffic: "100-250 visitors/month", time: "12 min", niche: "Make Money Online" },
    { name: "BestBlackHatForum", type: "Forum", difficulty: "Hard", traffic: "150-300 visitors/month", time: "20 min", niche: "Make Money Online" },
    
    // Health & Fitness
    { name: "Bodybuilding.com Forums", type: "Forum", difficulty: "Medium", traffic: "1k-5k visitors/month", time: "15 min", niche: "Health & Fitness" },
    { name: "Muscle & Strength Forum", type: "Forum", difficulty: "Medium", traffic: "300-700 visitors/month", time: "10 min", niche: "Health & Fitness" },
    { name: "IronMag Forums", type: "Forum", difficulty: "Hard", traffic: "200-500 visitors/month", time: "20 min", niche: "Health & Fitness" },
    { name: "Steroidology Forums", type: "Forum", difficulty: "Hard", traffic: "150-400 visitors/month", time: "25 min", niche: "Health & Fitness" },
    { name: "Reddit r/Fitness", type: "Social", difficulty: "Medium", traffic: "2k-10k visitors/month", time: "10 min", niche: "Health & Fitness" },
    { name: "Reddit r/Bodyweightfitness", type: "Social", difficulty: "Medium", traffic: "1k-4k visitors/month", time: "10 min", niche: "Health & Fitness" },
    { name: "CrossFit Community", type: "Social", difficulty: "Medium", traffic: "500-1k visitors/month", time: "15 min", niche: "Health & Fitness" },
    { name: "Vegan Fitness Forum", type: "Forum", difficulty: "Easy", traffic: "100-300 visitors/month", time: "10 min", niche: "Health & Fitness" },
    { name: "Yoga Forums", type: "Forum", difficulty: "Easy", traffic: "200-500 visitors/month", time: "10 min", niche: "Health & Fitness" },
    { name: "PaleoHacks", type: "Forum", difficulty: "Medium", traffic: "300-600 visitors/month", time: "15 min", niche: "Health & Fitness" },

    // Tech & Gadgets
    { name: "XDA Developers", type: "Forum", difficulty: "Hard", traffic: "2k-8k visitors/month", time: "20 min", niche: "Tech & Gadgets" },
    { name: "MacRumors Forums", type: "Forum", difficulty: "Medium", traffic: "1.5k-4k visitors/month", time: "15 min", niche: "Tech & Gadgets" },
    { name: "AnandTech Forums", type: "Forum", difficulty: "Hard", traffic: "800-2k visitors/month", time: "25 min", niche: "Tech & Gadgets" },
    { name: "Tom's Hardware Forum", type: "Forum", difficulty: "Medium", traffic: "2k-6k visitors/month", time: "15 min", niche: "Tech & Gadgets" },
    { name: "Reddit r/Technology", type: "Social", difficulty: "Medium", traffic: "5k-20k visitors/month", time: "5 min", niche: "Tech & Gadgets" },
    { name: "TechPowerUp Forums", type: "Forum", difficulty: "Hard", traffic: "400-1k visitors/month", time: "20 min", niche: "Tech & Gadgets" },
    { name: "Linus Tech Tips Forum", type: "Forum", difficulty: "Medium", traffic: "1k-3k visitors/month", time: "15 min", niche: "Tech & Gadgets" },
    { name: "Overclock.net", type: "Forum", difficulty: "Hard", traffic: "600-1.5k visitors/month", time: "30 min", niche: "Tech & Gadgets" },
    { name: "HardForum", type: "Forum", difficulty: "Hard", traffic: "300-800 visitors/month", time: "25 min", niche: "Tech & Gadgets" },
    { name: "Stack Overflow", type: "Social", difficulty: "Hard", traffic: "10k+ visitors/month", time: "30 min", niche: "Tech & Gadgets" },

    // Beauty & Skincare
    { name: "MakeupAlley", type: "Forum", difficulty: "Medium", traffic: "1k-3k visitors/month", time: "15 min", niche: "Beauty & Skincare" },
    { name: "Reddit r/SkincareAddiction", type: "Social", difficulty: "Medium", traffic: "2k-7k visitors/month", time: "10 min", niche: "Beauty & Skincare" },
    { name: "Reddit r/MakeupAddiction", type: "Social", difficulty: "Medium", traffic: "1.5k-5k visitors/month", time: "10 min", niche: "Beauty & Skincare" },
    { name: "BeautyTalk (Sephora)", type: "Forum", difficulty: "Easy", traffic: "3k-10k visitors/month", time: "10 min", niche: "Beauty & Skincare" },
    { name: "Fragrantica Club", type: "Forum", difficulty: "Medium", traffic: "500-1.5k visitors/month", time: "15 min", niche: "Beauty & Skincare" },
    { name: "Basenotes Forum", type: "Forum", difficulty: "Hard", traffic: "200-600 visitors/month", time: "20 min", niche: "Beauty & Skincare" },
    { name: "Specktra Net", type: "Forum", difficulty: "Medium", traffic: "100-400 visitors/month", time: "15 min", niche: "Beauty & Skincare" },
    { name: "Curated Beauty Hub", type: "Directory", difficulty: "Easy", traffic: "50-200 visitors/month", time: "5 min", niche: "Beauty & Skincare" },
    { name: "SkinCarity Community", type: "Social", difficulty: "Easy", traffic: "80-150 visitors/month", time: "10 min", niche: "Beauty & Skincare" },
    { name: "The Beauty Brains", type: "Forum", difficulty: "Medium", traffic: "200-500 visitors/month", time: "15 min", niche: "Beauty & Skincare" },

    // Relationships
    { name: "TalkAboutMarriage", type: "Forum", difficulty: "Medium", traffic: "400-1k visitors/month", time: "20 min", niche: "Relationships" },
    { name: "Reddit r/Relationships", type: "Social", difficulty: "Medium", traffic: "3k-12k visitors/month", time: "10 min", niche: "Relationships" },
    { name: "LoveShack.org", type: "Forum", difficulty: "Hard", traffic: "500-1.2k visitors/month", time: "25 min", niche: "Relationships" },
    { name: "E-Harmony Community", type: "Social", difficulty: "Easy", traffic: "200-600 visitors/month", time: "10 min", niche: "Relationships" },
    { name: "WeddingWire Forums", type: "Forum", difficulty: "Easy", traffic: "1k-4k visitors/month", time: "15 min", niche: "Relationships" },
    { name: "The Knot Forums", type: "Forum", difficulty: "Easy", traffic: "2k-6k visitors/month", time: "15 min", niche: "Relationships" },
    { name: "Dating Advice Forum", type: "Forum", difficulty: "Medium", traffic: "100-300 visitors/month", time: "12 min", niche: "Relationships" },
    { name: "SingleParent Forum", type: "Forum", difficulty: "Easy", traffic: "80-250 visitors/month", time: "10 min", niche: "Relationships" },
    { name: "Breakup Recovery Hub", type: "Forum", difficulty: "Medium", traffic: "150-400 visitors/month", time: "15 min", niche: "Relationships" },
    { name: "Family Matters Board", type: "Forum", difficulty: "Medium", traffic: "100-200 visitors/month", time: "15 min", niche: "Relationships" },

    // Pets
    { name: "Petforums.co.uk", type: "Forum", difficulty: "Easy", traffic: "500-1.5k visitors/month", time: "15 min", niche: "Pets" },
    { name: "TheCatSite Forums", type: "Forum", difficulty: "Medium", traffic: "1k-3k visitors/month", time: "15 min", niche: "Pets" },
    { name: "DogForum", type: "Forum", difficulty: "Medium", traffic: "800-2k visitors/month", time: "12 min", niche: "Pets" },
    { name: "Reddit r/Pets", type: "Social", difficulty: "Easy", traffic: "2k-6k visitors/month", time: "5 min", niche: "Pets" },
    { name: "FishLore Forums", type: "Forum", difficulty: "Medium", traffic: "400-1k visitors/month", time: "20 min", niche: "Pets" },
    { name: "Parrot Forums", type: "Forum", difficulty: "Hard", traffic: "100-300 visitors/month", time: "25 min", niche: "Pets" },
    { name: "Reptile Forums", type: "Forum", difficulty: "Hard", traffic: "150-400 visitors/month", time: "20 min", niche: "Pets" },
    { name: "Hamster Central", type: "Forum", difficulty: "Easy", traffic: "50-150 visitors/month", time: "10 min", niche: "Pets" },
    { name: "Horse Forum", type: "Forum", difficulty: "Medium", traffic: "300-800 visitors/month", time: "20 min", niche: "Pets" },
    { name: "Guinea Pig Cages Forum", type: "Forum", difficulty: "Easy", traffic: "100-300 visitors/month", time: "15 min", niche: "Pets" },

    // Home & Garden
    { name: "Houzz Community", type: "Social", difficulty: "Easy", traffic: "5k-20k visitors/month", time: "10 min", niche: "Home & Garden" },
    { name: "GardenWeb Forums", type: "Forum", difficulty: "Medium", traffic: "2k-6k visitors/month", time: "15 min", niche: "Home & Garden" },
    { name: "DoItYourself Forums", type: "Forum", difficulty: "Medium", traffic: "1.5k-4k visitors/month", time: "20 min", niche: "Home & Garden" },
    { name: "Reddit r/Gardening", type: "Social", difficulty: "Easy", traffic: "3k-10k visitors/month", time: "5 min", niche: "Home & Garden" },
    { name: "Apartment Therapy", type: "Social", difficulty: "Easy", traffic: "4k-15k visitors/month", time: "10 min", niche: "Home & Garden" },
    { name: "Dwell Community", type: "Social", difficulty: "Medium", traffic: "1k-3k visitors/month", time: "15 min", niche: "Home & Garden" },
    { name: "HomeTalk", type: "Social", difficulty: "Easy", traffic: "2k-8k visitors/month", time: "10 min", niche: "Home & Garden" },
    { name: "Practical Machinist", type: "Forum", difficulty: "Hard", traffic: "200-600 visitors/month", time: "25 min", niche: "Home & Garden" },
    { name: "Permies.com", type: "Forum", difficulty: "Medium", traffic: "300-800 visitors/month", time: "20 min", niche: "Home & Garden" },
    { name: "Woodworking Talk", type: "Forum", difficulty: "Medium", traffic: "400-1k visitors/month", time: "15 min", niche: "Home & Garden" },

    // General & Directories
    { name: "Quora Spaces", type: "Social", difficulty: "Easy", traffic: "10k+ visitors/month", time: "5 min", niche: "General" },
    { name: "Pinterest Boards", type: "Social", difficulty: "Easy", traffic: "10k+ visitors/month", time: "5 min", niche: "General" },
    { name: "Tumblr Niche Blogs", type: "Social", difficulty: "Easy", traffic: "5k-15k visitors/month", time: "10 min", niche: "General" },
    { name: "Medium Publications", type: "Social", difficulty: "Medium", traffic: "3k-8k visitors/month", time: "20 min", niche: "General" },
    { name: "AlternativeTo Community", type: "Social", difficulty: "Easy", traffic: "2k-5k visitors/month", time: "10 min", niche: "Tech & Gadgets" },
    { name: "Behance Projects", type: "Social", difficulty: "Medium", traffic: "2k-6k visitors/month", time: "20 min", niche: "General" },
    { name: "Dribbble Shots", type: "Social", difficulty: "Hard", traffic: "1k-4k visitors/month", time: "20 min", niche: "General" },
    { name: "Instructables Guide", type: "Forum", difficulty: "Medium", traffic: "2k-7k visitors/month", time: "25 min", niche: "General" },
    { name: "WikiHow Contributions", type: "Forum", difficulty: "Hard", traffic: "5k-15k visitors/month", time: "40 min", niche: "General" },
    { name: "HubPages Articles", type: "Social", difficulty: "Medium", traffic: "1k-3k visitors/month", time: "30 min", niche: "General" },
    { name: "Blogger Communities", type: "Social", difficulty: "Easy", traffic: "500-2k visitors/month", time: "15 min", niche: "General" },
    { name: "Ghost Publications", type: "Social", difficulty: "Medium", traffic: "200-800 visitors/month", time: "20 min", niche: "General" },
    { name: "Substack Directories", type: "Directory", difficulty: "Easy", traffic: "300-1.2k visitors/month", time: "10 min", niche: "General" },
    { name: "Digg Community", type: "Social", difficulty: "Easy", traffic: "1k-3k visitors/month", time: "5 min", niche: "General" },
    { name: "Mix.com Boards", type: "Social", difficulty: "Easy", traffic: "400-1.5k visitors/month", time: "5 min", niche: "General" },
    { name: "Fark Communities", type: "Forum", difficulty: "Medium", traffic: "300-1k visitors/month", time: "15 min", niche: "General" },
    { name: "GrowthHackers", type: "Social", difficulty: "Medium", traffic: "500-2k visitors/month", time: "15 min", niche: "Make Money Online" },
    { name: "Indie Hackers", type: "Social", difficulty: "Hard", traffic: "1k-4k visitors/month", time: "20 min", niche: "Tech & Gadgets" },
    { name: "Product Hunt", type: "Social", difficulty: "Hard", traffic: "5k-15k visitors/month", time: "30 min", niche: "Tech & Gadgets" },
    { name: "Hacker News", type: "Social", difficulty: "Hard", traffic: "10k+ visitors/month", time: "10 min", niche: "Tech & Gadgets" },
    { name: "DZone Communities", type: "Social", difficulty: "Hard", traffic: "1k-3k visitors/month", time: "20 min", niche: "Tech & Gadgets" },
    { name: "TechDirt Labs", type: "Forum", difficulty: "Hard", traffic: "500-1.5k visitors/month", time: "20 min", niche: "Tech & Gadgets" }
  ]

  const trafficSources = allTrafficSources.filter(s => 
    activeNiche === "All" || s.niche === activeNiche || (activeNiche === "General" && s.niche === "General")
  )

  return (
    <div className="max-w-[1400px] mx-auto p-4 md:p-10 space-y-12 pb-20">
      {/* Back Button */}
      <Link href="/dashboard" className="inline-flex items-center gap-2 text-zinc-500 hover:text-white transition-colors text-sm font-bold uppercase tracking-widest">
        <ArrowRight className="w-4 h-4 rotate-180" />
        Back to Dashboard
      </Link>

      {/* Hero Header */}
      <div className="bg-[#0b1a14] border-2 border-primary/20 rounded-4xl p-12 md:p-20 text-center space-y-8 relative overflow-hidden group">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-1 bg-linear-to-r from-transparent via-primary/50 to-transparent" />
        <div className="flex justify-center">
            <div className="w-20 h-20 rounded-3xl bg-primary flex items-center justify-center shadow-[0_0_50px_rgba(179,255,0,0.3)] group-hover:scale-110 transition-transform duration-500">
                <TrendingUp className="w-12 h-12 text-black" />
            </div>
        </div>
        <div className="space-y-4 max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-7xl font-black text-white uppercase italic tracking-tighter leading-none">
                Automated Income - <span className="text-primary italic">Traffic On Autopilot</span>
            </h1>
            <p className="text-lg md:text-2xl text-primary font-black uppercase tracking-[0.2em]">
                100+ Free Traffic Sources - Submit Once, Get Traffic Forever
            </p>
            <p className="text-zinc-500 font-bold max-w-2xl mx-auto leading-relaxed uppercase text-sm tracking-tight px-4 transition-all">
                Stop chasing traffic every day. Submit your link to these 100+ sites ONCE and 
                get ongoing traffic automatically. Our members have generated over 2.8 million 
                visitors using these sources.
            </p>
        </div>
      </div>

      {/* Video Training */}
      <Card className="glass-strong border-2 border-white/5 bg-[#111111] overflow-hidden rounded-4xl">
        <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="aspect-video bg-zinc-900 relative group cursor-pointer overflow-hidden">
                <img 
                    src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1074&auto=format&fit=crop" 
                    className="w-full h-full object-cover opacity-30 group-hover:scale-105 transition-transform duration-700"
                    alt="Tutorial Thumbnail"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="flex flex-col items-center gap-4">
                        <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center shadow-[0_0_30px_rgba(179,255,0,0.3)] group-hover:scale-110 transition-transform">
                            <Play className="w-7 h-7 text-black fill-black ml-1" />
                        </div>
                        <span className="text-white font-black uppercase tracking-widest text-sm drop-shadow-lg">Watch Automated Income Tutorial</span>
                    </div>
                </div>
            </div>
            <div className="p-10 flex flex-col justify-center space-y-6 bg-white/2">
                <div className="flex items-center gap-3">
                    <Video className="w-5 h-5 text-primary" />
                    <span className="text-primary font-black uppercase tracking-[0.2em] text-xs">Watch First</span>
                </div>
                <h2 className="text-3xl font-black text-white uppercase italic leading-tight tracking-tighter">
                    How to Use Automated Income
                </h2>
                <p className="text-zinc-400 font-medium leading-relaxed">
                    Watch this quick tutorial to learn how to submit your link to these 100+ traffic sources and get automated traffic forever!
                </p>
            </div>
        </div>
      </Card>

      {/* How This Works */}
      <Card className="glass-strong border border-white/5 bg-[#111111] rounded-4xl p-10 space-y-12">
        <div className="flex items-center gap-4">
            <Target className="w-8 h-8 text-primary" />
            <h2 className="text-3xl font-black text-white uppercase italic tracking-tighter">How This Works (Super Simple!)</h2>
        </div>

        <div className="grid grid-cols-1 gap-10">
            {/* The Secret Section */}
            <div className="bg-[#0b171c] border-2 border-primary/10 rounded-3xl p-8 space-y-6">
                <h3 className="text-xl font-black text-white uppercase italic">The Secret To Automated Traffic:</h3>
                <div className="space-y-4 text-zinc-400 font-medium">
                    <p>Most people waste hours every day posting on social media for traffic.</p>
                    <p>But what if you could submit your link ONCE and get traffic for months or even YEARS?</p>
                    <p className="text-primary font-black italic">
                        That's exactly what these traffic sources do. You submit once, and they send you visitors automatically - no daily work required!
                    </p>
                </div>
            </div>

            {/* Steps Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                    { id: 1, title: "Pick Your Niche", desc: "Choose your niche below and get 100+ traffic sources specifically for your market." },
                    { id: 2, title: "Submit Your Link", desc: "Follow the simple step-by-step instructions to submit your link to each site. Takes 5-15 minutes per site." },
                    { id: 3, title: "Get Automatic Traffic", desc: "Once submitted, these sites send you traffic automatically. No daily work needed!" }
                ].map((step) => (
                    <Card key={step.id} className="bg-white/5 border-none p-8 space-y-4 hover:bg-white/8 transition-colors group">
                        <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-black font-black text-xl group-hover:scale-110 transition-transform">
                            {step.id}
                        </div>
                        <h4 className="text-lg font-black text-white uppercase italic tracking-tighter">{step.title}</h4>
                        <p className="text-zinc-500 text-sm font-medium leading-relaxed">{step.desc}</p>
                    </Card>
                ))}
            </div>

            {/* Pro Tip */}
            <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-2xl p-6 flex gap-4 items-start">
                <Info className="w-6 h-6 text-yellow-500 mt-1 shrink-0" />
                <p className="text-zinc-300 font-bold text-sm">
                    <span className="text-yellow-500 uppercase tracking-widest pr-2">Pro Tip:</span> 
                    Set aside 2-3 hours and submit to as many sources as possible. The more you submit to, the more automatic traffic you get. Most members submit to 50+ sources in their first week!
                </p>
            </div>
        </div>
      </Card>

      {/* URL Entry Section */}
      <Card className="glass border-2 border-white/5 bg-[#111111] rounded-4xl p-10 md:p-14 space-y-10">
        <div className="space-y-6">
            <div className="space-y-3">
                <Label className="text-xl font-black text-white uppercase italic tracking-tighter flex items-center gap-2">
                    <Link2 className="w-6 h-6 text-primary" />
                    Enter Your Page URL:
                </Label>
                <Input 
                    placeholder="https://your-page-url.com" 
                    className="h-16 bg-[#161616] border-2 border-white/5 focus:border-primary/50 rounded-2xl text-lg font-bold text-white placeholder:text-zinc-700"
                />
            </div>
            <p className="text-zinc-500 text-sm font-bold uppercase tracking-tight italic">This is the page you want to promote. We'll automatically insert it in all the submission descriptions below.</p>
        </div>

        {/* Niche Selector */}
        <div className="flex flex-wrap gap-3">
            {niches.map((niche) => (
                <button
                    key={niche}
                    onClick={() => setActiveNiche(niche)}
                    className={`px-6 py-3 rounded-xl text-xs font-black uppercase italic tracking-wider transition-all duration-300 border-2 ${
                        niche === activeNiche 
                        ? "bg-primary text-black border-primary shadow-[0_4px_15px_rgba(179,255,0,0.3)]" 
                        : "bg-background border-white/5 text-zinc-500 hover:border-primary/50 hover:text-white"
                    }`}
                >
                    {niche}
                </button>
            ))}
        </div>
      </Card>

      {/* Progress Section */}
      <Card className="glass-strong border-2 border-primary/20 bg-[#111111] rounded-4xl p-10 space-y-8">
        <div className="flex justify-between items-end">
            <div className="space-y-1 text-zinc-100 italic">
                <h3 className="text-2xl font-black uppercase tracking-tighter">Your Progress:</h3>
                <p className="text-zinc-500 font-bold text-sm uppercase">0 of {allTrafficSources.length} sources completed</p>
            </div>
            <div className="text-right italic">
                <span className="text-4xl font-black text-primary leading-none">0%</span>
                <p className="text-zinc-500 font-bold text-xs uppercase tracking-widest">Complete</p>
            </div>
        </div>
        <Progress value={0} className="h-4 bg-white/5 border border-white/5" indicatorClassName="bg-primary shadow-[0_0_15px_rgba(179,255,0,0.5)]" />
      </Card>

      {/* Sources Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {trafficSources.map((source, idx) => (
            <Card key={idx} className="glass border border-white/5 bg-[#111111] rounded-3xl p-6 hover:bg-white/5 transition-all duration-300 hover:scale-[1.02] hover:border-primary/30 group">
                <CardHeader className="p-0 pb-6 space-y-4">
                    <div className="flex gap-2">
                        <span className="px-3 py-1 bg-blue-500/10 text-blue-400 text-[10px] font-black uppercase tracking-widest rounded-full">{source.type}</span>
                        <span className="px-3 py-1 bg-primary/10 text-primary text-[10px] font-black uppercase tracking-widest rounded-full">{source.difficulty}</span>
                    </div>
                    <CardTitle className="text-xl font-black text-white uppercase italic tracking-tighter leading-tight group-hover:text-primary transition-colors">
                        {source.name}
                    </CardTitle>
                </CardHeader>
                <CardContent className="p-0 space-y-6">
                    <div className="space-y-3">
                        <div className="flex items-center gap-3 text-zinc-400">
                            <TrendingUp className="w-4 h-4 text-primary" />
                            <span className="text-xs font-bold uppercase tracking-tight">Traffic: <span className="text-white">{source.traffic}</span></span>
                        </div>
                        <div className="flex items-center gap-3 text-zinc-400">
                            <Play className="w-4 h-4 text-primary" />
                            <span className="text-xs font-bold uppercase tracking-tight">Time: <span className="text-white">{source.time}</span></span>
                        </div>
                    </div>
                    <Button className="w-full h-12 bg-primary hover:bg-[#c4ff33] text-black font-black uppercase italic tracking-wider rounded-xl transition-all">
                        <ExternalLink className="w-4 h-4 mr-2" />
                        View Instructions
                    </Button>
                </CardContent>
            </Card>
        ))}
      </div>
    </div>
  )
}
