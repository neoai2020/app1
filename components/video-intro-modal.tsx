"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Play, X } from "lucide-react"

interface VideoIntroModalProps {
  videoUrl?: string
  title?: string
  description?: string
}

export function VideoIntroModal({
  videoUrl = "https://player.vimeo.com/video/1134294445?badge=0&autopause=0&player_id=0&app_id=58479",
  title = "Welcome to Robinhood!",
  description = "Watch this quick intro to learn how to find trending Shorts and post better comments.",
}: VideoIntroModalProps) {
  const [open, setOpen] = useState(false)
  const [hasWatched, setHasWatched] = useState(false)

  useEffect(() => {
    // Check if user has already watched the intro
    const watched = localStorage.getItem("robinhood-intro-watched")
    if (!watched) {
      // Show modal after a short delay for better UX
      const timer = setTimeout(() => {
        setOpen(true)
      }, 1000)
      return () => clearTimeout(timer)
    } else {
      setHasWatched(true)
    }
  }, [])

  const handleClose = () => {
    setOpen(false)
    localStorage.setItem("robinhood-intro-watched", "true")
    setHasWatched(true)
  }

  const handleSkip = () => {
    handleClose()
  }

  return (
    <>
      {/* Rewatch button - shows after user has watched once */}
      {hasWatched && (
        <Button
          onClick={() => setOpen(true)}
          variant="outline"
          size="lg"
          className="fixed bottom-6 right-6 z-50 glass-strong border-primary/50 hover:border-primary hover:glow-cyan transition-all duration-300"
        >
          <Play className="w-5 h-5 mr-2" />
          Watch Intro Again
        </Button>
      )}

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-4xl glass-strong border-primary/30 p-0 overflow-hidden">
          <DialogHeader className="p-6 pb-4">
            <div className="flex items-start justify-between">
              <div className="space-y-2">
                <DialogTitle className="text-3xl font-bold text-foreground">{title}</DialogTitle>
                <DialogDescription className="text-lg text-muted-foreground">{description}</DialogDescription>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleSkip}
                className="hover:bg-primary/10 hover:text-primary transition-colors"
              >
                <X className="w-6 h-6" />
              </Button>
            </div>
          </DialogHeader>

          {/* Video Container */}
          <div className="relative w-full aspect-video bg-black/50">
            <iframe
              src={videoUrl}
              title="Robinhood Introduction"
              allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
              allowFullScreen
              className="absolute inset-0 w-full h-full border-0"
            />
          </div>

          {/* Action Buttons */}
          <div className="p-6 pt-4 flex items-center justify-between gap-4">
            <Button
              variant="outline"
              size="lg"
              onClick={handleSkip}
              className="glass hover:glass-strong border-border/50 hover:border-primary/50 transition-all duration-300 bg-transparent"
            >
              Skip for Now
            </Button>
            <Button
              size="lg"
              onClick={handleClose}
              className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 text-background font-bold glow-cyan transition-all duration-300"
            >
              Let's Get Started!
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
