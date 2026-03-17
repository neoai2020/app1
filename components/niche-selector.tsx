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
  "Health & Fitness": { name: "Body Transformation Zone", icon: "🏋️", color: "from-primary to-secondary" },
  "Finance": { name: "Wealth Builder Network", icon: "💎", color: "from-primary to-accent" },
  "Technology": { name: "Digital Innovation Hub", icon: "🖥️", color: "from-secondary to-accent" },
  "Lifestyle": { name: "Living Large Community", icon: "🎨", color: "from-primary to-secondary" },
  "Entertainment": { name: "Viral Fame Factory", icon: "🎭", color: "from-primary to-accent" },
  "Education": { name: "Smart Skills Academy", icon: "🧠", color: "from-secondary to-accent" },
  "Business": { name: "Empire Builder's Club", icon: "🏢", color: "from-primary to-secondary" },
  "Food": { name: "Flavor Fanatics Network", icon: "🍔", color: "from-primary to-accent" },
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
        <Loader2 className="w-12 h-12 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {niches.map((niche) => {
        const theme = NICHE_THEMES[niche.name as keyof typeof NICHE_THEMES] || { 
          name: niche.name, 
          icon: "⚡", 
          color: "from-primary to-secondary" 
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
                ? "border-white/40 bg-linear-to-r " + theme.color
                : "border-primary/30 bg-linear-to-r from-background to-card hover:border-primary/50"
            }`}>
              <div className={`shrink-0 w-20 h-20 rounded-2xl flex items-center justify-center text-4xl transition-transform group-hover:scale-110 ${
                isSelected ? "bg-white/20" : "bg-primary/20"
              }`}>
                {theme.icon}
              </div>
              
              <div className="flex-1 text-left">
                <h3 className="text-2xl font-black text-white mb-1">
                  {theme.name}
                </h3>
                <p className="text-sm text-secondary font-semibold">
                  Tap to target this niche →
                </p>
              </div>

              <div className={`shrink-0 w-12 h-12 rounded-xl flex items-center justify-center transition-all ${
                isSelected 
                  ? "bg-white/30" 
                  : "bg-primary/20 group-hover:bg-primary/30"
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
