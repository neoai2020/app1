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
            <h3 className="text-2xl font-bold text-foreground mb-3">Watch This Video To Get Started</h3>
          </div>

          {/* Video Player - Now below */}
          <div className="relative aspect-video bg-black">
            {!isPlaying ? (
              <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800">
                {/* Thumbnail overlay */}
                <div className="absolute inset-0 bg-black/40" />

                {/* Large, prominent play button */}
                <Button
                  size="lg"
                  onClick={() => setIsPlaying(true)}
                  className="relative z-10 h-24 w-24 rounded-full bg-cyan-500 hover:bg-cyan-400 text-white shadow-2xl hover:scale-110 transition-all duration-300 border-4 border-white/20"
                >
                  <Play className="w-12 h-12 ml-1 fill-white" />
                </Button>

                {/* Click to play text */}
                <div className="absolute bottom-8 left-0 right-0 text-center">
                  <p className="text-white text-lg font-semibold drop-shadow-lg">Click to Play Video</p>
                </div>
              </div>
            ) : (
              <div className="relative w-full h-full">
                <iframe
                  src="https://player.vimeo.com/video/1133461747?badge=0&autopause=0&player_id=0&app_id=58479&autoplay=1&controls=1"
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
