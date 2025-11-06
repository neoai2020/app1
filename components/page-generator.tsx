"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Loader2, ArrowLeft, Sparkles, CheckCircle2 } from "lucide-react"
import { useRouter } from "next/navigation"
import generatePageAction from "@/app/actions/generate-page"

interface PageGeneratorProps {
  nicheId: string
  onBack: () => void
}

export function PageGenerator({ nicheId, onBack }: PageGeneratorProps) {
  const [affiliateLink, setAffiliateLink] = useState("")
  const [generating, setGenerating] = useState(false)
  const [progress, setProgress] = useState(0)
  const [currentMessage, setCurrentMessage] = useState("")
  const [success, setSuccess] = useState(false)
  const router = useRouter()

  const messages = [
    "Analyzing your niche...",
    "Researching top-performing content...",
    "Writing compelling headline...",
    "Crafting engaging introduction...",
    "Building trust with social proof...",
    "Creating persuasive call-to-action...",
    "Optimizing for conversions...",
    "Adding compliance disclaimers...",
    "Finalizing your page...",
  ]

  const handleGenerate = async () => {
    if (!affiliateLink.trim()) {
      alert("Please enter your affiliate link")
      return
    }

    setGenerating(true)
    setProgress(0)

    // Simulate progress with messages
    let messageIndex = 0
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev + 11
        if (newProgress >= 100) {
          clearInterval(progressInterval)
          return 100
        }
        return newProgress
      })

      if (messageIndex < messages.length) {
        setCurrentMessage(messages[messageIndex])
        messageIndex++
      }
    }, 800)

    try {
      const result = await generatePageAction(nicheId, affiliateLink)

      clearInterval(progressInterval)
      setProgress(100)

      if (!result.success) {
        throw new Error(result.error || "Failed to generate page")
      }

      setSuccess(true)

      // Redirect after celebration
      setTimeout(() => {
        router.push("/pages")
      }, 3000)
    } catch (error) {
      clearInterval(progressInterval)
      console.error("[v0] Error generating page:", error)
      const errorMessage = error instanceof Error ? error.message : "Failed to generate page. Please try again."
      alert(errorMessage)
      setGenerating(false)
      setProgress(0)
    }
  }

  if (success) {
    return (
      <div className="flex items-center justify-center py-20">
        <Card className="glass-strong glow-jade border-border/50 max-w-2xl">
          <CardContent className="p-12 text-center space-y-6">
            <div className="w-24 h-24 rounded-full bg-accent/20 flex items-center justify-center mx-auto glow-jade">
              <CheckCircle2 className="w-16 h-16 text-accent" />
            </div>
            <div>
              <h2 className="text-4xl font-bold text-foreground mb-3">Page Created Successfully!</h2>
              <p className="text-xl text-muted-foreground">Your affiliate page is ready to start earning commissions</p>
            </div>
            <div className="pt-4">
              <p className="text-lg text-accent font-semibold animate-pulse">Redirecting to your pages...</p>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      <div className="flex items-center gap-4">
        <Button variant="outline" onClick={onBack} disabled={generating} className="h-12 glass bg-transparent">
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back
        </Button>
      </div>

      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold text-foreground">Generate Your Page</h2>
        <p className="text-lg text-muted-foreground">Enter your affiliate link and let AI create your content</p>
      </div>

      <Card className="glass-strong glow-cyan border-border/50">
        <CardContent className="p-8 space-y-6">
          <div className="bg-cyan-500/10 rounded-xl p-6 border-2 border-cyan-500/30 space-y-4">
            <h3 className="text-xl font-bold text-cyan-300 flex items-center gap-2">
              <Sparkles className="w-6 h-6" />
              Where to Get Your Affiliate Link
            </h3>
            <p className="text-base text-gray-200 font-semibold leading-relaxed">
              We recommend using <strong className="text-cyan-300">DigiStore24</strong> - a free affiliate marketplace
              with thousands of products you can promote and earn commissions from.
            </p>
            <div className="bg-gray-900/50 rounded-lg p-4 space-y-3">
              <p className="text-sm font-bold text-gray-300">Quick Start (3 Steps):</p>
              <ol className="space-y-2 text-sm text-gray-300 font-semibold">
                <li className="flex items-start gap-2">
                  <span className="text-cyan-400 font-black">1.</span>
                  <span>
                    Go to{" "}
                    <a
                      href="http://digistore24.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-cyan-400 underline hover:text-cyan-300"
                    >
                      digistore24.com
                    </a>{" "}
                    and create a free account
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-cyan-400 font-black">2.</span>
                  <span>Browse products in your niche and click "Promote"</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-cyan-400 font-black">3.</span>
                  <span>Copy your unique affiliate link and paste it below</span>
                </li>
              </ol>
            </div>
            <Button
              asChild
              variant="outline"
              className="w-full border-cyan-500/50 text-cyan-300 hover:bg-cyan-500/20 font-bold bg-transparent"
            >
              <a href="http://digistore24.com" target="_blank" rel="noopener noreferrer">
                Create Free DigiStore24 Account →
              </a>
            </Button>
          </div>

          <div className="space-y-3">
            <Label htmlFor="affiliateLink" className="text-lg font-semibold">
              Your Affiliate Link
            </Label>
            <Input
              id="affiliateLink"
              type="url"
              placeholder="https://example.com/your-affiliate-link"
              value={affiliateLink}
              onChange={(e) => setAffiliateLink(e.target.value)}
              disabled={generating}
              className="h-14 text-lg glass"
            />
            <p className="text-sm text-muted-foreground">
              This is the link where you'll earn commissions. Get it from your affiliate network.
            </p>
          </div>

          {generating && (
            <div className="space-y-4 py-6">
              <div className="flex items-center gap-3">
                <Loader2 className="w-6 h-6 animate-spin text-primary" />
                <p className="text-lg font-semibold text-primary">{currentMessage}</p>
              </div>
              <div className="w-full h-4 rounded-full bg-muted overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-primary to-accent glow-cyan transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <p className="text-center text-base text-muted-foreground">{progress}% Complete</p>
            </div>
          )}

          <Button
            onClick={handleGenerate}
            disabled={generating || !affiliateLink.trim()}
            className="w-full h-16 text-xl font-bold glow-cyan"
          >
            {generating ? (
              <>
                <Loader2 className="w-6 h-6 mr-3 animate-spin" />
                Generating Your Page...
              </>
            ) : (
              <>
                <Sparkles className="w-6 h-6 mr-3" />
                Generate Page with AI
              </>
            )}
          </Button>

          <div className="glass rounded-xl p-4 space-y-2">
            <p className="text-base font-semibold text-accent">What happens next:</p>
            <ul className="space-y-1 text-sm text-muted-foreground">
              <li>✓ AI writes a 1000-word review article</li>
              <li>✓ Optimized for conversions and compliance</li>
              <li>✓ Your affiliate link embedded automatically</li>
              <li>✓ Ready to share and start earning</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
