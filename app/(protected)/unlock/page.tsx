"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Sparkles, ArrowRight, ShieldCheck, Zap, Crown } from "lucide-react"
import Link from "next/link"

const upgrades = [
  {
    title: "DFY Vault",
    description: "Get access to our private library of high-converting templates and assets.",
    url: "/unlock/dfy-vault",
    icon: ShieldCheck,
    color: "from-[#B3FF00] to-[#88C400]",
    level: "Basic Upgrade"
  },
  {
    title: "Instant Income",
    description: "Unlock the high-velocity income engine for immediate results.",
    url: "/unlock/instant-income",
    icon: Zap,
    color: "from-[#00F0FF] to-[#00A3FF]",
    level: "Pro Upgrade"
  },
  {
    title: "Automated Income",
    description: "The ultimate weapon for hands-free profits and full automation.",
    url: "/unlock/automated-income",
    icon: Crown,
    color: "from-[#7A5CFF] to-[#5C2BFF]",
    level: "Elite Upgrade"
  }
]

export default function UnlockPage() {
  return (
    <div className="max-w-6xl mx-auto space-y-12 py-10">
      <div className="text-center space-y-4">
        <h1 className="text-6xl font-black text-white tracking-tight uppercase italic flex items-center justify-center gap-4">
          <Sparkles className="w-12 h-12 text-[#B3FF00]" />
          UNLOCK <span className="text-[#B3FF00]">PREMIUM</span>
        </h1>
        <p className="text-xl text-zinc-400 font-bold max-w-2xl mx-auto">
          Activate your purchased upgrades and unleash the full power of the high-velocity profit system.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {upgrades.map((upgrade) => {
          const Icon = upgrade.icon
          return (
            <Card key={upgrade.title} className="glass-strong border-2 border-white/5 bg-[#111111] p-8 flex flex-col group hover:border-[#B3FF00]/30 transition-all duration-300">
              <div className={`w-16 h-16 rounded-2xl bg-linear-to-br ${upgrade.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                <Icon className="w-8 h-8 text-black" />
              </div>
              
              <div className="flex-1 space-y-4">
                <div>
                  <p className="text-[10px] font-black text-[#B3FF00] uppercase tracking-widest mb-1">{upgrade.level}</p>
                  <h3 className="text-2xl font-black text-white tracking-tight uppercase italic">{upgrade.title}</h3>
                </div>
                
                <p className="text-zinc-500 font-bold text-sm leading-relaxed">
                  {upgrade.description}
                </p>
              </div>

              <Link href={upgrade.url} className="mt-8">
                <Button className="w-full bg-[#B3FF00] hover:bg-[#B3FF00]/90 text-black font-black uppercase tracking-tighter flex items-center justify-between group-hover:gap-4 transition-all h-12 rounded-xl">
                  <span>Activate Now</span>
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
            </Card>
          )
        })}
      </div>

      <p className="text-center text-zinc-600 text-sm font-black uppercase tracking-widest mt-10">
        All upgrades are protected by our satisfaction guarantee.
      </p>
    </div>
  )
}
