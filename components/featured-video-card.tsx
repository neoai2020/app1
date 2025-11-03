"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Play, Clock } from "lucide-react"
import { useState } from "react"

export function FeaturedVideoCard() {
  const [isPlaying, setIsPlaying] = useState(false)

  return (
    <Card className="glass-strong border-border/50 glow-cyan overflow-hidden">
      <CardContent className="p-0">
        <div className="grid md:grid-cols-2 gap-0">
          {/* Video Player */}
          <div className="relative aspect-video md:aspect-auto bg-muted">
            {!isPlaying ? (
              <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary/20 to-secondary/20">
                <Button size="lg" onClick={() => setIsPlaying(true)} className="h-20 w-20 rounded-full glow-cyan p-0">
                  <Play className="w-10 h-10 ml-1" />
                </Button>
              </div>
            ) : (
              <iframe
                src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"
                title="Welcome Video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              />
            )}
          </div>

          {/* Video Info */}
          <div className="p-8 flex flex-col justify-center space-y-6">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/20 text-primary text-sm font-bold mb-4">
                <Clock className="w-4 h-4" />
                <span>5 min watch</span>
              </div>
              <h3 className="text-3xl font-bold text-foreground mb-3">
                How to Create Your First $1,000 Affiliate Page
              </h3>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Watch this quick tutorial to learn the exact 3-step process our top earners use to generate
                high-converting affiliate pages in under 3 minutes.
              </p>
            </div>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-accent" />
                <p className="text-base text-foreground">Choose your profitable niche</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-accent" />
                <p className="text-base text-foreground">Pick a high-converting offer</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-accent" />
                <p className="text-base text-foreground">Generate & share your page</p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
