"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { ArrowLeft, TrendingUp, CheckCircle2, ExternalLink, Clock, Users } from "lucide-react"
import Link from "next/link"

interface TrafficSource {
  id: string
  name: string
  url: string
  category: string
  niche: string
  trafficPotential: string
  timeToComplete: string
  difficulty: "Easy" | "Medium"
  instructions: string[]
  submissionDescription: string
}

const trafficSources: TrafficSource[] = [
  // Weight Loss Sources
  {
    id: "wl1",
    name: "MyFitnessPal Community",
    url: "https://community.myfitnesspal.com",
    category: "Forum",
    niche: "Weight Loss",
    trafficPotential: "200-500 visitors/month",
    timeToComplete: "10 minutes",
    difficulty: "Easy",
    instructions: [
      "Go to community.myfitnesspal.com and create a free account",
      "Complete your profile with a photo and bio",
      "Go to Settings → Signature and add your link with the description below",
      "Make 3-5 helpful posts in the 'Success Stories' or 'Motivation' sections",
      "Your signature with your link appears on every post automatically",
      "Continue posting 2-3 times per week for ongoing traffic",
    ],
    submissionDescription:
      "🎯 Struggling to lose weight? I found this system that helped me drop 30 pounds: [YOUR_LINK]",
  },
  {
    id: "wl2",
    name: "SparkPeople Forums",
    url: "https://www.sparkpeople.com/mypage_public_journal_individual.asp",
    category: "Forum",
    niche: "Weight Loss",
    trafficPotential: "150-400 visitors/month",
    timeToComplete: "10 minutes",
    difficulty: "Easy",
    instructions: [
      "Create free account at sparkpeople.com",
      "Set up your profile and add a profile picture",
      "Go to your profile settings and add the description below to your 'About Me'",
      "Join 3-5 active groups related to weight loss",
      "Post helpful comments and share your journey",
      "Your profile link is visible on all your posts and comments",
    ],
    submissionDescription: "My weight loss journey: [YOUR_LINK] - Check out what's working for me!",
  },
  {
    id: "wl3",
    name: "3FatChicks Forum",
    url: "https://www.3fatchicks.com/forum/",
    category: "Forum",
    niche: "Weight Loss",
    trafficPotential: "100-300 visitors/month",
    timeToComplete: "8 minutes",
    difficulty: "Easy",
    instructions: [
      "Register at 3fatchicks.com/forum",
      "Complete your profile information",
      "Add your link to your signature in profile settings",
      "Post in the 'Success Stories' section sharing your progress",
      "Reply to other members' posts with encouragement",
      "Your signature appears automatically on all posts",
    ],
    submissionDescription: "This is what finally worked for me: [YOUR_LINK]",
  },
  {
    id: "wl4",
    name: "LoseIt! Reddit Community",
    url: "https://www.reddit.com/r/loseit/",
    category: "Social",
    niche: "Weight Loss",
    trafficPotential: "300-800 visitors/month",
    timeToComplete: "5 minutes",
    difficulty: "Easy",
    instructions: [
      "Create a Reddit account if you don't have one",
      "Join r/loseit subreddit",
      "Read the community rules carefully",
      "Post a success story or progress update (must be genuine and helpful)",
      "In your post, naturally mention your link as a resource that helped you",
      "Engage with comments on your post",
    ],
    submissionDescription:
      "After trying everything, this system finally worked: [YOUR_LINK] - Down 25 pounds in 8 weeks!",
  },
  {
    id: "wl5",
    name: "Weight Loss Buddy",
    url: "https://www.weightlossbuddy.com",
    category: "Directory",
    niche: "Weight Loss",
    trafficPotential: "80-200 visitors/month",
    timeToComplete: "7 minutes",
    difficulty: "Easy",
    instructions: [
      "Go to weightlossbuddy.com",
      "Click 'Add Your Site' or 'Submit Resource'",
      "Fill out the submission form with your page details",
      "Use the description provided below",
      "Add relevant tags: weight loss, diet, fitness",
      "Submit and wait for approval (usually 24-48 hours)",
    ],
    submissionDescription:
      "Proven weight loss system that helped thousands lose 20-50 pounds. Step-by-step guide with meal plans and workouts. [YOUR_LINK]",
  },

  // Make Money Online Sources
  {
    id: "mmo1",
    name: "Warrior Forum",
    url: "https://www.warriorforum.com",
    category: "Forum",
    niche: "Make Money Online",
    trafficPotential: "400-1000 visitors/month",
    timeToComplete: "12 minutes",
    difficulty: "Medium",
    instructions: [
      "Create account at warriorforum.com",
      "Complete your profile with professional details",
      "Make 5 helpful posts in various sections (required before adding signature)",
      "Go to Settings → Edit Signature and add your link",
      "Continue posting valuable content in 'Main Internet Marketing Discussion'",
      "Your signature appears on all posts automatically",
    ],
    submissionDescription: "💰 How I went from $0 to $5K/month: [YOUR_LINK]",
  },
  {
    id: "mmo2",
    name: "BlackHatWorld Forum",
    url: "https://www.blackhatworld.com",
    category: "Forum",
    niche: "Make Money Online",
    trafficPotential: "500-1200 visitors/month",
    timeToComplete: "15 minutes",
    difficulty: "Medium",
    instructions: [
      "Register at blackhatworld.com",
      "Verify your email and complete profile",
      "Read forum rules carefully",
      "Make 10 quality posts (forum requirement)",
      "Add signature with your link in profile settings",
      "Post in 'Making Money' section regularly",
    ],
    submissionDescription: "My proven system for online income: [YOUR_LINK] - Real results, no BS",
  },
  {
    id: "mmo3",
    name: "r/Entrepreneur Subreddit",
    url: "https://www.reddit.com/r/Entrepreneur/",
    category: "Social",
    niche: "Make Money Online",
    trafficPotential: "600-1500 visitors/month",
    timeToComplete: "8 minutes",
    difficulty: "Easy",
    instructions: [
      "Join r/Entrepreneur on Reddit",
      "Read community guidelines",
      "Post a valuable case study or success story",
      "Include your link naturally in the post as a resource",
      "Respond to all comments professionally",
      "Post updates monthly to maintain visibility",
    ],
    submissionDescription:
      "Case Study: How I built a $10K/month online business in 90 days - [YOUR_LINK] - Full breakdown inside",
  },
  {
    id: "mmo4",
    name: "Digital Point Forums",
    url: "https://forums.digitalpoint.com",
    category: "Forum",
    niche: "Make Money Online",
    trafficPotential: "200-600 visitors/month",
    timeToComplete: "10 minutes",
    difficulty: "Easy",
    instructions: [
      "Create account at forums.digitalpoint.com",
      "Set up profile with professional information",
      "Add signature with your link",
      "Post in 'Business' and 'Monetization' sections",
      "Share genuine insights and experiences",
      "Signature appears on all your posts",
    ],
    submissionDescription: "This changed my online business: [YOUR_LINK]",
  },
  {
    id: "mmo5",
    name: "Indie Hackers",
    url: "https://www.indiehackers.com",
    category: "Community",
    niche: "Make Money Online",
    trafficPotential: "300-800 visitors/month",
    timeToComplete: "12 minutes",
    difficulty: "Easy",
    instructions: [
      "Sign up at indiehackers.com",
      "Create your profile and add your project",
      "Write a detailed post about your journey",
      "Include your link in your profile and posts",
      "Engage with other members' posts",
      "Share monthly updates on your progress",
    ],
    submissionDescription: "Building in public: My journey to $5K MRR - [YOUR_LINK]",
  },

  // Health & Fitness Sources
  {
    id: "hf1",
    name: "Bodybuilding.com Forums",
    url: "https://forum.bodybuilding.com",
    category: "Forum",
    niche: "Health & Fitness",
    trafficPotential: "250-700 visitors/month",
    timeToComplete: "10 minutes",
    difficulty: "Easy",
    instructions: [
      "Register at forum.bodybuilding.com",
      "Complete your fitness profile",
      "Add signature with your link in settings",
      "Post in 'Training' and 'Nutrition' sections",
      "Share your fitness journey and tips",
      "Signature shows on all posts automatically",
    ],
    submissionDescription: "My fitness transformation guide: [YOUR_LINK]",
  },
  {
    id: "hf2",
    name: "r/Fitness Subreddit",
    url: "https://www.reddit.com/r/Fitness/",
    category: "Social",
    niche: "Health & Fitness",
    trafficPotential: "400-1000 visitors/month",
    timeToComplete: "7 minutes",
    difficulty: "Easy",
    instructions: [
      "Join r/Fitness on Reddit",
      "Read posting guidelines carefully",
      "Post a transformation story or workout guide",
      "Include your link as a resource in the post",
      "Respond to comments and questions",
      "Post progress updates regularly",
    ],
    submissionDescription: "6-month transformation results using this program: [YOUR_LINK]",
  },
  {
    id: "hf3",
    name: "FitnessBlender Community",
    url: "https://www.fitnessblender.com/community",
    category: "Forum",
    niche: "Health & Fitness",
    trafficPotential: "150-400 visitors/month",
    timeToComplete: "8 minutes",
    difficulty: "Easy",
    instructions: [
      "Create account at fitnessblender.com",
      "Set up your fitness profile",
      "Join community discussions",
      "Add your link to profile bio",
      "Post workout updates and progress",
      "Engage with other members regularly",
    ],
    submissionDescription: "My complete fitness system: [YOUR_LINK]",
  },

  // Tech & Gadgets Sources
  {
    id: "tech1",
    name: "Product Hunt",
    url: "https://www.producthunt.com",
    category: "Directory",
    niche: "Tech & Gadgets",
    trafficPotential: "500-2000 visitors/month",
    timeToComplete: "15 minutes",
    difficulty: "Medium",
    instructions: [
      "Create account at producthunt.com",
      "Build your profile with professional details",
      "Submit your product/resource",
      "Write compelling description using template below",
      "Add screenshots or demo video",
      "Engage with comments on launch day",
      "Share on social media for more upvotes",
    ],
    submissionDescription:
      "Revolutionary tech tool that saves 10+ hours per week. Simple setup, powerful results. [YOUR_LINK]",
  },
  {
    id: "tech2",
    name: "Hacker News",
    url: "https://news.ycombinator.com",
    category: "Social",
    niche: "Tech & Gadgets",
    trafficPotential: "300-1500 visitors/month",
    timeToComplete: "5 minutes",
    difficulty: "Medium",
    instructions: [
      "Create account at news.ycombinator.com",
      "Build karma by commenting on posts (need 50+ karma to submit)",
      "Submit your link with clear, honest title",
      "Use description below in your submission",
      "Respond to all comments professionally",
      "Best posting time: 8-10 AM EST on weekdays",
    ],
    submissionDescription: "Show HN: Tool that [specific benefit] - [YOUR_LINK]",
  },
  {
    id: "tech3",
    name: "r/Technology Subreddit",
    url: "https://www.reddit.com/r/technology/",
    category: "Social",
    niche: "Tech & Gadgets",
    trafficPotential: "400-1200 visitors/month",
    timeToComplete: "6 minutes",
    difficulty: "Easy",
    instructions: [
      "Join r/technology on Reddit",
      "Read subreddit rules",
      "Post tech news or resource related to your link",
      "Include your link in post or comments",
      "Engage with community discussions",
      "Post during peak hours (9 AM - 2 PM EST)",
    ],
    submissionDescription: "New tech solution for [problem]: [YOUR_LINK]",
  },

  // Beauty & Skincare Sources
  {
    id: "beauty1",
    name: "MakeupAlley",
    url: "https://www.makeupalley.com",
    category: "Community",
    niche: "Beauty & Skincare",
    trafficPotential: "200-600 visitors/month",
    timeToComplete: "10 minutes",
    difficulty: "Easy",
    instructions: [
      "Register at makeupalley.com",
      "Complete your beauty profile",
      "Add your link to profile bio",
      "Write product reviews",
      "Participate in forum discussions",
      "Your profile link shows on all activity",
    ],
    submissionDescription: "My complete skincare routine: [YOUR_LINK]",
  },
  {
    id: "beauty2",
    name: "r/SkincareAddiction",
    url: "https://www.reddit.com/r/SkincareAddiction/",
    category: "Social",
    niche: "Beauty & Skincare",
    trafficPotential: "350-900 visitors/month",
    timeToComplete: "7 minutes",
    difficulty: "Easy",
    instructions: [
      "Join r/SkincareAddiction",
      "Read community guidelines",
      "Post before/after photos or routine",
      "Include your link as a resource",
      "Answer questions in comments",
      "Post updates on your progress",
    ],
    submissionDescription: "My skin transformation using this system: [YOUR_LINK]",
  },

  // Relationships Sources
  {
    id: "rel1",
    name: "LoveShack Forums",
    url: "https://www.loveshack.org/forums/",
    category: "Forum",
    niche: "Relationships",
    trafficPotential: "150-400 visitors/month",
    timeToComplete: "10 minutes",
    difficulty: "Easy",
    instructions: [
      "Create account at loveshack.org",
      "Set up your profile",
      "Add signature with your link",
      "Post helpful advice in relationship sections",
      "Share your success story",
      "Signature appears on all posts",
    ],
    submissionDescription: "How I saved my relationship: [YOUR_LINK]",
  },
  {
    id: "rel2",
    name: "r/Relationships Subreddit",
    url: "https://www.reddit.com/r/relationships/",
    category: "Social",
    niche: "Relationships",
    trafficPotential: "300-800 visitors/month",
    timeToComplete: "6 minutes",
    difficulty: "Easy",
    instructions: [
      "Join r/relationships",
      "Read posting rules carefully",
      "Share relationship success story",
      "Include your link as helpful resource",
      "Engage with comments",
      "Be genuine and helpful",
    ],
    submissionDescription: "Update: This advice saved my marriage - [YOUR_LINK]",
  },

  // Pets Sources
  {
    id: "pet1",
    name: "Dog Forums",
    url: "https://www.dogforums.com",
    category: "Forum",
    niche: "Pets",
    trafficPotential: "120-350 visitors/month",
    timeToComplete: "8 minutes",
    difficulty: "Easy",
    instructions: [
      "Register at dogforums.com",
      "Complete pet profile",
      "Add signature with your link",
      "Post in training and care sections",
      "Share pet photos and stories",
      "Signature shows automatically",
    ],
    submissionDescription: "Dog training guide that worked for me: [YOUR_LINK]",
  },
  {
    id: "pet2",
    name: "r/Dogs Subreddit",
    url: "https://www.reddit.com/r/dogs/",
    category: "Social",
    niche: "Pets",
    trafficPotential: "250-700 visitors/month",
    timeToComplete: "6 minutes",
    difficulty: "Easy",
    instructions: [
      "Join r/dogs on Reddit",
      "Read community rules",
      "Post training success story",
      "Include your link as resource",
      "Answer questions from community",
      "Share progress updates",
    ],
    submissionDescription: "How I trained my dog in 30 days: [YOUR_LINK]",
  },

  // Home & Garden Sources
  {
    id: "home1",
    name: "GardenWeb Forums",
    url: "https://forums.gardenweb.com",
    category: "Forum",
    niche: "Home & Garden",
    trafficPotential: "100-300 visitors/month",
    timeToComplete: "9 minutes",
    difficulty: "Easy",
    instructions: [
      "Create account at forums.gardenweb.com",
      "Set up gardening profile",
      "Add signature with link",
      "Post in relevant gardening sections",
      "Share garden photos and tips",
      "Signature appears on posts",
    ],
    submissionDescription: "My complete gardening guide: [YOUR_LINK]",
  },
  {
    id: "home2",
    name: "r/HomeImprovement",
    url: "https://www.reddit.com/r/HomeImprovement/",
    category: "Social",
    niche: "Home & Garden",
    trafficPotential: "200-600 visitors/month",
    timeToComplete: "7 minutes",
    difficulty: "Easy",
    instructions: [
      "Join r/HomeImprovement",
      "Read subreddit guidelines",
      "Post DIY project or improvement",
      "Include your link as resource",
      "Share before/after photos",
      "Engage with comments",
    ],
    submissionDescription: "DIY home improvement guide: [YOUR_LINK]",
  },
]

