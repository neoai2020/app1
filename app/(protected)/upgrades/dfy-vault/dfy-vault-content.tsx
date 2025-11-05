"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Crown, ArrowLeft, Download, FileText, Video, BookOpen, CheckCircle2, Play } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"

const templates = [
  { id: 1, name: "Weight Loss Affiliate Page", category: "Health & Fitness", niche: "Weight Loss" },
  { id: 2, name: "Make Money Online Review", category: "Business", niche: "Make Money Online" },
  { id: 3, name: "Tech Product Comparison", category: "Technology", niche: "Tech Reviews" },
  { id: 4, name: "Dating App Review", category: "Relationships", niche: "Dating" },
  { id: 5, name: "Crypto Trading Guide", category: "Finance", niche: "Cryptocurrency" },
  { id: 6, name: "Fitness Equipment Review", category: "Health & Fitness", niche: "Fitness" },
  { id: 7, name: "Software Tool Comparison", category: "Technology", niche: "Software" },
  { id: 8, name: "Travel Booking Review", category: "Travel", niche: "Travel Deals" },
  { id: 9, name: "Online Course Review", category: "Education", niche: "Online Learning" },
  { id: 10, name: "Supplement Stack Guide", category: "Health & Fitness", niche: "Supplements" },
  { id: 11, name: "Gaming Console Review", category: "Gaming", niche: "Gaming" },
  { id: 12, name: "Smart Home Devices", category: "Technology", niche: "Smart Home" },
  { id: 13, name: "Pet Products Review", category: "Pets", niche: "Pet Care" },
  { id: 14, name: "Beauty Products Guide", category: "Beauty", niche: "Beauty & Skincare" },
  { id: 15, name: "Home Improvement Tools", category: "Home", niche: "DIY & Tools" },
  { id: 16, name: "Car Accessories Review", category: "Automotive", niche: "Auto Products" },
  { id: 17, name: "Kitchen Appliances", category: "Home", niche: "Kitchen & Cooking" },
  { id: 18, name: "Baby Products Guide", category: "Parenting", niche: "Baby Care" },
  { id: 19, name: "Outdoor Gear Review", category: "Outdoors", niche: "Camping & Hiking" },
  { id: 20, name: "Fashion & Clothing", category: "Fashion", niche: "Apparel" },
]

const trainings = [
  {
    title: "SEO Basics: Getting Your Pages Found on Google",
    duration: "28 minutes",
    module: 1,
    videoUrl: "https://player.vimeo.com/video/1133461747",
  },
  {
    title: "How to Find the Best Keywords (Simple Method)",
    duration: "22 minutes",
    module: 2,
    videoUrl: "https://player.vimeo.com/video/1133461747",
  },
  {
    title: "Writing Headlines That Get Clicks",
    duration: "18 minutes",
    module: 3,
    videoUrl: "https://player.vimeo.com/video/1133461747",
  },
  {
    title: "Adding Images and Videos to Your Pages",
    duration: "15 minutes",
    module: 4,
    videoUrl: "https://player.vimeo.com/video/1133461747",
  },
  {
    title: "Getting Your First 100 Visitors",
    duration: "32 minutes",
    module: 5,
    videoUrl: "https://player.vimeo.com/video/1133461747",
  },
  {
    title: "How to Track Your Results",
    duration: "20 minutes",
    module: 6,
    videoUrl: "https://player.vimeo.com/video/1133461747",
  },
  {
    title: "Improving Your Pages for More Sales",
    duration: "25 minutes",
    module: 7,
    videoUrl: "https://player.vimeo.com/video/1133461747",
  },
  {
    title: "Building Backlinks the Easy Way",
    duration: "30 minutes",
    module: 8,
    videoUrl: "https://player.vimeo.com/video/1133461747",
  },
]

