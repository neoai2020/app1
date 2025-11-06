"use client"

import { useEffect } from "react"
import Link from "next/link"

export default function BonusTrainingPage() {
  useEffect(() => {
    // Load the video player script
    const script = document.createElement("script")
    script.src =
      "https://scripts.converteai.net/6aca37b8-079c-44ce-b2b1-3cd32f55a27d/players/690b19c2cb5344d7fad33ce0/player.js"
    script.async = true
    script.id = "scr_690b19c2cb5344d7fad33ce0"

    // Add error handling
    script.onerror = () => {
      console.error("[v0] Failed to load video player script")
    }

    document.head.appendChild(script)

    return () => {
      // Cleanup script on unmount
      const existingScript = document.getElementById("scr_690b19c2cb5344d7fad33ce0")
      if (existingScript) {
        existingScript.remove()
      }
    }
  }, [])

  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Headline Section */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
            Watch The Bonus Training That Took Me To Earning{" "}
            <span className="text-emerald-500">$1,000-5,000 Per Day</span>...
          </h1>
        </div>

        {/* Video Section */}
        <div className="mb-8">
          <div id="vid_690b19c2cb5344d7fad33ce0" style={{ position: "relative", width: "100%", padding: "56.25% 0 0" }}>
            <img
              id="thumb_690b19c2cb5344d7fad33ce0"
              src="https://images.converteai.net/6aca37b8-079c-44ce-b2b1-3cd32f55a27d/players/690b19c2cb5344d7fad33ce0/thumbnail.jpg"
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                objectFit: "cover",
                display: "block",
              }}
              alt="Bonus Training Video"
            />
            <div
              id="backdrop_690b19c2cb5344d7fad33ce0"
              style={{
                WebkitBackdropFilter: "blur(5px)",
                backdropFilter: "blur(5px)",
                position: "absolute",
                top: 0,
                height: "100%",
                width: "100%",
              }}
            />
          </div>
        </div>

        {/* CTA Button */}
        <div className="w-full">
          <Link
            href="https://freedomescapexcelerator.com/2k-per-day"
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full bg-[#FFD700] hover:bg-[#FFC700] text-black text-2xl md:text-3xl font-black py-8 px-8 rounded-lg text-center transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            Click Here To Continue &gt;&gt;
          </Link>
        </div>
      </div>
    </div>
  )
}
