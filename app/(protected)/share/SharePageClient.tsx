"use client"

import { useEffect, useState } from "react"
import { Facebook, Twitter, Linkedin, Mail, MessageCircle, Copy, Link as LinkIcon, Flame, TrendingUp, Target } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { createClient } from "@/lib/supabase/client"

export default function SharePageClient() {
  const [pages, setPages] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [copiedId, setCopiedId] = useState<string | null>(null)

  useEffect(() => {
    async function fetchPages() {
      const supabase = createClient()
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) {
        setIsLoading(false)
        return
      }

      const { data } = await supabase
        .from("pages")
        .select("id, title, created_at, views, status, user_id")
        .eq("user_id", user.id)
        .eq("status", "active")
        .order("created_at", { ascending: false })

      setPages(data || [])
      setIsLoading(false)
    }

    fetchPages()
  }, [])

  const copyLink = (pageId: string) => {
    navigator.clipboard.writeText(`${window.location.origin}/article/${pageId}`)
    setCopiedId(pageId)
    setTimeout(() => setCopiedId(null), 2000)
  }

  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-20 h-20 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-xl text-primary font-black uppercase tracking-widest">Loading Arsenal...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto space-y-10">
      {/* Header */}
      <div className="space-y-4">
        <div className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-linear-to-r from-primary/20 to-secondary/20 border-2 border-primary/40">
          <Target className="w-5 h-5 text-primary" />
          <span className="text-sm font-black text-white uppercase tracking-wider">Distribution Command</span>
        </div>
        <h1 className="text-6xl font-black text-white tracking-tight">Deployment Center</h1>
        <p className="text-2xl text-secondary font-bold">
          Copy links, blast social media, and spread your comment packs everywhere 🚀
        </p>
      </div>

      {!pages || pages.length === 0 ? (
        <Card className="glass-strong border-2 border-primary/40 glow-gold">
          <CardContent className="p-16 text-center space-y-8">
            <div className="w-32 h-32 rounded-3xl bg-linear-to-br from-primary/20 to-secondary/20 flex items-center justify-center mx-auto border-2 border-primary/40">
              <LinkIcon className="w-16 h-16 text-primary" />
            </div>
            <div>
              <h2 className="text-4xl font-black text-white mb-4">No Packs to Deploy Yet</h2>
              <p className="text-xl text-secondary font-semibold">
                Generate your first comment pack, then come back here to spread it
              </p>
            </div>
            <Button asChild className="h-20 px-12 text-2xl font-black bg-linear-to-r from-primary to-secondary text-primary-foreground rounded-2xl shadow-2xl glow-gold">
              <a href="/create">
                <Flame className="w-6 h-6 mr-3" />
                Create First Pack
              </a>
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-6">
          {pages.map((page) => (
            <Card key={page.id} className="glass-strong border-2 border-primary/30 hover:border-primary/50 transition-all duration-300">
              <CardHeader className="border-b-2 border-primary/20 pb-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-3xl font-black text-white mb-3">{page.title}</CardTitle>
                    <div className="flex items-center gap-4 text-sm">
                      <div className="flex items-center gap-2">
                        <TrendingUp className="w-4 h-4 text-primary" />
                        <span className="text-secondary font-bold">{page.views || 0} Opens</span>
                      </div>
                      <span className="text-secondary/50">•</span>
                      <span className="text-secondary font-semibold">
                        Created {new Date(page.created_at).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                  <div className="px-4 py-2 rounded-xl bg-primary/20 border-2 border-primary/40 text-primary text-sm font-black">
                    ACTIVE
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-6 pt-6">
                {/* Quick Copy Link */}
                <div className="glass rounded-2xl p-4 border-2 border-primary/30">
                  <div className="flex items-center gap-3">
                    <Input
                      value={`${window.location.origin}/article/${page.id}`}
                      readOnly
                      className="flex-1 bg-transparent border-0 text-white font-mono text-base h-12"
                    />
                    <Button
                      onClick={() => copyLink(page.id)}
                      className={`h-12 px-6 font-black rounded-xl transition-all ${
                        copiedId === page.id
                          ? "bg-primary text-primary-foreground"
                          : "bg-linear-to-r from-primary to-secondary text-primary-foreground shadow-lg"
                      }`}
                    >
                      {copiedId === page.id ? (
                        <>✓ Copied!</>
                      ) : (
                        <>
                          <Copy className="w-5 h-5 mr-2" />
                          Copy Link
                        </>
                      )}
                    </Button>
                  </div>
                </div>

                {/* Social Blast Buttons */}
                <div className="space-y-4">
                  <h4 className="text-lg font-black text-white">Social Media Blast:</h4>
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                    <Button
                      className="h-16 glass-strong hover:scale-105 border-2 border-[#1877f2]/40 hover:border-[#1877f2] hover:text-[#1877f2] transition-all font-bold"
                      onClick={() => {
                        window.open(
                          `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(`${window.location.origin}/article/${page.id}`)}`,
                          "_blank",
                        )
                      }}
                    >
                      <Facebook className="w-5 h-5 mr-2" />
                      Facebook
                    </Button>

                    <Button
                      className="h-16 glass-strong hover:scale-105 border-2 border-[#1da1f2]/40 hover:border-[#1da1f2] hover:text-[#1da1f2] transition-all font-bold"
                      onClick={() => {
                        window.open(
                          `https://twitter.com/intent/tweet?url=${encodeURIComponent(`${window.location.origin}/article/${page.id}`)}&text=${encodeURIComponent(page.title)}`,
                          "_blank",
                        )
                      }}
                    >
                      <Twitter className="w-5 h-5 mr-2" />
                      Twitter
                    </Button>

                    <Button
                      className="h-16 glass-strong hover:scale-105 border-2 border-[#0077b5]/40 hover:border-[#0077b5] hover:text-[#0077b5] transition-all font-bold"
                      onClick={() => {
                        window.open(
                          `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(`${window.location.origin}/article/${page.id}`)}`,
                          "_blank",
                        )
                      }}
                    >
                      <Linkedin className="w-5 h-5 mr-2" />
                      LinkedIn
                    </Button>

                    <Button
                      className="h-16 glass-strong hover:scale-105 border-2 border-[#25d366]/40 hover:border-[#25d366] hover:text-[#25d366] transition-all font-bold"
                      onClick={() => {
                        window.open(
                          `https://wa.me/?text=${encodeURIComponent(`${page.title} - ${window.location.origin}/article/${page.id}`)}`,
                          "_blank",
                        )
                      }}
                    >
                      <MessageCircle className="w-5 h-5 mr-2" />
                      WhatsApp
                    </Button>

                    <Button
                      className="h-16 glass-strong hover:scale-105 border-2 border-primary/40 hover:border-primary hover:text-primary transition-all font-bold"
                      onClick={() => {
                        window.location.href = `mailto:?subject=${encodeURIComponent(page.title)}&body=${encodeURIComponent(`Check this out: ${window.location.origin}/article/${page.id}`)}`
                      }}
                    >
                      <Mail className="w-5 h-5 mr-2" />
                      Email
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Pro Tips */}
      <Card className="glass-strong border-2 border-primary/40 glow-gold">
        <CardHeader>
          <CardTitle className="text-3xl font-black text-white flex items-center gap-3">
            <Flame className="w-8 h-8 text-primary" />
            Distribution Pro Tips
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6 text-lg">
            <div className="space-y-2">
              <h4 className="font-black text-primary">💎 Post When It's Hot</h4>
              <p className="text-secondary font-semibold">
                Peak times: 1-3 PM weekdays for max engagement
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="font-black text-secondary">💎 Mix Your Content</h4>
              <p className="text-secondary font-semibold">
                Don't spam links - add value, then share
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="font-black text-primary">💎 Track What Works</h4>
              <p className="text-secondary font-semibold">
                Check your Opens - double down on winners
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="font-black text-secondary">💎 Be Consistent</h4>
              <p className="text-secondary font-semibold">
                Daily shares = more eyeballs = more results
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
