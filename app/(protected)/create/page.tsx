"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TrendingUp, Search, Zap, DollarSign, Eye, Flame, Youtube, Loader2, ExternalLink, Copy, Check, Database, X } from "lucide-react"
import { fetchTrendingShorts, searchVideosByKeyword, type VideoOpportunity } from "@/app/actions/fetch-video-opportunities"
import generateViralCommentsAction from "@/app/actions/generate-viral-comments"
import { createClient } from "@/lib/supabase/client"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"

export default function GoldRushPage() {
  // Step 1: Product Info
  const [productName, setProductName] = useState("")
  const [productDescription, setProductDescription] = useState("")
  const [affiliateLink, setAffiliateLink] = useState("")
  const [step, setStep] = useState<"product" | "videos">("product")
  
  // Step 2: Video Search
  const [searchMode, setSearchMode] = useState<"trending" | "niche">("trending")
  const [nicheKeyword, setNicheKeyword] = useState("")
  const [videos, setVideos] = useState<VideoOpportunity[]>([])
  const [loadingVideos, setLoadingVideos] = useState(false)
  const [generatingFor, setGeneratingFor] = useState<string | null>(null)
  
  // Step 3: Generated Comments (per video)
  const [generatedCommentsMap, setGeneratedCommentsMap] = useState<Record<string, string[]>>({})
  const [copiedIndex, setCopiedIndex] = useState<string | null>(null)

  // Link Vault Integration
  const [vaultLinks, setVaultLinks] = useState<any[]>([])
  const [showVaultModal, setShowVaultModal] = useState(false)
  const [loadingVault, setLoadingVault] = useState(false)

  useEffect(() => {
    if (showVaultModal) {
      fetchVaultLinks()
    }
  }, [showVaultModal])

  const fetchVaultLinks = async () => {
    setLoadingVault(true)
    const supabase = createClient()
    const { data } = await supabase
      .from("pages")
      .select("*")
      .not("affiliate_link", "is", null)
      .order("created_at", { ascending: false })
    
    setVaultLinks(data || [])
    setLoadingVault(false)
  }

  const handleSelectFromVault = (link: string, name: string) => {
    setAffiliateLink(link)
    setProductName(name)
    setShowVaultModal(false)
  }

  const handleProductSubmit = () => {
    if (!productName.trim() || !productDescription.trim() || !affiliateLink.trim()) {
      alert("Please fill in all fields")
      return
    }
    setStep("videos")
  }

  const handleFindVideos = async () => {
    setLoadingVideos(true)
    setGeneratedCommentsMap({}) // Clear previous comments
    try {
      let results: VideoOpportunity[]
      
      if (searchMode === "trending") {
        results = await fetchTrendingShorts()
      } else {
        if (!nicheKeyword.trim()) {
          alert("Please enter a niche keyword")
          setLoadingVideos(false)
          return
        }
        results = await searchVideosByKeyword(nicheKeyword)
      }
      
      setVideos(results)
    } catch (error) {
      console.error("Error fetching videos:", error)
      alert("Failed to fetch videos. Please try again.")
    }
    setLoadingVideos(false)
  }

  const handleGenerateComments = async (video: VideoOpportunity) => {
    setGeneratingFor(video.videoId)
    
    try {
      const result = await generateViralCommentsAction({
        videoId: video.videoId,
        videoTitle: video.title,
        channelTitle: video.channelTitle,
        productName,
        productDescription,
        affiliateLink
      })

      if (result.success && result.comments) {
        setGeneratedCommentsMap(prev => ({
          ...prev,
          [video.videoId]: result.comments
        }))
      } else {
        alert(result.error || "Failed to generate comments")
      }
    } catch (error) {
      console.error("Error:", error)
      alert("An error occurred")
    }
    
    setGeneratingFor(null)
  }

  const handleCopyComment = async (comment: string, videoId: string, index: number) => {
    await navigator.clipboard.writeText(comment)
    setCopiedIndex(`${videoId}-${index}`)
    setTimeout(() => setCopiedIndex(null), 2000)
  }

  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`
    return num.toString()
  }

  return (
    <div className="max-w-7xl mx-auto space-y-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-8">
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#B3FF00]/10 border border-[#B3FF00]/20">
            <Zap className="w-4 h-4 text-[#B3FF00]" />
            <span className="text-[10px] font-black text-white uppercase tracking-[0.2em]">Viral Pulse v2.4</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-1.5 h-12 bg-[#B3FF00] rounded-full" />
            <h1 className="text-6xl font-black text-white tracking-tighter uppercase italic">TREND HIJACKER</h1>
          </div>
          <p className="text-xl text-zinc-500 font-bold uppercase tracking-tight">
            Intercept viral velocity and extract maximum traffic ⚡️
          </p>
        </div>

        <Button
          onClick={() => setShowVaultModal(true)}
          className="h-16 px-10 text-lg font-black bg-[#B3FF00] hover:bg-[#B3FF00]/90 text-black rounded-2xl shadow-[0_8px_30px_rgba(179,255,0,0.2)] group transition-all shrink-0"
        >
          <Database className="w-6 h-6 mr-3 group-hover:rotate-12 transition-transform" />
          SELECT FROM VAULT
        </Button>
      </div>

      {/* Step 1: Product Info */}
      {step === "product" && (
        <Card className="glass-strong border-2 border-white/5 bg-[#111111] rounded-[2.5rem] overflow-hidden relative group">
          <CardContent className="p-12 space-y-10">
            <div className="flex items-center gap-6 pb-8 border-b border-white/5">
              <div className="w-20 h-20 rounded-3xl bg-[#B3FF00]/10 flex items-center justify-center border border-[#B3FF00]/20">
                <Zap className="w-10 h-10 text-[#B3FF00]" />
              </div>
              <div className="space-y-1">
                <h2 className="text-4xl font-black text-white uppercase italic tracking-tighter">PHASE 01: PAYLOAD CONFIG</h2>
                <p className="text-zinc-500 font-bold uppercase text-[10px] tracking-widest">Connect your profit vectors to the pulse</p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-10">
              <div className="space-y-4">
                <Label className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.3em] ml-1">Offer Identity</Label>
                <Input
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                  placeholder="e.g. Meta-Profit System"
                  className="h-16 bg-white/2 border-2 border-white/5 focus:border-[#B3FF00]/40 text-white text-xl font-bold rounded-2xl transition-all"
                />
              </div>

              <div className="space-y-4">
                <Label className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.3em] ml-1">Payload Intel (Description)</Label>
                <textarea
                   value={productDescription}
                   onChange={(e) => setProductDescription(e.target.value)}
                   placeholder="Brief tactical summary of the offer..."
                   className="w-full h-16 bg-white/2 border-2 border-white/5 focus:border-[#B3FF00]/40 text-white font-bold rounded-2xl p-4 transition-all resize-none"
                />
              </div>
            </div>

            <div className="space-y-4">
               <Label className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.3em] ml-1">Extraction Endpoint (Affiliate Link)</Label>
               <div className="flex gap-4">
                  <Input
                    value={affiliateLink}
                    onChange={(e) => setAffiliateLink(e.target.value)}
                    placeholder="https://hop.clickbank.net/..."
                    className="h-16 bg-white/2 border-2 border-white/5 focus:border-[#B3FF00]/40 text-zinc-400 font-mono rounded-2xl transition-all"
                  />
               </div>
            </div>

            <Button
              onClick={handleProductSubmit}
              className="w-full h-20 text-2xl font-black bg-[#B3FF00] text-black rounded-2xl hover:scale-[1.02] transition-all shadow-[0_8px_30px_rgba(179,255,0,0.2)] uppercase italic"
            >
              LOCATE TARGETS →
            </Button>
            </CardContent>
        </Card>
      )}

      {/* Step 2: Video Search */}
      {step === "videos" && (
        <>
          <Card className="glass-strong border-2 border-white/5 bg-[#111111] rounded-[2.5rem] overflow-hidden group">
            <CardContent className="p-10 space-y-8">
              <div className="flex items-center justify-between pb-6 border-b border-white/5">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[#B3FF00]/10 flex items-center justify-center border border-[#B3FF00]/20">
                     <Zap className="w-6 h-6 text-[#B3FF00]" />
                  </div>
                  <div>
                    <h2 className="text-xl font-black text-white uppercase italic tracking-tighter">MISSION: {productName}</h2>
                    <p className="text-[10px] text-zinc-500 font-black uppercase tracking-[0.2em] truncate max-w-sm">{affiliateLink}</p>
                  </div>
                </div>
                <Button
                  variant="outline"
                  onClick={() => setStep("product")}
                  className="h-12 border-2 border-white/5 hover:bg-white/5 text-zinc-400 hover:text-white font-black uppercase text-[10px] rounded-xl"
                >
                  RECONFIGURE
                </Button>
              </div>

              <Tabs value={searchMode} onValueChange={(v) => setSearchMode(v as "trending" | "niche")} className="w-full">
                <TabsList className="grid w-full grid-cols-2 h-16 bg-white/2 border-2 border-white/5 p-1 rounded-2xl">
                  <TabsTrigger value="trending" className="text-xs font-black uppercase tracking-widest data-[state=active]:bg-[#B3FF00] data-[state=active]:text-black rounded-xl transition-all">
                    <TrendingUp className="w-4 h-4 mr-2" />
                    LIVE PULSE
                  </TabsTrigger>
                  <TabsTrigger value="niche" className="text-xs font-black uppercase tracking-widest data-[state=active]:bg-[#B3FF00] data-[state=active]:text-black rounded-xl transition-all">
                    <Search className="w-4 h-4 mr-2" />
                    NICHE SECTOR
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="trending" className="mt-8">
                  <Button
                    onClick={handleFindVideos}
                    disabled={loadingVideos}
                    className="w-full h-20 text-2xl font-black bg-white/5 hover:bg-[#B3FF00] text-white hover:text-black border-2 border-white/10 hover:border-[#B3FF00] rounded-2xl transition-all shadow-xl"
                  >
                    {loadingVideos ? <Loader2 className="w-6 h-6 mr-3 animate-spin" /> : <Flame className="w-6 h-6 mr-3 text-[#B3FF00] group-hover:text-black" />}
                    SCAN GLOBAL VELOCITY
                  </Button>
                </TabsContent>

                <TabsContent value="niche" className="space-y-6 mt-8">
                  <div className="space-y-3">
                    <Label className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.3em] ml-1">Niche Extraction Key</Label>
                    <Input
                      value={nicheKeyword}
                      onChange={(e) => setNicheKeyword(e.target.value)}
                      placeholder="e.g. Health, Finance, Tech..."
                      className="h-16 bg-white/2 border-2 border-white/5 focus:border-[#B3FF00]/40 text-white text-xl font-bold rounded-2xl transition-all"
                    />
                  </div>
                  <Button
                    onClick={handleFindVideos}
                    disabled={loadingVideos || !nicheKeyword.trim()}
                    className="w-full h-20 text-2xl font-black bg-white/5 hover:bg-[#B3FF00] text-white hover:text-black border-2 border-white/10 hover:border-[#B3FF00] rounded-2xl transition-all shadow-xl"
                  >
                    {loadingVideos ? <Loader2 className="w-6 h-6 mr-3 animate-spin" /> : <Search className="w-6 h-6 mr-3 text-[#B3FF00] group-hover:text-black" />}
                    ISOLATE SECTOR TARGETS
                  </Button>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          {/* Video Results */}
          {videos.length > 0 && (
            <div className="space-y-4">
          <div className="flex items-center gap-4">
             <div className="w-2 h-8 bg-[#B3FF00] rounded-full" />
             <h3 className="text-3xl font-black text-white uppercase italic tracking-tighter">TARGET ACQUISITION</h3>
             <span className="px-4 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-black text-zinc-500 uppercase tracking-widest ml-4">
               {videos.length} VECTORS IDENTIFIED
             </span>
          </div>

              {videos.map((video) => {
                const comments = generatedCommentsMap[video.videoId]
                const hasComments = comments && comments.length > 0

                return (
                  <Card key={video.videoId} className={`glass-strong border-2 transition-all duration-500 overflow-hidden relative group rounded-[2.5rem] ${
                    hasComments 
                      ? "border-[#B3FF00]/40 bg-[#B3FF00]/5" 
                      : "border-white/5 bg-[#111111] hover:border-white/20"
                  }`}>
                    <div className="absolute top-0 left-0 w-full h-1 bg-white/5 group-hover:bg-[#B3FF00]/40 transition-all" />
                    <div className="space-y-6">
                      <div className="flex gap-6">
                        {/* Thumbnail */}
                        <div className="relative aspect-video w-full bg-black overflow-hidden group-hover:opacity-90 transition-opacity">
                           <img
                            src={video.thumbnailUrl}
                            alt={video.title}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                          />
                          <div className="absolute inset-0 bg-[#B3FF00]/10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                          <div className="absolute top-4 right-4 bg-black/80 backdrop-blur-xl text-[#B3FF00] text-[10px] font-black px-4 py-2 rounded-2xl border border-[#B3FF00]/30 z-10">
                            <Youtube className="w-3 h-3 inline mr-2" />
                            SECTOR TARGET
                          </div>
                        </div>

                        {/* Video Info Section */}
                        <div className="p-10 space-y-8">
                          <div>
                            <p className="text-[10px] text-[#B3FF00] font-black uppercase tracking-[0.3em] mb-2">{video.channelTitle}</p>
                            <h4 className="text-3xl font-black text-white leading-tight uppercase italic tracking-tighter group-hover:text-[#B3FF00] transition-colors">{video.title}</h4>
                          </div>

                          {/* Stats Grid */}
                          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                            <div className="bg-white/2 rounded-2xl p-4 border border-white/5 group-hover:bg-white/5 transition-all">
                              <p className="text-[10px] font-black text-zinc-600 uppercase tracking-widest mb-1">Impact</p>
                              <p className="text-xl font-black text-white uppercase italic">{formatNumber(video.viewCount)}</p>
                            </div>
                            <div className="bg-white/2 rounded-2xl p-4 border border-white/5 group-hover:bg-white/5 transition-all">
                              <p className="text-[10px] font-black text-zinc-600 uppercase tracking-widest mb-1">Velocity</p>
                              <p className="text-xl font-black text-white uppercase italic">{video.viralScore}%</p>
                            </div>
                            <div className="bg-white/2 rounded-2xl p-4 border border-white/5 group-hover:bg-white/5 transition-all">
                              <p className="text-[10px] font-black text-zinc-600 uppercase tracking-widest mb-1">Extraction</p>
                              <p className="text-xl font-black text-white uppercase italic">{formatNumber(video.estimatedClicks)}</p>
                            </div>
                            <div className="bg-[#B3FF00]/10 rounded-2xl p-4 border border-[#B3FF00]/20 group-hover:bg-[#B3FF00] transition-all group/stat">
                              <p className="text-[10px] font-black text-[#B3FF00]/60 group-hover:text-black/60 uppercase tracking-widest mb-1">Revenue</p>
                              <p className="text-xl font-black text-[#B3FF00] group-hover:text-black uppercase italic">{video.estimatedEarnings}</p>
                            </div>
                          </div>

                          {/* Actions */}
                          <div className="flex gap-4">
                            <Button
                              onClick={() => handleGenerateComments(video)}
                              disabled={generatingFor === video.videoId}
                              className="flex-1 h-20 text-xl font-black bg-white/5 border-2 border-white/10 hover:border-[#B3FF00] hover:bg-[#B3FF00] text-white hover:text-black rounded-2xl transition-all shadow-xl uppercase italic tracking-tighter"
                            >
                              {generatingFor === video.videoId ? (
                                <span className="flex items-center gap-3">
                                  <div className="w-6 h-6 border-4 border-zinc-700 border-t-[#B3FF00] rounded-full animate-spin" />
                                  EXTRACTING...
                                </span>
                              ) : (
                                <span className="flex items-center gap-3">
                                  <Zap className="w-6 h-6" />
                                  RUN EXTRACTION
                                </span>
                              )}
                            </Button>
                            <Button
                              asChild
                              variant="outline"
                              className="w-20 h-20 glass-strong border-2 border-white/5 hover:border-[#B3FF00] rounded-2xl transition-all p-0 group/btn"
                            >
                              <a href={`https://youtube.com/watch?v=${video.videoId}`} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center">
                                <ExternalLink className="w-8 h-8 text-zinc-600 group-hover/btn:text-[#B3FF00] transition-colors" />
                              </a>
                            </Button>
                          </div>
                        </div>
                      </div>

                      {/* Generated Comments HUD */}
                      {hasComments && (
                        <div className="p-10 bg-black/40 border-t border-[#B3FF00]/20 space-y-8 animate-in slide-in-from-top-4 duration-700">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                               <div className="w-8 h-8 rounded-full bg-[#B3FF00] flex items-center justify-center">
                                  <DollarSign className="w-4 h-4 text-black" />
                               </div>
                               <h3 className="text-2xl font-black text-[#B3FF00] uppercase italic tracking-tighter">GENERATED PAYLOADS</h3>
                            </div>
                            <Button
                              asChild
                              className="h-12 px-8 font-black bg-[#B3FF00]/10 border border-[#B3FF00]/30 text-[#B3FF00] hover:bg-[#B3FF00] hover:text-black rounded-xl uppercase text-xs transition-all"
                            >
                              <a href={`https://youtube.com/watch?v=${video.videoId}`} target="_blank" rel="noopener noreferrer">
                                <Youtube className="w-4 h-4 mr-2" />
                                DEPLOY ON TARGET
                              </a>
                            </Button>
                          </div>

                          <div className="grid grid-cols-1 gap-4">
                            {comments.map((comment, index) => (
                              <div key={index} className="bg-white/2 rounded-3xl p-6 border-2 border-white/5 hover:border-[#B3FF00]/40 transition-all group/payload relative overflow-hidden">
                                <div className="absolute top-0 left-0 w-1 h-full bg-[#B3FF00]/20 group-hover:bg-[#B3FF00] transition-all" />
                                <div className="flex items-start justify-between gap-8">
                                  <p className="text-lg text-zinc-300 font-bold flex-1 leading-relaxed italic">"{comment}"</p>
                                  <Button
                                    onClick={() => handleCopyComment(comment, video.videoId, index)}
                                    className={`h-16 px-10 font-black rounded-xl transition-all shrink-0 uppercase italic text-sm ${
                                      copiedIndex === `${video.videoId}-${index}`
                                        ? "bg-white text-black scale-95"
                                        : "bg-[#B3FF00] text-black shadow-lg hover:scale-105"
                                    }`}
                                  >
                                    {copiedIndex === `${video.videoId}-${index}` ? (
                                      <span className="flex items-center gap-2">
                                        <Check className="w-4 h-4" />
                                        ARMED
                                      </span>
                                    ) : (
                                      <span className="flex items-center gap-2">
                                        <Copy className="w-4 h-4" />
                                        COPY
                                      </span>
                                    )}
                                  </Button>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </Card>
                )
              })}
            </div>
          )}
        </>
      )}
      {/* Link Vault Modal */}
      <Dialog open={showVaultModal} onOpenChange={setShowVaultModal}>
        <DialogContent className="max-w-3xl glass-strong border-2 border-[#B3FF00]/30 bg-background text-white overflow-hidden p-0 rounded-2xl">
          <DialogHeader className="p-8 border-b border-white/5 bg-linear-to-r from-primary/10 to-transparent">
            <div className="flex items-center justify-between">
              <div>
                <DialogTitle className="text-3xl font-black italic tracking-tighter flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#B3FF00] flex items-center justify-center">
                    <Database className="w-5 h-5 text-black" />
                  </div>
                  LINK VAULT
                </DialogTitle>
                <DialogDescription className="text-zinc-400 font-bold mt-2">
                  Select a pre-saved affiliate link to use for this campaign
                </DialogDescription>
              </div>
            </div>
          </DialogHeader>

          <div className="p-8 max-h-[60vh] overflow-y-auto custom-scrollbar">
            {loadingVault ? (
              <div className="py-20 text-center">
                <Loader2 className="w-10 h-10 text-[#B3FF00] animate-spin mx-auto mb-4" />
                <p className="text-zinc-500 font-black uppercase tracking-widest">Accessing Vault...</p>
              </div>
            ) : vaultLinks.length === 0 ? (
              <div className="py-20 text-center space-y-4">
                <div className="w-20 h-20 rounded-2xl bg-white/5 flex items-center justify-center mx-auto">
                  <Database className="w-10 h-10 text-zinc-700" />
                </div>
                <p className="text-zinc-500 font-bold text-xl">Your Link Vault is empty</p>
                <Button asChild className="bg-[#B3FF00] text-black font-black px-8">
                  <a href="/share">Add Links to Vault</a>
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-4">
                {vaultLinks.map((link) => (
                  <button
                    key={link.id}
                    onClick={() => handleSelectFromVault(link.affiliate_link, link.title)}
                    className="flex items-center justify-between p-6 rounded-2xl border-2 border-white/5 bg-white/3 hover:bg-[#B3FF00]/5 hover:border-[#B3FF00]/30 transition-all text-left group"
                  >
                    <div className="flex-1 min-w-0 pr-4">
                      <h4 className="text-lg font-black text-white group-hover:text-[#B3FF00] transition-colors truncate">
                        {link.title}
                      </h4>
                      <p className="text-sm text-zinc-500 font-bold truncate mt-1">
                        {link.affiliate_link}
                      </p>
                    </div>
                    <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center group-hover:bg-[#B3FF00] group-hover:text-black transition-all">
                      <Check className="w-5 h-5" />
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="p-6 bg-black/50 border-t border-white/5 flex justify-end">
            <Button 
              variant="outline" 
              onClick={() => setShowVaultModal(false)}
              className="border-white/10 text-white font-bold px-8"
            >
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
