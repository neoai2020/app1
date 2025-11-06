"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Play, Sparkles } from "lucide-react"
import { useState } from "react"

export function FeaturedVideoCard() {
  const [isPlaying, setIsPlaying] = useState(false)

  return (
    <Card className="glass-strong border-border/50 glow-cyan overflow-hidden ring-4 ring-cyan-500/30 shadow-2xl shadow-cyan-500/50">
      <CardContent className="p-0">
        <div className="space-y-0">
          {/* Video Info - Now on top with extra emphasis */}
          <div className="p-6 bg-gradient-to-r from-cyan-500/20 to-blue-500/20">
            <div className="flex items-center gap-3 mb-2">
              <Sparkles className="w-6 h-6 text-cyan-400 animate-pulse" />
              <span className="text-cyan-400 font-black text-sm uppercase tracking-wider">Must Watch First</span>
            </div>
            <h3 className="text-3xl font-black text-foreground mb-2">Watch This Video To Get Started</h3>
            <p className="text-lg text-muted-foreground font-bold">
              This 5-minute video shows you exactly how to use your P55 Account
            </p>
          </div>

          {/* Video Player */}
          <div className="relative aspect-video bg-black">
            {!isPlaying ? (
              <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800">
                {/* Video thumbnail preview */}
                <div className="absolute inset-0">
                  <iframe
                    src="https://player.vimeo.com/video/1134294445?badge=0&autopause=0&player_id=0&app_id=58479&background=1&muted=1"
                    title="P55 Account Welcome Preview"
                    allow="autoplay; fullscreen; picture-in-picture"
                    className="absolute inset-0 w-full h-full border-0 pointer-events-none"
                  />
                </div>

                {/* Overlay */}
                <div className="absolute inset-0 bg-black/40" />

                {/* Large, prominent play button */}
                <Button
                  size="lg"
                  onClick={() => setIsPlaying(true)}
                  className="relative z-10 h-28 w-28 rounded-full bg-cyan-500 hover:bg-cyan-400 text-white shadow-2xl hover:scale-110 transition-all duration-300 border-4 border-white/20 animate-pulse"
                >
                  <Play className="w-14 h-14 ml-1 fill-white" />
                </Button>

                {/* Click to play text */}
                <div className="absolute bottom-8 left-0 right-0 text-center">
                  <p className="text-white text-xl font-black drop-shadow-lg">▶ Click to Play Video</p>
                </div>
              </div>
            ) : (
              <div className="relative w-full h-full">
                <iframe
                  src="https://player.vimeo.com/video/1134294445?badge=0&autopause=0&player_id=0&app_id=58479&autoplay=1&controls=1"
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
