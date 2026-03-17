"use client"

import { useEffect, useState } from "react"
import { unlockUpgrade } from "@/app/actions/unlock-upgrade"
import { Button } from "@/components/ui/button"
import { CheckCircle2, Sparkles, ArrowRight, Loader2 } from "lucide-react"
import Link from "next/link"
import Confetti from "react-confetti"

interface UnlockUpgradeClientProps {
  upgradeLevel: "dfy_vault" | "instant_income" | "automated_income"
  upgradeName: string
  upgradeValue: string
  features: string[]
}

export function UnlockUpgradeClient({ upgradeLevel, upgradeName, upgradeValue, features }: UnlockUpgradeClientProps) {
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading")
  const [showConfetti, setShowConfetti] = useState(false)

  useEffect(() => {
    async function unlock() {
      const result = await unlockUpgrade(upgradeLevel)

      if (result.success) {
        setStatus("success")
        setShowConfetti(true)

        // Stop confetti after 5 seconds
        setTimeout(() => setShowConfetti(false), 5000)
      } else {
        setStatus("error")
      }
    }

    unlock()
  }, [upgradeLevel])

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0D0D0D]">
        <div className="text-center">
          <Loader2 className="w-20 h-20 text-[#B3FF00] animate-spin mx-auto mb-6" />
          <p className="text-lg font-black text-white uppercase tracking-widest">Activating Neural Link...</p>
        </div>
      </div>
    )
  }

  if (status === "error") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0D0D0D] p-6">
        <div className="max-w-md w-full glass-strong rounded-3xl p-10 border-2 border-red-500/20 text-center">
          <div className="w-20 h-20 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-4xl">⚠️</span>
          </div>
          <h1 className="text-3xl font-black text-white uppercase tracking-tight italic mb-3">Link Failed</h1>
          <p className="text-zinc-400 font-bold mb-8">
            The neural handshake failed. Please ensure you are authenticated and try again.
          </p>
          <Link href="/dashboard">
            <Button className="w-full bg-white/5 hover:bg-white/10 text-white font-black uppercase py-6 rounded-2xl border border-white/5">
              Return to Control Hub
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0D0D0D] p-6">
      {showConfetti && <Confetti recycle={false} numberOfPieces={500} />}

      <div className="max-w-2xl w-full glass-strong rounded-[2.5rem] p-12 border-2 border-[#B3FF00]/20 relative overflow-hidden">
        {/* Glow effect */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-1 bg-[#B3FF00]/40 blur-sm" />
        
        {/* Success Icon */}
        <div className="flex justify-center mb-8">
          <div className="relative">
            <div className="w-28 h-28 bg-[#B3FF00] rounded-full flex items-center justify-center shadow-[0_0_50px_rgba(179,255,0,0.3)]">
              <CheckCircle2 className="w-14 h-14 text-black" />
            </div>
            <Sparkles className="absolute -top-4 -right-4 w-10 h-10 text-[#B3FF00] animate-pulse" />
          </div>
        </div>

        {/* Success Message */}
        <div className="text-center mb-10">
          <p className="text-[10px] font-black text-[#B3FF00] uppercase tracking-[0.4em] mb-3">System Optimized</p>
          <h1 className="text-5xl font-black text-white uppercase tracking-tighter italic mb-4">ACCESS GRANTED</h1>
          <p className="text-xl text-zinc-400 font-bold">
            Neural access to <span className="text-white italic">{upgradeName}</span> is now active.
          </p>
        </div>

        {/* Upgrade Value */}
        <div className="bg-white/3 rounded-3xl p-8 mb-10 border border-white/5">
          <div className="flex items-center justify-between mb-8 pb-8 border-b border-white/5">
              <span className="text-zinc-500 font-black uppercase tracking-widest text-xs">Internal Value</span>
              <p className="text-3xl font-black text-[#B3FF00] italic">{upgradeValue}</p>
          </div>

          {/* Features */}
          <div className="space-y-4">
            <p className="text-white font-black uppercase tracking-widest text-xs mb-6 px-1">Active Protocols:</p>
            {features.map((feature, index) => (
              <div key={index} className="flex items-start gap-4 p-4 rounded-xl bg-white/2 hover:bg-white/5 transition-colors border border-transparent hover:border-white/5 group">
                <div className="w-5 h-5 rounded bg-[#B3FF00]/10 flex items-center justify-center group-hover:bg-[#B3FF00] transition-colors">
                  <CheckCircle2 className="w-3 h-3 text-[#B3FF00] group-hover:text-black transition-colors" />
                </div>
                <span className="text-zinc-300 font-bold text-sm tracking-tight">{feature}</span>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Link href="/dashboard">
            <Button className="w-full bg-[#B3FF00] hover:bg-[#B3FF00]/90 text-black font-black uppercase py-7 rounded-2xl flex items-center justify-center gap-2 group">
              Dashboard
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>

          <Link href="/training">
            <Button
              variant="outline"
              className="w-full border-white/10 text-white font-black uppercase py-7 rounded-2xl bg-white/3 hover:bg-white/7"
            >
              Access Labs
            </Button>
          </Link>
        </div>

        {/* Footer Message */}
        <p className="text-center text-zinc-600 text-[10px] font-black uppercase tracking-[0.2em] mt-10">
          Neural synchronization complete. Hardware acceleration enabled.
        </p>
      </div>
    </div>
  )
}
