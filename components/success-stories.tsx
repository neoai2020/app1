"use client"

import { useEffect, useState } from "react"
import { CheckCircle2, MessageCircle } from "lucide-react"

const SUCCESS_STORIES = [
  { name: "Sarah M.", amount: 14, action: "got replies after posting early" },
  { name: "Mike T.", amount: 9, action: "saved comment packs this week" },
  { name: "Jessica R.", amount: 6, action: "posted questions that got answers" },
  { name: "David K.", amount: 11, action: "copied comments and tweaked them" },
  { name: "Emily W.", amount: 7, action: "kept a 7-day consistency streak" },
  { name: "Chris P.", amount: 5, action: "found 5 strong Shorts in 10 minutes" },
  { name: "Amanda L.", amount: 12, action: "got likes on thoughtful comments" },
  { name: "Ryan B.", amount: 8, action: "replied to every response" },
  { name: "Nicole H.", amount: 10, action: "posted a mix of reactions + questions" },
  { name: "Brandon S.", amount: 6, action: "avoided spam and stayed safe" },
]

export function SuccessStories() {
  const [currentStory, setCurrentStory] = useState<(typeof SUCCESS_STORIES)[0] | null>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const showRandomStory = () => {
      const randomStory = SUCCESS_STORIES[Math.floor(Math.random() * SUCCESS_STORIES.length)]
      setCurrentStory(randomStory)
      setIsVisible(true)

      setTimeout(() => {
        setIsVisible(false)
      }, 5000)
    }

    // Show first story after 3 seconds
    const initialTimeout = setTimeout(showRandomStory, 3000)

    // Then show a new story every 60-120 seconds
    const interval = setInterval(
      () => {
        showRandomStory()
      },
      60000 + Math.random() * 60000,
    )

    return () => {
      clearTimeout(initialTimeout)
      clearInterval(interval)
    }
  }, [])

  if (!currentStory || !isVisible) return null

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-in slide-in-from-bottom-5 fade-in duration-500">
      <div className="bg-gradient-to-r from-emerald-500 to-cyan-500 p-[2px] rounded-lg shadow-2xl shadow-emerald-500/50">
        <div className="bg-background rounded-lg p-4 flex items-start gap-3 min-w-[320px] max-w-[400px]">
          <div className="flex-shrink-0 mt-1">
            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-bold text-foreground mb-1">
              {currentStory.name} just {currentStory.action}!
            </p>
            <div className="flex items-center gap-2">
              <MessageCircle className="w-4 h-4 text-emerald-400" />
              <p className="text-lg font-black text-emerald-400">{currentStory.amount.toLocaleString()}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
