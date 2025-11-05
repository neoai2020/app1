"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Play } from "lucide-react"
import { useState } from "react"

export function FeaturedVideoCard() {
  const [isPlaying, setIsPlaying] = useState(false)

  return (
    <Card className="glass-strong border-border/50 glow-cyan overflow-hidden">
      <CardContent className="p-0">
        <div className="space-y-0">
          {/* Video Info - Now on top */}
          <div className="p-6">
            <h3 className="text-2xl font-bold text-foreground mb-3">How to Create Your First $1,000 Affiliate Page</h3>
          </div>

          {/* Video Player - Now below */}
          <div className="relative aspect-video bg-muted">
            {!isPlaying ? (
              <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary/20 to-secondary/20">
                <Button size="lg" onClick={() => setIsPlaying(true)} className="h-20 w-20 rounded-full glow-cyan p-0">
                  <Play className="w-10 h-10 ml-1" />
                </Button>
              </div>
            ) : (
              <div className="relative w-full h-full">
                <iframe
                  src="https://player.vimeo.com/video/1133461747?badge=0&autopause=0&player_id=0&app_id=58479&autoplay=1"
                  title="P55 Account Welcome"
                  allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
                  allowFullScreen
                  className="absolute inset-0 w-full h-full border-0"
                />
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
