"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Play, Sparkles } from "lucide-react"
import { useState } from "react"

export function FeaturedVideoCard() {
  const [isPlaying, setIsPlaying] = useState(false)

  return (
    <Card className="glass-card border-white/5 bg-[#111111] overflow-hidden group">
      <CardContent className="p-0">
        <div className="space-y-0">
          {/* Video Info - Minimized spacing */}
          <div className="px-8 pt-3 pb-2 border-b border-white/5">
            <div className="flex items-center gap-2 mb-1">
              <div className="w-6 h-6 rounded-lg bg-primary/10 flex items-center justify-center">
                <Sparkles className="w-3.5 h-3.5 text-primary" />
              </div>
              <span className="text-primary font-black text-[9px] uppercase tracking-widest">Must Watch First</span>
            </div>
            <h3 className="text-base font-black text-white leading-none tracking-tight uppercase">Get Started with Robinhood</h3>
            <p className="text-[9px] text-zinc-500 font-bold uppercase tracking-tight mt-1">
              Watch this 5-minute guide to master the platform.
            </p>
          </div>

          {/* Video Player */}
          <div className="relative aspect-video bg-black/40">
            {!isPlaying ? (
              <div className="absolute inset-0 flex items-center justify-center">
                {/* Video thumbnail preview with high-fidelity overlay */}
                <div className="absolute inset-0 opacity-40">
                  <iframe
                    src="https://player.vimeo.com/video/1151044408?badge=0&autopause=0&player_id=0&app_id=58479&background=1&muted=1"
                    title="Robinhood Welcome Preview"
                    allow="autoplay; fullscreen; picture-in-picture"
                    className="absolute inset-0 w-full h-full border-0 pointer-events-none"
                  />
                </div>

                {/* Dark Vignette */}
                <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-black/20" />

                {/* Large play button - Matching Sidebar Style */}
                <Button
                  size="lg"
                  onClick={() => setIsPlaying(true)}
                  className="relative z-10 h-20 w-20 rounded-full bg-primary text-black shadow-[0_0_30px_rgba(179,255,0,0.3)] hover:scale-110 transition-all duration-300 border-none"
                >
                  <Play className="w-8 h-8 ml-1 fill-black" />
                </Button>

                {/* Click to play text */}
                <div className="absolute bottom-6 left-0 right-0 text-center">
                  <p className="text-white text-[10px] font-black uppercase tracking-[0.2em] animate-pulse">Click to Play Video</p>
                </div>
              </div>
            ) : (
              <div className="relative w-full h-full">
                <iframe
                  src="https://player.vimeo.com/video/1151044408?badge=0&autopause=0&player_id=0&app_id=58479&autoplay=1&controls=1"
                  title="Robinhood Welcome"
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
