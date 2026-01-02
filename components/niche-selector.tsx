"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Loader2, ChevronRight, Zap } from "lucide-react"

interface Niche {
  id: string
  name: string
  description: string
  icon: string
}

interface NicheSelectorProps {
  onSelect: (nicheId: string, nicheName: string) => void
}

// Completely NEW icons and names - nothing like P55
const NICHE_THEMES = {
  "Health & Fitness": { name: "Body Transformation Zone", icon: "🏋️", color: "from-[#ec4899] to-[#f97316]" },
  "Finance": { name: "Wealth Builder Network", icon: "💎", color: "from-[#06b6d4] to-[#0ea5e9]" },
  "Technology": { name: "Digital Innovation Hub", icon: "🖥️", color: "from-[#8b5cf6] to-[#ec4899]" },
  "Lifestyle": { name: "Living Large Community", icon: "🎨", color: "from-[#10b981] to-[#06b6d4]" },
  "Entertainment": { name: "Viral Fame Factory", icon: "🎭", color: "from-[#f59e0b] to-[#ec4899]" },
  "Education": { name: "Smart Skills Academy", icon: "🧠", color: "from-[#0ea5e9] to-[#8b5cf6]" },
  "Business": { name: "Empire Builder's Club", icon: "🏢", color: "from-[#ef4444] to-[#f97316]" },
  "Food": { name: "Flavor Fanatics Network", icon: "🍔", color: "from-[#fbbf24] to-[#f97316]" },
}

export function NicheSelector({ onSelect }: NicheSelectorProps) {
  const [niches, setNiches] = useState<Niche[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedId, setSelectedId] = useState<string | null>(null)

  useEffect(() => {
    const fetchNiches = async () => {
      const supabase = createClient()
      const { data } = await supabase.from("niches").select("*").order("name")
      if (data) setNiches(data)
      setLoading(false)
    }
    fetchNiches()
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-12 h-12 animate-spin text-[#0ea5e9]" />
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {niches.map((niche) => {
        const theme = NICHE_THEMES[niche.name as keyof typeof NICHE_THEMES] || { 
          name: niche.name, 
          icon: "⚡", 
          color: "from-[#0ea5e9] to-[#ec4899]" 
        }
        const isSelected = selectedId === niche.id

        return (
          <Button
            key={niche.id}
            onClick={() => {
              setSelectedId(niche.id)
              setTimeout(() => onSelect(niche.id, niche.name), 200)
            }}
            className={`w-full h-auto p-0 overflow-hidden group transition-all duration-300 ${
              isSelected 
                ? "scale-[1.02] shadow-2xl" 
                : "hover:scale-[1.01] shadow-lg"
            }`}
            variant="ghost"
          >
            <div className={`w-full flex items-center gap-6 p-6 rounded-2xl border-2 transition-all ${
              isSelected
                ? "border-white/40 bg-gradient-to-r " + theme.color
                : "border-[#0ea5e9]/30 bg-gradient-to-r from-[#0f172a]/90 to-[#1e293b]/90 hover:border-[#0ea5e9]/50"
            }`}>
              <div className={`flex-shrink-0 w-20 h-20 rounded-2xl flex items-center justify-center text-4xl transition-transform group-hover:scale-110 ${
                isSelected ? "bg-white/20" : "bg-[#0ea5e9]/20"
              }`}>
                {theme.icon}
              </div>
              
              <div className="flex-1 text-left">
                <h3 className="text-2xl font-black text-white mb-1">
                  {theme.name}
                </h3>
                <p className="text-sm text-[#7dd3fc] font-semibold">
                  Tap to target this niche →
                </p>
              </div>

              <div className={`flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center transition-all ${
                isSelected 
                  ? "bg-white/30" 
                  : "bg-[#0ea5e9]/20 group-hover:bg-[#0ea5e9]/30"
              }`}>
                {isSelected ? (
                  <Zap className="w-6 h-6 text-white fill-white animate-pulse" />
                ) : (
                  <ChevronRight className="w-6 h-6 text-[#0ea5e9] group-hover:translate-x-1 transition-transform" />
                )}
              </div>
            </div>
          </Button>
        )
      })}
    </div>
  )
}