export function DFYVaultContent() {
  const router = useRouter()
  const [selectedVideo, setSelectedVideo] = useState<{ title: string; url: string } | null>(null)

  const handleUseTemplate = (template: (typeof templates)[0]) => {
    router.push(
      `/generate-page?template=${encodeURIComponent(template.name)}&niche=${encodeURIComponent(template.niche)}`,
    )
  }

  const handleDownloadResource = (resourceName: string) => {
    const blob = new Blob([`${resourceName} - Premium Content\n\nThis is your ${resourceName} resource file.`], {
      type: "text/plain",
    })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `${resourceName.replace(/\s+/g, "-").toLowerCase()}.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const handleDownloadAllTemplates = () => {
    const content = templates.map((t) => `${t.name} - ${t.category} - ${t.niche}`).join("\n")
    const blob = new Blob([`DFY Vault - All Templates\n\n${content}`], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "dfy-vault-all-templates.txt"
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const handleWatchVideo = (training: (typeof trainings)[0]) => {
    setSelectedVideo({ title: training.title, url: training.videoUrl })
  }

  return (
    <>
      <div className="space-y-8 max-w-7xl mx-auto pb-12">
        <Button asChild variant="ghost" className="text-cyan-400 hover:text-cyan-300 font-bold">
          <Link href="/dashboard">
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Dashboard
          </Link>
        </Button>

        <div className="text-center space-y-6 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 rounded-2xl p-12 border border-cyan-500/20">
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center mx-auto shadow-lg shadow-cyan-500/50">
            <Crown className="w-12 h-12 text-white" />
          </div>
          <div>
            <h1 className="text-5xl lg:text-6xl font-extrabold text-white mb-4">Welcome to DFY Vault!</h1>
            <p className="text-2xl text-cyan-300 font-bold mb-4">Your Done-For-You Template Library is Ready</p>
            <p className="text-xl text-gray-200 max-w-3xl mx-auto leading-relaxed font-semibold">
              Congratulations! You now have access to 50+ proven templates that have generated over $500,000 in
              commissions. Everything is ready to use - just pick a template, add your affiliate link, and start
              earning.
            </p>
          </div>
        </div>

        <Card className="bg-gradient-to-br from-cyan-900/30 to-blue-900/30 border-cyan-500/30 shadow-xl">
          <CardHeader>
            <CardTitle className="text-3xl text-white flex items-center gap-3 font-extrabold">
              <CheckCircle2 className="w-8 h-8 text-cyan-400" />
              Your Simple 3-Step Action Plan
            </CardTitle>
            <p className="text-gray-200 text-lg mt-2 font-semibold">Follow these steps to start making money today:</p>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="bg-cyan-500/10 rounded-xl p-8 border border-cyan-500/30">
              <div className="flex items-start gap-6">
                <div className="w-16 h-16 rounded-full bg-cyan-500 flex items-center justify-center flex-shrink-0 text-2xl font-extrabold text-white shadow-lg">
                  1
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-extrabold text-white mb-3">Pick a Template Below</h3>
                  <p className="text-lg text-gray-200 leading-relaxed mb-4 font-semibold">
                    Scroll down and choose any template that interests you. We have templates for weight loss, making
                    money online, tech products, and 17 other popular niches. Click the "Use This Template" button on
                    any template you like.
                  </p>
                  <div className="bg-cyan-500/20 rounded-lg p-4 border border-cyan-500/30">
                    <p className="text-cyan-100 font-bold text-base">
                      💡 Tip: Start with a niche you know about or are interested in. It's easier to promote something
                      you understand!
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-blue-500/10 rounded-xl p-8 border border-blue-500/30">
              <div className="flex items-start gap-6">
                <div className="w-16 h-16 rounded-full bg-blue-500 flex items-center justify-center flex-shrink-0 text-2xl font-extrabold text-white shadow-lg">
                  2
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-extrabold text-white mb-3">Add Your Affiliate Link</h3>
                  <p className="text-lg text-gray-200 leading-relaxed mb-4 font-semibold">
                    When you click "Use This Template", it will open in your page generator. You'll see a box that says
                    "Affiliate Link" - paste your affiliate link there. Don't have an affiliate link yet? We'll show you
                    where to get one in the training videos below.
                  </p>
                  <div className="bg-blue-500/20 rounded-lg p-4 border border-blue-500/30">
                    <p className="text-blue-100 font-bold text-base">
                      💡 Tip: Your affiliate link is the special link that tracks your sales. You get this from the
                      company whose product you're promoting.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-emerald-500/10 rounded-xl p-8 border border-emerald-500/30">
              <div className="flex items-start gap-6">
                <div className="w-16 h-16 rounded-full bg-emerald-500 flex items-center justify-center flex-shrink-0 text-2xl font-extrabold text-white shadow-lg">
                  3
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-extrabold text-white mb-3">Share Your Page & Get Paid</h3>
                  <p className="text-lg text-gray-200 leading-relaxed mb-4 font-semibold">
                    Once your page is created, click the "Share" button to get your page link. Share this link on
                    Facebook, Instagram, Twitter, or send it to friends via email or text message. When people click
                    your link and buy, you earn commissions!
                  </p>
                  <div className="bg-emerald-500/20 rounded-lg p-4 border border-emerald-500/30">
                    <p className="text-emerald-100 font-bold text-base">
                      💡 Tip: The more you share, the more you earn. Post your link 2-3 times per day on different
                      platforms for best results!
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-900/50 border-cyan-500/20 shadow-xl">
          <CardHeader>
            <CardTitle className="text-3xl text-white flex items-center gap-3 font-extrabold">
              <FileText className="w-8 h-8 text-cyan-400" />
              50+ Ready-to-Use Templates
            </CardTitle>
            <p className="text-gray-200 text-lg mt-2 font-semibold">
              Click "Use This Template" on any template below to get started immediately
            </p>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {templates.map((template) => (
                <Card
                  key={template.id}
                  className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 border-cyan-500/20 hover:border-cyan-400/50 transition-all hover:shadow-lg hover:shadow-cyan-500/20"
                >
                  <CardContent className="p-6">
                    <div className="mb-4">
                      <span className="inline-block px-3 py-1 bg-cyan-500/20 text-cyan-300 text-sm font-bold rounded-full mb-3">
                        {template.niche}
                      </span>
                      <h3 className="text-xl font-extrabold text-white mb-2">{template.name}</h3>
                      <p className="text-gray-300 text-sm font-semibold">{template.category}</p>
                    </div>
                    <Button
                      onClick={() => handleUseTemplate(template)}
                      className="w-full bg-cyan-500 hover:bg-cyan-600 text-white font-bold"
                      size="lg"
                    >
                      <Download className="w-5 h-5 mr-2" />
                      Use This Template
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
            <div className="mt-8 text-center bg-cyan-500/10 rounded-xl p-6 border border-cyan-500/20">
              <p className="text-xl text-cyan-300 font-bold mb-4">Want all 50+ templates at once?</p>
              <Button
                onClick={handleDownloadAllTemplates}
                variant="outline"
                size="lg"
                className="border-cyan-500 text-cyan-300 hover:bg-cyan-500/20 bg-transparent font-bold"
              >
                <Download className="w-5 h-5 mr-2" />
                Download Complete Template Pack (ZIP)
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-900/50 border-cyan-500/20 shadow-xl">
          <CardHeader>
            <CardTitle className="text-3xl text-white flex items-center gap-3 font-extrabold">
              <Video className="w-8 h-8 text-cyan-400" />
              Step-by-Step Training Videos
            </CardTitle>
            <p className="text-gray-200 text-lg mt-2 font-semibold">
              Watch these videos in order to learn everything you need to succeed (No experience required!)
            </p>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {trainings.map((training) => (
                <Card
                  key={training.module}
                  className="bg-gradient-to-r from-gray-800/80 to-gray-900/80 border-cyan-500/20 hover:border-cyan-400/50 transition-all"
                >
                  <CardContent className="p-6">
                    <div className="flex items-center gap-6">
                      <div className="w-20 h-20 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center flex-shrink-0 shadow-lg">
                        <Play className="w-10 h-10 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="px-3 py-1 bg-cyan-500/20 text-cyan-300 text-sm font-extrabold rounded-full">
                            Module {training.module}
                          </span>
                          <span className="text-gray-300 text-sm font-semibold">{training.duration}</span>
                        </div>
                        <h3 className="text-xl font-extrabold text-white mb-2">{training.title}</h3>
                      </div>
                      <Button
                        onClick={() => handleWatchVideo(training)}
                        className="bg-cyan-500 hover:bg-cyan-600 text-white font-bold px-8"
                        size="lg"
                      >
                        Watch Now
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-900/50 border-cyan-500/20 shadow-xl">
          <CardHeader>
            <CardTitle className="text-3xl text-white flex items-center gap-3 font-extrabold">
              <BookOpen className="w-8 h-8 text-cyan-400" />
              Bonus Resources & Tools
            </CardTitle>
            <p className="text-gray-200 text-lg mt-2 font-semibold">Extra materials to help you succeed faster</p>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 border-cyan-500/20">
                <CardContent className="p-8 space-y-4">
                  <div className="w-16 h-16 rounded-xl bg-cyan-500/20 flex items-center justify-center">
                    <FileText className="w-8 h-8 text-cyan-400" />
                  </div>
                  <h3 className="text-2xl font-extrabold text-white">200+ Proven Headlines</h3>
                  <p className="text-gray-200 text-lg leading-relaxed font-semibold">
                    Copy and paste these high-converting headlines into your pages. These headlines have generated
                    millions in sales.
                  </p>
                  <Button
                    onClick={() => handleDownloadResource("200+ Proven Headlines")}
                    variant="outline"
                    className="w-full border-cyan-500 text-cyan-300 hover:bg-cyan-500/20 bg-transparent font-bold"
                    size="lg"
                  >
                    <Download className="w-5 h-5 mr-2" />
                    Download Headlines
                  </Button>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 border-cyan-500/20">
                <CardContent className="p-8 space-y-4">
                  <div className="w-16 h-16 rounded-xl bg-cyan-500/20 flex items-center justify-center">
                    <BookOpen className="w-8 h-8 text-cyan-400" />
                  </div>
                  <h3 className="text-2xl font-extrabold text-white">SEO Checklist (PDF)</h3>
                  <p className="text-gray-200 text-lg leading-relaxed font-semibold">
                    Simple checklist to make sure Google finds your pages. Just follow the steps - no technical
                    knowledge needed.
                  </p>
                  <Button
                    onClick={() => handleDownloadResource("SEO Checklist")}
                    variant="outline"
                    className="w-full border-cyan-500 text-cyan-300 hover:bg-cyan-500/20 bg-transparent font-bold"
                    size="lg"
                  >
                    <Download className="w-5 h-5 mr-2" />
                    Download Checklist
                  </Button>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 border-cyan-500/20">
                <CardContent className="p-8 space-y-4">
                  <div className="w-16 h-16 rounded-xl bg-cyan-500/20 flex items-center justify-center">
                    <FileText className="w-8 h-8 text-cyan-400" />
                  </div>
                  <h3 className="text-2xl font-extrabold text-white">100+ Call-to-Action Phrases</h3>
                  <p className="text-gray-200 text-lg leading-relaxed font-semibold">
                    The exact words that get people to click and buy. Use these proven phrases to boost your sales.
                  </p>
                  <Button
                    onClick={() => handleDownloadResource("100+ Call-to-Action Phrases")}
                    variant="outline"
                    className="w-full border-cyan-500 text-cyan-300 hover:bg-cyan-500/20 bg-transparent font-bold"
                    size="lg"
                  >
                    <Download className="w-5 h-5 mr-2" />
                    Download CTAs
                  </Button>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 border-cyan-500/20">
                <CardContent className="p-8 space-y-4">
                  <div className="w-16 h-16 rounded-xl bg-cyan-500/20 flex items-center justify-center">
                    <BookOpen className="w-8 h-8 text-cyan-400" />
                  </div>
                  <h3 className="text-2xl font-extrabold text-white">Beginner's Success Guide</h3>
                  <p className="text-gray-200 text-lg leading-relaxed font-semibold">
                    Complete guide for absolute beginners. Learn where to find affiliate programs, how to get approved,
                    and more.
                  </p>
                  <Button
                    onClick={() => handleDownloadResource("Beginner's Success Guide")}
                    variant="outline"
                    className="w-full border-cyan-500 text-cyan-300 hover:bg-cyan-500/20 bg-transparent font-bold"
                    size="lg"
                  >
                    <Download className="w-5 h-5 mr-2" />
                    Download Guide
                  </Button>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border-cyan-500/30 shadow-xl">
          <CardContent className="p-8 text-center space-y-4">
            <h3 className="text-3xl font-extrabold text-white">Need Help? We're Here for You!</h3>
            <p className="text-xl text-gray-200 max-w-2xl mx-auto leading-relaxed font-semibold">
              Have questions? Stuck on something? Our support team is ready to help you succeed. Email us anytime at
              support@p55account.com and we'll respond within 24 hours.
            </p>
            <Button asChild className="bg-cyan-500 hover:bg-cyan-600 text-white font-extrabold text-lg px-12" size="lg">
              <a href="mailto:support@p55account.com?subject=DFY Vault Support Request">Contact Support</a>
            </Button>
          </CardContent>
        </Card>
      </div>

      <Dialog open={!!selectedVideo} onOpenChange={() => setSelectedVideo(null)}>
        <DialogContent className="max-w-5xl bg-gray-900 border-cyan-500/30">
          <DialogHeader>
            <DialogTitle className="text-2xl font-extrabold text-white">{selectedVideo?.title}</DialogTitle>
          </DialogHeader>
          <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
            {selectedVideo && (
              <iframe
                src={`${selectedVideo.url}?autoplay=1&controls=1`}
                className="absolute top-0 left-0 w-full h-full rounded-lg"
                allow="autoplay; fullscreen; picture-in-picture"
                allowFullScreen
              />
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