export function AutomatedIncomeContent({ userId }: { userId: string }) {
  const [selectedSource, setSelectedSource] = useState<TrafficSource | null>(null)
  const [pageUrl, setPageUrl] = useState("")
  const [selectedNiche, setSelectedNiche] = useState<string>("All")
  const [completedSources, setCompletedSources] = useState<Set<string>>(new Set())

  const niches = [
    "All",
    "Weight Loss",
    "Make Money Online",
    "Health & Fitness",
    "Tech & Gadgets",
    "Beauty & Skincare",
    "Relationships",
    "Pets",
    "Home & Garden",
  ]

  const filteredSources =
    selectedNiche === "All" ? trafficSources : trafficSources.filter((s) => s.niche === selectedNiche)

  const handleMarkComplete = (sourceId: string) => {
    setCompletedSources((prev) => new Set([...prev, sourceId]))
  }

  const populatedDescription = selectedSource
    ? selectedSource.submissionDescription.replace("[YOUR_LINK]", pageUrl || "[YOUR_LINK]")
    : ""

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
          <TrendingUp className="w-12 h-12 text-white" />
        </div>
        <div>
          <h1 className="text-5xl lg:text-6xl font-black text-white mb-4">Automated Income - Traffic On Autopilot</h1>
          <p className="text-2xl text-emerald-300 font-bold mb-4">
            100+ Free Traffic Sources - Submit Once, Get Traffic Forever
          </p>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed font-semibold">
            Stop chasing traffic every day. Submit your link to these 100+ sites ONCE and get ongoing traffic
            automatically. Our members have generated over 2.8 million visitors using these sources.
          </p>
        </div>
      </div>

      {/* Simple Explanation */}
      <Card className="bg-gradient-to-br from-emerald-900/30 to-green-900/30 border-emerald-500/30 shadow-xl">
        <CardHeader>
          <CardTitle className="text-3xl font-black text-white flex items-center gap-3">
            <Users className="w-8 h-8 text-emerald-400" />
            How This Works (Super Simple!)
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="bg-emerald-500/10 rounded-xl p-8 border border-emerald-500/30">
            <p className="text-2xl text-white font-black mb-6">The Secret To Automated Traffic:</p>
            <p className="text-xl text-gray-300 font-semibold leading-relaxed mb-6">
              Most people waste hours every day posting on social media for traffic.
            </p>
            <p className="text-xl text-gray-300 font-semibold leading-relaxed mb-6">
              But what if you could submit your link ONCE and get traffic for months or even YEARS?
            </p>
            <p className="text-xl text-emerald-300 font-black leading-relaxed">
              That's exactly what these traffic sources do. You submit once, and they send you visitors automatically -
              no daily work required!
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-emerald-500/10 rounded-xl p-6 border border-emerald-500/30">
              <div className="w-16 h-16 rounded-full bg-emerald-500 flex items-center justify-center mb-4 text-2xl font-black text-white">
                1
              </div>
              <h3 className="text-2xl font-black text-white mb-3">Pick Your Niche</h3>
              <p className="text-lg text-gray-300 font-semibold leading-relaxed">
                Choose your niche below and get 100+ traffic sources specifically for your market.
              </p>
            </div>

            <div className="bg-green-500/10 rounded-xl p-6 border border-green-500/30">
              <div className="w-16 h-16 rounded-full bg-green-500 flex items-center justify-center mb-4 text-2xl font-black text-white">
                2
              </div>
              <h3 className="text-2xl font-black text-white mb-3">Submit Your Link</h3>
              <p className="text-lg text-gray-300 font-semibold leading-relaxed">
                Follow the simple step-by-step instructions to submit your link to each site. Takes 5-15 minutes per
                site.
              </p>
            </div>

            <div className="bg-teal-500/10 rounded-xl p-6 border border-teal-500/30">
              <div className="w-16 h-16 rounded-full bg-teal-500 flex items-center justify-center mb-4 text-2xl font-black text-white">
                3
              </div>
              <h3 className="text-2xl font-black text-white mb-3">Get Automatic Traffic</h3>
              <p className="text-lg text-gray-300 font-semibold leading-relaxed">
                Once submitted, these sites send you traffic automatically. No daily work needed!
              </p>
            </div>
          </div>

          <div className="bg-yellow-500/10 rounded-xl p-6 border border-yellow-500/30">
            <p className="text-xl text-yellow-300 font-black mb-3">💡 Pro Tip:</p>
            <p className="text-lg text-gray-300 font-semibold leading-relaxed">
              Set aside 2-3 hours and submit to as many sources as possible. The more you submit to, the more automatic
              traffic you get. Most members submit to 50+ sources in their first week!
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Page URL Input */}
      <Card className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 border-emerald-500/30">
        <CardContent className="p-8">
          <Label htmlFor="page-url" className="text-2xl font-black text-white mb-4 block">
            Enter Your Page URL:
          </Label>
          <Input
            id="page-url"
            type="url"
            placeholder="https://your-page-url.com"
            value={pageUrl}
            onChange={(e) => setPageUrl(e.target.value)}
            className="bg-gray-800 border-emerald-500/30 text-white text-xl font-semibold h-14"
          />
          <p className="text-base text-gray-400 font-semibold mt-3">
            This is the page you want to promote. We'll automatically insert it in all the submission descriptions
            below.
          </p>
        </CardContent>
      </Card>

      {/* Niche Filter */}
      <div className="flex gap-3 flex-wrap">
        {niches.map((niche) => (
          <Button
            key={niche}
            onClick={() => setSelectedNiche(niche)}
            variant={selectedNiche === niche ? "default" : "outline"}
            className={
              selectedNiche === niche
                ? "bg-emerald-500 hover:bg-emerald-600 text-white font-bold"
                : "border-emerald-500/30 text-emerald-300 hover:bg-emerald-500/20 font-bold"
            }
            size="lg"
          >
            {niche}
          </Button>
        ))}
      </div>

      {/* Progress Tracker */}
      <Card className="bg-gradient-to-br from-emerald-900/30 to-green-900/30 border-emerald-500/30">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xl font-black text-white">Your Progress:</p>
              <p className="text-lg text-gray-300 font-semibold">
                {completedSources.size} of {filteredSources.length} sources completed
              </p>
            </div>
            <div className="text-right">
              <p className="text-3xl font-black text-emerald-400">
                {Math.round((completedSources.size / filteredSources.length) * 100)}%
              </p>
              <p className="text-sm text-gray-400 font-semibold">Complete</p>
            </div>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-4 mt-4">
            <div
              className="bg-gradient-to-r from-emerald-500 to-green-500 h-4 rounded-full transition-all"
              style={{ width: `${(completedSources.size / filteredSources.length) * 100}%` }}
            />
          </div>
        </CardContent>
      </Card>

      {/* Traffic Sources Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredSources.map((source) => {
          const isCompleted = completedSources.has(source.id)
          return (
            <Card
              key={source.id}
              className={`bg-gradient-to-br from-gray-800/80 to-gray-900/80 border-emerald-500/20 hover:border-emerald-400/50 transition-all cursor-pointer ${
                isCompleted ? "opacity-60" : ""
              }`}
              onClick={() => setSelectedSource(source)}
            >
              <CardContent className="p-8">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3 flex-wrap">
                      <span className="px-3 py-1 bg-emerald-500/20 text-emerald-300 text-sm font-bold rounded-full">
                        {source.category}
                      </span>
                      <span className="px-3 py-1 bg-blue-500/20 text-blue-300 text-sm font-bold rounded-full">
                        {source.difficulty}
                      </span>
                      {isCompleted && (
                        <span className="px-3 py-1 bg-green-500/20 text-green-300 text-sm font-bold rounded-full flex items-center gap-1">
                          <CheckCircle2 className="w-4 h-4" />
                          Completed
                        </span>
                      )}
                    </div>
                    <h3 className="text-2xl font-black text-white mb-3">{source.name}</h3>
                    <div className="space-y-2 mb-4">
                      <p className="text-emerald-300 font-bold flex items-center gap-2">
                        <Users className="w-5 h-5" />
                        Traffic: {source.trafficPotential}
                      </p>
                      <p className="text-blue-300 font-bold flex items-center gap-2">
                        <Clock className="w-5 h-5" />
                        Time: {source.timeToComplete}
                      </p>
                    </div>
                  </div>
                </div>
                <Button className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-black text-lg" size="lg">
                  <ExternalLink className="w-5 h-5 mr-2" />
                  View Instructions
                </Button>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Source Detail Modal */}
      <Dialog open={!!selectedSource} onOpenChange={() => setSelectedSource(null)}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-gray-900 border-emerald-500/30">
          <DialogHeader>
            <DialogTitle className="text-3xl font-black text-white">{selectedSource?.name}</DialogTitle>
            <DialogDescription className="text-lg font-semibold text-gray-300">
              Traffic Potential: {selectedSource?.trafficPotential} | Time: {selectedSource?.timeToComplete}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6">
            <div className="flex gap-3">
              <Button
                asChild
                className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white font-black text-lg"
                size="lg"
              >
                <a href={selectedSource?.url} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="w-5 h-5 mr-2" />
                  Go To Site
                </a>
              </Button>
              <Button
                onClick={() => selectedSource && handleMarkComplete(selectedSource.id)}
                variant="outline"
                className="border-green-500/30 text-green-300 hover:bg-green-500/20 font-black"
                size="lg"
                disabled={selectedSource ? completedSources.has(selectedSource.id) : false}
              >
                <CheckCircle2 className="w-5 h-5 mr-2" />
                {selectedSource && completedSources.has(selectedSource.id) ? "Completed" : "Mark Complete"}
              </Button>
            </div>

            <div className="bg-emerald-500/10 rounded-xl p-6 border border-emerald-500/30">
              <h4 className="text-2xl font-black text-white mb-4">📋 Step-By-Step Instructions:</h4>
              <ol className="space-y-4">
                {selectedSource?.instructions.map((instruction, index) => (
                  <li key={index} className="flex gap-4">
                    <span className="flex-shrink-0 w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center text-white font-black">
                      {index + 1}
                    </span>
                    <p className="text-lg text-gray-300 font-semibold leading-relaxed pt-1">{instruction}</p>
                  </li>
                ))}
              </ol>
            </div>

            <div className="bg-gray-800/50 rounded-xl p-6 border border-emerald-500/20">
              <h4 className="text-xl font-black text-white mb-4">📝 Use This Description When Submitting:</h4>
              <div className="bg-gray-900 rounded-lg p-4 border border-emerald-500/20">
                <p className="text-gray-300 font-mono text-base leading-relaxed">
                  {pageUrl ? populatedDescription : selectedSource?.submissionDescription}
                </p>
              </div>
              <Button
                onClick={() => {
                  navigator.clipboard.writeText(populatedDescription || selectedSource?.submissionDescription || "")
                }}
                variant="outline"
                className="mt-4 border-emerald-500/30 text-emerald-300 hover:bg-emerald-500/20 font-bold"
              >
                Copy Description
              </Button>
            </div>

            {!pageUrl && (
              <div className="bg-yellow-500/10 rounded-xl p-6 border border-yellow-500/30">
                <p className="text-yellow-300 font-bold text-lg">
                  💡 Tip: Enter your page URL above to automatically populate it in all descriptions!
                </p>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
