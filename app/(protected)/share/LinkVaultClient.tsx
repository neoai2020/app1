"use client"

import { useEffect, useState } from "react"
import { Plus, ExternalLink, Edit2, Trash2, Copy, Flame, DollarSign, TrendingUp, Zap, BarChart2 } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { createClient } from "@/lib/supabase/client"

interface AffiliateLink {
  id: string
  niche: string
  title: string
  offer_name?: string
  affiliate_link: string
  notes?: string
  created_at: string
}

export default function LinkVaultClient() {
  const [links, setLinks] = useState<AffiliateLink[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isAdding, setIsAdding] = useState(false)
  const [copiedId, setCopiedId] = useState<string | null>(null)

  // Form state
  const [niche, setNiche] = useState("")
  const [offerName, setOfferName] = useState("")
  const [affiliateLink, setAffiliateLink] = useState("")
  const [notes, setNotes] = useState("")

  useEffect(() => {
    fetchLinks()
  }, [])

  const fetchLinks = async () => {
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()
    
    if (!user) {
      setIsLoading(false)
      return
    }

    // For now, using pages table to store affiliate links
    // In production, create a separate affiliate_links table
    const { data } = await supabase
      .from("pages")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })

    setLinks(data || [])
    setIsLoading(false)
  }

  const handleAddLink = async () => {
    if (!offerName || !affiliateLink) return

    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()
    
    if (!user) return

    await supabase.from("pages").insert({
      user_id: user.id,
      title: offerName,
      affiliate_link: affiliateLink,
      content: notes || "",
      status: "active",
    })

    // Reset form
    setOfferName("")
    setAffiliateLink("")
    setNotes("")
    setIsAdding(false)
    
    // Refresh list
    fetchLinks()
  }

  const copyLink = (link: string, id: string) => {
    navigator.clipboard.writeText(link)
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 2000)
  }

  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-20 h-20 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-xl text-primary font-black uppercase tracking-widest">Loading Links...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto space-y-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-8">
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#B3FF00]/10 border border-[#B3FF00]/20">
            <DollarSign className="w-4 h-4 text-[#B3FF00]" />
            <span className="text-[10px] font-black text-white uppercase tracking-[0.2em]">Affiliate Protocol v4.0</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-1.5 h-12 bg-[#B3FF00] rounded-full" />
            <h1 className="text-6xl font-black text-white tracking-tighter uppercase italic">LINK HUB</h1>
          </div>
          <p className="text-xl text-zinc-500 font-bold uppercase tracking-tight">
            Manage your high-velocity profit vectors 💰
          </p>
        </div>

        <Button
          onClick={() => setIsAdding(!isAdding)}
          className="h-16 px-10 text-lg font-black bg-[#B3FF00] hover:bg-[#B3FF00]/90 text-black rounded-2xl shadow-[0_8px_30px_rgba(179,255,0,0.2)] group transition-all shrink-0"
        >
          <Plus className="w-6 h-6 mr-3 group-hover:rotate-90 transition-transform" />
          ADD NEW VECTOR
        </Button>
      </div>

      {/* Add Link Form */}
      {isAdding && (
        <Card className="glass-strong border-2 border-[#B3FF00]/30 bg-[#111111] animate-in slide-in-from-top-4 duration-500 rounded-4xl overflow-hidden relative">
          <div className="absolute top-0 left-0 w-full h-1 bg-[#B3FF00]/40" />
          <CardHeader className="p-8 pb-4">
            <CardTitle className="text-3xl font-black text-white uppercase italic tracking-tight">CONFIGURE NEW LINK</CardTitle>
          </CardHeader>
          <CardContent className="p-8 pt-4 space-y-8">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-3">
                <Label className="text-zinc-500 font-black uppercase tracking-widest text-[10px] ml-1">Market Niche</Label>
                <Input
                  value={niche}
                  onChange={(e) => setNiche(e.target.value)}
                  placeholder="e.g. Weight Loss, Wealth"
                  className="h-14 bg-white/2 border-2 border-white/5 focus:border-[#B3FF00]/30 text-white rounded-2xl transition-all font-bold placeholder:text-zinc-700"
                />
              </div>
              <div className="space-y-3">
                <Label className="text-zinc-500 font-black uppercase tracking-widest text-[10px] ml-1">Offer Identity</Label>
                <Input
                  value={offerName}
                  onChange={(e) => setOfferName(e.target.value)}
                  placeholder="e.g. Meta-Profit System"
                  className="h-14 bg-white/2 border-2 border-white/5 focus:border-[#B3FF00]/30 text-white rounded-2xl transition-all font-bold placeholder:text-zinc-700"
                />
              </div>
            </div>

            <div className="space-y-3">
              <Label className="text-zinc-500 font-black uppercase tracking-widest text-[10px] ml-1">Affiliate Endpoint (URL)</Label>
              <Input
                value={affiliateLink}
                onChange={(e) => setAffiliateLink(e.target.value)}
                placeholder="https://hop.clickbank.net/..."
                className="h-14 bg-white/2 border-2 border-white/5 focus:border-[#B3FF00]/30 text-white font-mono rounded-2xl transition-all placeholder:text-zinc-700"
              />
            </div>

            <div className="space-y-3">
              <Label className="text-zinc-500 font-black uppercase tracking-widest text-[10px] ml-1">Operational Intel (Notes)</Label>
              <Textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Conversion rate, traffic requirements, etc."
                className="bg-white/2 border-2 border-white/5 focus:border-[#B3FF00]/30 text-white rounded-2xl transition-all font-bold placeholder:text-zinc-700 p-6 min-h-[120px]"
              />
            </div>

            <div className="flex gap-4 pt-4">
              <Button
                onClick={handleAddLink}
                className="h-16 px-12 font-black bg-[#B3FF00] text-black rounded-2xl shadow-xl hover:scale-105 transition-all text-lg uppercase italic"
              >
                SAVE VECTOR
              </Button>
              <Button
                onClick={() => setIsAdding(false)}
                variant="outline"
                className="h-16 px-10 font-black border-2 border-white/5 text-zinc-500 rounded-2xl hover:bg-white/5 hover:text-white transition-all uppercase"
              >
                CANCEL
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Links List */}
      {links.length === 0 ? (
        <Card className="glass-strong border-2 border-white/5 bg-[#111111] rounded-[2.5rem] overflow-hidden">
          <CardContent className="p-24 text-center space-y-10">
            <div className="w-40 h-40 rounded-5xl bg-white/2 flex items-center justify-center mx-auto border-2 border-white/5">
              <DollarSign className="w-20 h-20 text-[#B3FF00] drop-shadow-[0_0_20px_rgba(179,255,0,0.3)]" />
            </div>
            <div className="space-y-4">
              <h2 className="text-4xl font-black text-white uppercase tracking-tighter italic">VAULT OFFLINE</h2>
              <p className="text-xl text-zinc-500 font-bold max-w-xl mx-auto">
                No active profit vectors detected. Initialize your first link protocol to begin.
              </p>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {links.map((link) => (
            <Card key={link.id} className="glass-strong border-2 border-white/5 bg-[#111111] hover:border-[#B3FF00]/20 transition-all duration-500 group rounded-4xl overflow-hidden">
              <CardContent className="p-10">
                <div className="flex flex-col lg:flex-row items-center justify-between gap-10">
                  <div className="flex-1 space-y-6 w-full">
                    <div className="flex items-center justify-between">
                       <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-2xl bg-[#B3FF00]/10 flex items-center justify-center border border-[#B3FF00]/20 group-hover:bg-[#B3FF00] transition-all">
                             <Zap className="w-6 h-6 text-[#B3FF00] group-hover:text-black" />
                          </div>
                          <div>
                            <h3 className="text-3xl font-black text-white uppercase italic tracking-tighter group-hover:text-[#B3FF00] transition-colors">{link.title}</h3>
                            <p className="text-[10px] text-zinc-600 font-black uppercase tracking-[0.3em] mt-1">
                              VECTOR LOGGED: {new Date(link.created_at).toLocaleDateString()}
                            </p>
                          </div>
                       </div>
                    </div>

                    <div className="glass rounded-2xl p-4 border border-white/5 bg-black/40 flex items-center gap-4 group-hover:bg-black/60 transition-all">
                      <code className="flex-1 text-zinc-400 font-mono text-xs truncate select-none opacity-50">
                        {link.affiliate_link}
                      </code>
                      <Button
                        onClick={() => copyLink(link.affiliate_link, link.id)}
                        className={`h-12 px-6 font-black rounded-xl transition-all shadow-lg uppercase italic tracking-tight ${
                          copiedId === link.id
                            ? "bg-white text-black scale-95"
                            : "bg-[#B3FF00] text-black hover:bg-[#B3FF00]/90"
                        }`}
                      >
                       {copiedId === link.id ? "DEPLOYED" : "COPY LINK"}
                      </Button>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 w-full lg:w-auto">
                    <Button
                      onClick={() => window.open(link.affiliate_link, "_blank")}
                      className="h-16 w-16 glass-strong border-2 border-white/5 hover:border-[#B3FF00]/50 rounded-2xl transition-all shrink-0 flex items-center justify-center p-0 group/btn"
                    >
                      <ExternalLink className="w-7 h-7 text-white group-hover/btn:text-[#B3FF00] transition-colors" />
                    </Button>
                    
                    <div className="flex-1 lg:flex-none glass-strong border border-white/5 px-8 py-4 rounded-2xl bg-white/2 text-center">
                        <p className="text-[10px] font-black text-zinc-600 uppercase tracking-widest mb-1">Status</p>
                        <p className="text-lg font-black text-[#B3FF00] uppercase italic">ACTIVE</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Strategic Intelligence */}
      <Card className="glass-strong border-2 border-white/5 bg-[#111111] rounded-[2.5rem] overflow-hidden group">
        <div className="absolute top-0 right-0 w-24 h-24 bg-[#B3FF00]/5 rounded-bl-[100%] blur-2xl" />
        <CardHeader className="p-12 pb-6">
          <CardTitle className="text-4xl font-black text-white flex items-center gap-4 uppercase italic">
            <Flame className="w-10 h-10 text-[#B3FF00]" />
            VAULT PROTOCOLS
          </CardTitle>
        </CardHeader>
        <CardContent className="p-12 pt-0">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { title: "Niche Alignment", text: "Match vectors to the correct viral environment.", icon: BarChart2 },
              { title: "Multi-Offer Load", text: "Deploy several vectors to test maximum ROI.", icon: TrendingUp },
              { title: "Secure Tracking", text: "Always use internal shorteners for analysis.", icon: Zap },
              { title: "High-Margin Extraction", text: "Focus on $100+ commissions for power scale.", icon: DollarSign }
            ].map((tip, i) => (
              <div key={i} className="space-y-4 p-6 rounded-3xl bg-white/2 border border-white/5 hover:bg-white/3 transition-all group-hover:translate-y-[-4px]">
                <div className="w-10 h-10 bg-[#B3FF00]/10 rounded-xl flex items-center justify-center">
                   <tip.icon className="w-5 h-5 text-[#B3FF00]" />
                </div>
                <h4 className="font-black text-white uppercase italic tracking-tight text-lg">{tip.title}</h4>
                <p className="text-zinc-500 font-bold text-sm leading-relaxed">
                  {tip.text}
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

