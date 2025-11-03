"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { Card, CardContent } from "@/components/ui/card"
import { Loader2 } from "lucide-react"

interface Niche {
  id: string
  name: string
  description: string
  icon: string
}

interface NicheSelectorProps {
  onSelect: (nicheId: string) => void
}

export function NicheSelector({ onSelect }: NicheSelectorProps) {
  const [niches, setNiches] = useState<Niche[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchNiches = async () => {
      const supabase = createClient()
      const { data, error } = await supabase.from("niches").select("*").order("name")

      if (data) {
        setNiches(data)
      }
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
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold text-foreground">Choose Your Niche</h2>
        <p className="text-lg text-muted-foreground">Select the market you want to promote in</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {niches.map((niche) => (
          <Card
            key={niche.id}
            className="glass glow-cyan border-border/50 cursor-pointer hover:scale-105 transition-all duration-300"
            onClick={() => onSelect(niche.id)}
          >
            <CardContent className="p-6 text-center space-y-4">
              <div className="text-6xl">{niche.icon}</div>
              <div>
                <h3 className="text-2xl font-bold text-foreground mb-2">{niche.name}</h3>
                <p className="text-base text-muted-foreground leading-relaxed">{niche.description}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
