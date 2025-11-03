"use client"

import { useEffect, useState } from "react"
import {
  Facebook,
  Twitter,
  Linkedin,
  Mail,
  MessageCircle,
  Copy,
  QrCode,
  Code,
  TrendingUp,
  Sparkles,
  Share2,
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { createClient } from "@/lib/supabase/client"

export default function SharePageClient() {
  const [pages, setPages] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)

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
        .select("*")
        .eq("user_id", user.id)
        .eq("status", "active")
        .order("created_at", { ascending: false })

      setPages(data || [])
      setIsLoading(false)
    }

    fetchPages()
  }, [])

  if (isLoading) {
    return (
      <div className="min-h-screen p-8 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-xl text-muted-foreground">Loading your pages...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="space-y-2">
          <h1 className="text-5xl font-bold text-white text-balance">P55 Share Tools</h1>
          <p className="text-xl text-muted-foreground text-pretty">
            Amplify your reach. Share your affiliate pages across multiple platforms and maximize your earnings.
          </p>
        </div>

        <Tabs defaultValue="social" className="space-y-6">
          <TabsList className="glass h-16 p-2">
            <TabsTrigger value="social" className="text-lg h-12 px-6">
              <Share2 className="w-5 h-5 mr-2" />
              Social Media
            </TabsTrigger>
            <TabsTrigger value="embed" className="text-lg h-12 px-6">
              <Code className="w-5 h-5 mr-2" />
              Embed Codes
            </TabsTrigger>
            <TabsTrigger value="qr" className="text-lg h-12 px-6">
              <QrCode className="w-5 h-5 mr-2" />
              QR Codes
            </TabsTrigger>
            <TabsTrigger value="templates" className="text-lg h-12 px-6">
              <Sparkles className="w-5 h-5 mr-2" />
              Post Templates
            </TabsTrigger>
          </TabsList>

          {/* Social Media Tab */}
          <TabsContent value="social" className="space-y-6">
            <Card className="glass-strong border-primary/20">
              <CardHeader>
                <CardTitle className="text-2xl text-white">Quick Share</CardTitle>
                <CardDescription className="text-lg">
                  Share your pages instantly across all major platforms
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {pages && pages.length > 0 ? (
                  pages.map((page) => (
                    <div key={page.id} className="glass p-6 rounded-2xl space-y-4">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="text-xl font-bold text-white">{page.title}</h3>
                          <p className="text-muted-foreground">
                            Created {new Date(page.created_at).toLocaleDateString()}
                          </p>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <TrendingUp className="w-4 h-4 text-accent" />
                          <span className="text-accent font-semibold">{page.views || 0} views</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 p-3 glass rounded-xl">
                        <Input
                          value={`https://p55.pages/${page.slug}`}
                          readOnly
                          className="flex-1 bg-transparent border-0 text-white"
                        />
                        <Button
                          size="sm"
                          variant="outline"
                          className="glass hover:glass-strong bg-transparent"
                          onClick={() => {
                            navigator.clipboard.writeText(`https://p55.pages/${page.slug}`)
                          }}
                        >
                          <Copy className="w-4 h-4" />
                        </Button>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                        <Button
                          className="h-14 glass hover:glass-strong hover:border-[#1877f2] hover:text-[#1877f2] transition-all"
                          onClick={() => {
                            window.open(
                              `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(`https://p55.pages/${page.slug}`)}`,
                              "_blank",
                            )
                          }}
                        >
                          <Facebook className="w-5 h-5 mr-2" />
                          Facebook
                        </Button>

                        <Button
                          className="h-14 glass hover:glass-strong hover:border-[#1da1f2] hover:text-[#1da1f2] transition-all"
                          onClick={() => {
                            window.open(
                              `https://twitter.com/intent/tweet?url=${encodeURIComponent(`https://p55.pages/${page.slug}`)}&text=${encodeURIComponent(page.title)}`,
                              "_blank",
                            )
                          }}
                        >
                          <Twitter className="w-5 h-5 mr-2" />
                          Twitter
                        </Button>

                        <Button
                          className="h-14 glass hover:glass-strong hover:border-[#0077b5] hover:text-[#0077b5] transition-all"
                          onClick={() => {
                            window.open(
                              `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(`https://p55.pages/${page.slug}`)}`,
                              "_blank",
                            )
                          }}
                        >
                          <Linkedin className="w-5 h-5 mr-2" />
                          LinkedIn
                        </Button>

                        <Button
                          className="h-14 glass hover:glass-strong hover:border-[#25d366] hover:text-[#25d366] transition-all"
                          onClick={() => {
                            window.open(
                              `https://wa.me/?text=${encodeURIComponent(`${page.title} - https://p55.pages/${page.slug}`)}`,
                              "_blank",
                            )
                          }}
                        >
                          <MessageCircle className="w-5 h-5 mr-2" />
                          WhatsApp
                        </Button>

                        <Button
                          className="h-14 glass hover:glass-strong hover:border-primary hover:text-primary transition-all"
                          onClick={() => {
                            window.location.href = `mailto:?subject=${encodeURIComponent(page.title)}&body=${encodeURIComponent(`Check this out: https://p55.pages/${page.slug}`)}`
                          }}
                        >
                          <Mail className="w-5 h-5 mr-2" />
                          Email
                        </Button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-12">
                    <p className="text-xl text-muted-foreground">
                      No active pages yet. Create your first page to start sharing!
                    </p>
                    <Button className="mt-4 h-14 px-8 text-lg" asChild>
                      <a href="/create">Create Your First Page</a>
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Embed Codes Tab */}
          <TabsContent value="embed" className="space-y-6">
            <Card className="glass-strong border-primary/20">
              <CardHeader>
                <CardTitle className="text-2xl text-white">Embed Your Pages</CardTitle>
                <CardDescription className="text-lg">
                  Add your affiliate pages to any website with these embed codes
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {pages && pages.length > 0 ? (
                  pages.map((page) => (
                    <div key={page.id} className="glass p-6 rounded-2xl space-y-4">
                      <h3 className="text-xl font-bold text-white">{page.title}</h3>

                      <div className="space-y-3">
                        <label className="text-sm font-medium text-muted-foreground">iFrame Embed Code</label>
                        <div className="relative">
                          <Textarea
                            value={`<iframe src="https://p55.pages/${page.slug}" width="100%" height="600" frameborder="0"></iframe>`}
                            readOnly
                            className="font-mono text-sm glass"
                            rows={3}
                          />
                          <Button
                            size="sm"
                            className="absolute top-2 right-2"
                            onClick={() => {
                              navigator.clipboard.writeText(
                                `<iframe src="https://p55.pages/${page.slug}" width="100%" height="600" frameborder="0"></iframe>`,
                              )
                            }}
                          >
                            <Copy className="w-4 h-4 mr-2" />
                            Copy
                          </Button>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <label className="text-sm font-medium text-muted-foreground">Direct Link</label>
                        <div className="relative">
                          <Input value={`https://p55.pages/${page.slug}`} readOnly className="font-mono glass" />
                          <Button
                            size="sm"
                            className="absolute top-1/2 -translate-y-1/2 right-2"
                            onClick={() => {
                              navigator.clipboard.writeText(`https://p55.pages/${page.slug}`)
                            }}
                          >
                            <Copy className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-12">
                    <p className="text-xl text-muted-foreground">No pages available for embedding yet.</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* QR Codes Tab */}
          <TabsContent value="qr" className="space-y-6">
            <Card className="glass-strong border-primary/20">
              <CardHeader>
                <CardTitle className="text-2xl text-white">QR Codes</CardTitle>
                <CardDescription className="text-lg">
                  Generate QR codes for offline marketing and easy mobile access
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {pages && pages.length > 0 ? (
                  <div className="grid md:grid-cols-2 gap-6">
                    {pages.map((page) => (
                      <div key={page.id} className="glass p-6 rounded-2xl space-y-4 text-center">
                        <h3 className="text-xl font-bold text-white">{page.title}</h3>
                        <div className="w-64 h-64 mx-auto glass-strong rounded-2xl flex items-center justify-center">
                          <img
                            src={`https://api.qrserver.com/v1/create-qr-code/?size=240x240&data=${encodeURIComponent(`https://p55.pages/${page.slug}`)}`}
                            alt={`QR Code for ${page.title}`}
                            className="w-60 h-60"
                          />
                        </div>
                        <Button
                          className="w-full h-14 text-lg"
                          onClick={() => {
                            const link = document.createElement("a")
                            link.href = `https://api.qrserver.com/v1/create-qr-code/?size=1000x1000&data=${encodeURIComponent(`https://p55.pages/${page.slug}`)}`
                            link.download = `qr-${page.slug}.png`
                            link.click()
                          }}
                        >
                          Download QR Code
                        </Button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <p className="text-xl text-muted-foreground">No pages available for QR codes yet.</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Post Templates Tab */}
          <TabsContent value="templates" className="space-y-6">
            <Card className="glass-strong border-primary/20">
              <CardHeader>
                <CardTitle className="text-2xl text-white">Pre-Written Post Templates</CardTitle>
                <CardDescription className="text-lg">
                  Copy and customize these proven social media posts for maximum engagement
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid gap-6">
                  {[
                    {
                      title: "Curiosity Hook",
                      template:
                        "I just discovered something that could change everything... 🤯\n\nNo hype, just results.\n\nCheck it out: [YOUR_LINK]\n\n#affiliate #recommendation",
                    },
                    {
                      title: "Problem-Solution",
                      template:
                        "Struggling with [PROBLEM]? I was too...\n\nThen I found this solution that actually works.\n\nSee for yourself: [YOUR_LINK]\n\n#solution #helpful",
                    },
                    {
                      title: "Personal Story",
                      template:
                        "Real talk: I was skeptical at first...\n\nBut after trying this myself, I'm genuinely impressed.\n\nHere's my honest review: [YOUR_LINK]\n\n#honest #review",
                    },
                    {
                      title: "Value First",
                      template:
                        "Quick tip that helped me [BENEFIT]:\n\n✅ [Point 1]\n✅ [Point 2]\n✅ [Point 3]\n\nFull details here: [YOUR_LINK]\n\n#tips #value",
                    },
                  ].map((template, index) => (
                    <div key={index} className="glass p-6 rounded-2xl space-y-4">
                      <div className="flex items-center justify-between">
                        <h3 className="text-xl font-bold text-white">{template.title}</h3>
                        <Button
                          size="sm"
                          onClick={() => {
                            navigator.clipboard.writeText(template.template)
                          }}
                        >
                          <Copy className="w-4 h-4 mr-2" />
                          Copy
                        </Button>
                      </div>
                      <Textarea value={template.template} readOnly className="font-mono glass min-h-32" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Sharing Tips */}
        <Card className="glass-strong border-accent/20">
          <CardHeader>
            <CardTitle className="text-2xl text-white flex items-center gap-2">
              <Sparkles className="w-6 h-6 text-accent" />
              P55 Pro Sharing Tips
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-lg">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <h4 className="font-bold text-primary">✓ Best Times to Post</h4>
                <p className="text-muted-foreground">
                  Facebook: 1-3 PM weekdays | Twitter: 12-1 PM & 5-6 PM | LinkedIn: 7-8 AM & 5-6 PM
                </p>
              </div>
              <div className="space-y-2">
                <h4 className="font-bold text-primary">✓ Use Hashtags Wisely</h4>
                <p className="text-muted-foreground">
                  2-3 relevant hashtags on Twitter, 3-5 on Instagram, 1-2 on LinkedIn for best engagement
                </p>
              </div>
              <div className="space-y-2">
                <h4 className="font-bold text-primary">✓ Add Value First</h4>
                <p className="text-muted-foreground">
                  Share helpful tips and insights before promoting. Build trust with your audience
                </p>
              </div>
              <div className="space-y-2">
                <h4 className="font-bold text-primary">✓ Track Your Results</h4>
                <p className="text-muted-foreground">
                  Monitor which platforms drive the most clicks and focus your efforts there
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
