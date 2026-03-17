import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Eye, Copy, Calendar, Zap, Flame, ExternalLink, Youtube, MessageCircle, Sparkles } from "lucide-react"
import Link from "next/link"
import { PageActions } from "@/components/page-actions"

export default async function MyVaultPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) {
    redirect("/auth/login")
  }

  // Fetch user's pages with niche details
  const { data: pages } = await supabase
    .from("pages")
    .select(
      `
      *,
      niches (name, icon)
    `,
    )
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })

  return (
    <div className="max-w-7xl mx-auto space-y-12">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-1.5 h-8 bg-[#B3FF00] rounded-full" />
            <h1 className="text-5xl font-black text-white tracking-tighter uppercase italic">ASSET LIBRARY</h1>
          </div>
          <p className="text-xl text-zinc-500 font-bold uppercase tracking-tight">Access your tactical comment payloads</p>
        </div>
        <Button asChild className="h-16 px-10 text-lg font-black bg-[#B3FF00] hover:bg-[#B3FF00]/90 text-black rounded-2xl shadow-[0_4px_20px_rgba(179,255,0,0.3)] group transition-all" size="lg">
          <Link href="/create">
            <Flame className="w-6 h-6 mr-3 group-hover:animate-bounce" />
            GENERATE NEW PACK
          </Link>
        </Button>
      </div>

      {!pages || pages.length === 0 ? (
        <Card className="glass-strong border-2 border-white/5 bg-[#111111] overflow-hidden group">
          <div className="absolute top-0 left-0 w-full h-1 bg-[#B3FF00]/20" />
          <CardContent className="p-20 text-center space-y-10">
            <div className="w-40 h-40 rounded-[2.5rem] bg-white/3 flex items-center justify-center mx-auto border-2 border-white/5 relative group-hover:border-[#B3FF00]/30 transition-all">
              <Zap className="w-20 h-20 text-[#B3FF00] drop-shadow-[0_0_15px_rgba(179,255,0,0.4)]" />
              <Sparkles className="absolute -top-4 -right-4 w-12 h-12 text-[#B3FF00]/50 animate-pulse" />
            </div>
            <div className="space-y-4">
              <h2 className="text-4xl font-black text-white uppercase tracking-tighter italic">Varying protocols detected...</h2>
              <p className="text-xl text-zinc-500 font-bold max-w-xl mx-auto">
                No active comment packs found in your secure vault. Start a search and capture session to populate your library.
              </p>
            </div>
            <Button asChild className="h-20 px-16 text-2xl font-black bg-[#B3FF00] hover:bg-[#B3FF00]/90 text-black rounded-2xl shadow-2xl transition-all hover:scale-105" size="lg">
              <Link href="/create">
                <Flame className="w-8 h-8 mr-4" />
                INITIATE GENERATOR
              </Link>
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 gap-8">
          {pages.map((page) => {
            // Parse comment pack to get count
            let commentCount = 0
            try {
              const pack = JSON.parse(page.content || '{"comments":[]}')
              commentCount = Array.isArray(pack.comments) ? pack.comments.length : (Array.isArray(pack) ? pack.length : 0)
            } catch {
              commentCount = 0
            }

            return (
              <Card key={page.id} className="glass-strong border-2 border-white/5 bg-[#111111] overflow-hidden group hover:border-[#B3FF00]/30 transition-all duration-500 relative">
                <div className="absolute top-0 left-0 w-1 h-full bg-[#B3FF00]/0 group-hover:bg-[#B3FF00]/40 transition-all" />
                
                <CardHeader className="p-8 pb-4">
                  <div className="flex flex-col lg:flex-row items-start justify-between gap-8">
                    <div className="flex-1 space-y-6 w-full">
                      <div className="flex items-center gap-6">
                        <div className="w-20 h-20 rounded-3xl bg-white/3 flex items-center justify-center text-4xl border-2 border-white/5 group-hover:bg-[#B3FF00]/10 group-hover:border-[#B3FF00]/30 transition-all transform group-hover:rotate-12">
                          {page.niches?.icon || "💎"}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-3 mb-2">
                             <span className="text-[10px] font-black text-[#B3FF00] uppercase tracking-[0.3em] bg-[#B3FF00]/10 px-3 py-1 rounded-full border border-[#B3FF00]/20">Active Asset</span>
                             <span className="text-[10px] font-black text-zinc-600 uppercase tracking-widest">{new Date(page.created_at).toLocaleDateString()}</span>
                          </div>
                          <CardTitle className="text-3xl font-black text-white mb-2 uppercase italic tracking-tight truncate">
                            {page.offer_name || "UNNAMED PROTOCOL"}
                          </CardTitle>
                          <div className="flex items-center gap-2 text-zinc-500 font-bold text-sm">
                            <Youtube className="w-4 h-4 text-red-500" />
                            <span className="truncate">{page.video_title || page.title}</span>
                          </div>
                        </div>
                      </div>
                      
                      {/* Operational Guidelines */}
                      <div className="bg-white/2 rounded-2xl p-6 border border-white/5 group-hover:bg-white/3 transition-colors">
                        <div className="flex items-start gap-4">
                          <div className="w-10 h-10 rounded-xl bg-[#B3FF00]/10 flex items-center justify-center shrink-0 border border-[#B3FF00]/20">
                            <Zap className="w-5 h-5 text-[#B3FF00]" />
                          </div>
                          <div>
                            <p className="font-black text-white uppercase tracking-widest text-xs mb-3">Deployment Sequence:</p>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2">
                               {[
                                 { id: "01", text: "Select comment payload" },
                                 { id: "02", text: "Execute one-click copy" },
                                 { id: "03", text: "Access targeting video" },
                                 { id: "04", text: "Deploy and capture traffic" }
                               ].map(step => (
                                 <div key={step.id} className="flex items-center gap-3">
                                   <span className="text-[10px] font-black text-[#B3FF00]/40 tracking-tighter">{step.id}</span>
                                   <span className="text-zinc-500 font-bold text-xs uppercase">{step.text}</span>
                                 </div>
                               ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-row lg:flex-col items-center gap-4 w-full lg:w-auto">
                      <div className="px-6 py-2.5 rounded-full text-xs font-black border-2 bg-black text-[#B3FF00] border-[#B3FF00]/30 uppercase tracking-[0.2em] shadow-[0_0_15px_rgba(179,255,0,0.1)]">
                        {page.status || "STANDBY"}
                      </div>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="p-8 pt-4 space-y-8">
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    {[
                      { icon: MessageCircle, label: "Payloads", val: commentCount, color: "text-[#B3FF00]" },
                      { icon: Eye, label: "Analysis", val: page.views || 0, color: "text-white" },
                      { icon: Copy, label: "Executions", val: page.clicks || 0, color: "text-white" },
                      { icon: Zap, label: "Velocity", val: "94%", color: "text-white" }
                    ].map((stat, i) => (
                      <div key={i} className="glass rounded-2xl p-4 border border-white/5 bg-white/2 hover:bg-white/5 transition-all group/stat">
                        <stat.icon className={`w-4 h-4 ${stat.color} mb-3 group-hover/stat:scale-125 transition-transform`} />
                        <p className="text-3xl font-black text-white tracking-tighter italic">{stat.val}</p>
                        <p className="text-[10px] text-zinc-600 font-black uppercase tracking-widest mt-1">{stat.label}</p>
                      </div>
                    ))}
                  </div>

                  <div className="pt-4 border-t border-white/5">
                    <PageActions pageId={page.id} status={page.status} affiliateLink={page.video_url || page.affiliate_link} videoUrl={page.video_url} />
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      )}
    </div>
  )
}
