"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  Loader2, 
  Search, 
  Filter, 
  Youtube, 
  Copy, 
  Check, 
  Eye,
  TrendingUp,
  DollarSign,
  Flame,
  Zap,
  ExternalLink
} from "lucide-react"
import { fetchDFYLibrary, type DFYVideo } from "@/app/actions/fetch-dfy-library"

interface UserProduct {
  name: string
  link: string
}

export default function DFYVaultClient() {
  const [loading, setLoading] = useState(true)
  const [videos, setVideos] = useState<DFYVideo[]>([])
  const [filteredVideos, setFilteredVideos] = useState<DFYVideo[]>([])
  const [selectedNiche, setSelectedNiche] = useState<string>("all")
  const [searchQuery, setSearchQuery] = useState("")
  
  // User's product selection
  const [productName, setProductName] = useState("")
  const [productLink, setProductLink] = useState("")
  const [productSelected, setProductSelected] = useState(false)
  
  // Copy tracking
  const [copiedComment, setCopiedComment] = useState<string | null>(null)

  useEffect(() => {
    loadLibrary()
  }, [])

  useEffect(() => {
    filterVideos()
  }, [selectedNiche, searchQuery, videos])

  const loadLibrary = async () => {
    setLoading(true)
    const library = await fetchDFYLibrary()
    setVideos(library)
    setFilteredVideos(library)
    setLoading(false)
  }

  const filterVideos = () => {
    let filtered = videos

    // Filter by niche
    if (selectedNiche !== "all") {
      filtered = filtered.filter(v => v.niche === selectedNiche)
    }

    // Filter by search
    if (searchQuery.trim()) {
      filtered = filtered.filter(v => 
        v.title.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    setFilteredVideos(filtered)
  }

  const handleSelectProduct = () => {
    if (!productName.trim() || !productLink.trim()) {
      alert("Please enter both product name and link")
      return
    }
    setProductSelected(true)
  }

  const handleCopyComment = async (comment: string, videoId: string, index: number) => {
    // Replace placeholders with user's product
    const personalizedComment = comment
      .replace(/\[PRODUCT\]/g, productName)
      .replace(/\[LINK\]/g, productLink)
    
    await navigator.clipboard.writeText(personalizedComment)
    setCopiedComment(`${videoId}-${index}`)
    setTimeout(() => setCopiedComment(null), 2000)
  }

  const niches = ["all", ...Array.from(new Set(videos.map(v => v.niche)))]

  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`
    return num.toString()
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center space-y-4">
          <Loader2 className="w-16 h-16 text-[#0ea5e9] animate-spin mx-auto" />
          <p className="text-2xl text-white font-bold">Loading Your DFY Library...</p>
          <p className="text-[#7dd3fc]">Fetching 200+ viral opportunities across 6 niches</p>
        </div>
      </div>
    )
  }

  const trainingVideos = [
    {
      id: 1,
      title: "How The DFY Vault Works",
      description: "Quick overview of the 200+ video library and comment system",
      thumbnail: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=450&fit=crop",
      duration: "5:23"
    },
    {
      id: 2,
      title: "Maximizing Your Results",
      description: "Best practices for comment placement and timing",
      thumbnail: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&h=450&fit=crop",
      duration: "7:45"
    },
    {
      id: 3,
      title: "Niche Selection Strategy",
      description: "How to pick the right videos for your product",
      thumbnail: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=450&fit=crop",
      duration: "6:12"
    },
    {
      id: 4,
      title: "Scaling To $1k+ Per Day",
      description: "Advanced tactics to multiply your earnings",
      thumbnail: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=450&fit=crop",
      duration: "12:30"
    }
  ]

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-6xl font-black text-white tracking-tight">
          💎 Robinhood DFY Vault
        </h1>
        <p className="text-2xl text-[#7dd3fc] font-bold">
          {videos.length} Pre-Loaded Viral Videos + 5 Comments Each
        </p>
        <p className="text-lg text-[#7dd3fc]">
          Select your product once, copy & paste comments on any video
        </p>
      </div>

      {/* Training Videos */}
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#ec4899]/30 to-[#f97316]/30 flex items-center justify-center border-2 border-[#ec4899]/40">
            <Youtube className="w-6 h-6 text-[#ec4899]" />
          </div>
          <div>
            <h2 className="text-3xl font-black text-white">Training Library</h2>
            <p className="text-[#7dd3fc] font-semibold">Watch these first to maximize your results</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {trainingVideos.map((video) => (
            <Card key={video.id} className="glass-strong border-2 border-[#ec4899]/30 hover:border-[#ec4899]/60 transition-all overflow-hidden group cursor-pointer">
              <div className="relative">
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="w-full h-40 object-cover"
                />
                <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#ec4899] to-[#f97316] flex items-center justify-center">
                    <Youtube className="w-8 h-8 text-white" />
                  </div>
                </div>
                <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs font-black px-2 py-1 rounded">
                  {video.duration}
                </div>
              </div>
              <div className="p-4">
                <h3 className="text-lg font-black text-white mb-2 line-clamp-2">{video.title}</h3>
                <p className="text-sm text-[#7dd3fc] line-clamp-2">{video.description}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Product Selection */}
      {!productSelected ? (
        <Card className="glass-strong border-2 border-[#fbbf24]/40 p-8">
          <div className="space-y-6">
            <div className="flex items-center gap-3 pb-4 border-b-2 border-[#fbbf24]/20">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#fbbf24]/30 to-[#f97316]/30 flex items-center justify-center border-2 border-[#fbbf24]/40">
                <Zap className="w-7 h-7 text-[#fbbf24]" />
              </div>
              <div>
                <h2 className="text-3xl font-black text-white">Select Your Product</h2>
                <p className="text-[#7dd3fc] font-semibold">Your product will be inserted into all comments automatically</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label className="text-white font-bold text-lg mb-2 block">Product Name</Label>
                <Input
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                  placeholder="e.g., Keto Weight Loss System"
                  className="h-14 text-lg glass border-2 border-[#0ea5e9]/30"
                />
              </div>
              <div>
                <Label className="text-white font-bold text-lg mb-2 block">Affiliate Link</Label>
                <Input
                  value={productLink}
                  onChange={(e) => setProductLink(e.target.value)}
                  placeholder="https://..."
                  className="h-14 text-lg glass border-2 border-[#0ea5e9]/30"
                />
              </div>
            </div>

            <Button
              onClick={handleSelectProduct}
              className="w-full h-16 text-xl font-black bg-gradient-to-r from-[#fbbf24] to-[#f97316] hover:from-[#f97316] hover:to-[#fbbf24] rounded-xl"
            >
              Unlock DFY Library →
            </Button>
          </div>
        </Card>
      ) : (
        <>
          {/* Selected Product Bar */}
          <Card className="glass-strong border-2 border-[#10b981]/40 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-[#7dd3fc] font-semibold mb-1">Your Product:</p>
                <p className="text-2xl font-black text-white">{productName}</p>
                <p className="text-sm text-[#7dd3fc] truncate max-w-xl">{productLink}</p>
              </div>
              <Button
                onClick={() => setProductSelected(false)}
                variant="outline"
                className="glass border-2 border-[#0ea5e9]/30 text-white font-bold"
              >
                Change Product
              </Button>
            </div>
          </Card>

          {/* Filters */}
          <Card className="glass-strong border-2 border-[#0ea5e9]/30 p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#7dd3fc]" />
                  <Input
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search videos..."
                    className="h-14 pl-12 text-lg glass border-2 border-[#0ea5e9]/30"
                  />
                </div>
              </div>
              <div className="flex gap-2 overflow-x-auto">
                {niches.map(niche => (
                  <Button
                    key={niche}
                    onClick={() => setSelectedNiche(niche)}
                    variant={selectedNiche === niche ? "default" : "outline"}
                    className={`whitespace-nowrap font-bold ${
                      selectedNiche === niche
                        ? "bg-gradient-to-r from-[#0ea5e9] to-[#06b6d4]"
                        : "glass border-2 border-[#0ea5e9]/30 text-white"
                    }`}
                  >
                    {niche === "all" ? "All Niches" : niche}
                  </Button>
                ))}
              </div>
            </div>
            <p className="text-sm text-[#7dd3fc] font-semibold mt-4">
              Showing {filteredVideos.length} opportunities
            </p>
          </Card>

          {/* Video Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredVideos.map((video) => (
              <Card key={video.videoId} className="glass-strong border-2 border-[#0ea5e9]/30 hover:border-[#10b981]/50 transition-all p-6">
                <div className="space-y-4">
                  {/* Video Info */}
                  <div className="flex gap-4">
                    <img
                      src={video.thumbnailUrl}
                      alt={video.title}
                      className="w-32 h-18 object-cover rounded-lg border-2 border-[#0ea5e9]/40"
                    />
                    <div className="flex-1">
                      <h3 className="text-lg font-black text-white line-clamp-2 mb-1">{video.title}</h3>
                      <p className="text-xs text-[#7dd3fc] font-semibold">{video.channelTitle}</p>
                      <p className="text-xs text-[#10b981] font-bold mt-1">💎 {video.niche}</p>
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-4 gap-2">
                    <div className="glass rounded-lg p-2 border border-[#0ea5e9]/30 text-center">
                      <Eye className="w-3 h-3 text-[#0ea5e9] mx-auto mb-1" />
                      <p className="text-sm font-black text-white">{formatNumber(video.viewCount)}</p>
                    </div>
                    <div className="glass rounded-lg p-2 border border-[#ec4899]/30 text-center">
                      <Flame className="w-3 h-3 text-[#ec4899] mx-auto mb-1" />
                      <p className="text-sm font-black text-white">{video.viralScore}</p>
                    </div>
                    <div className="glass rounded-lg p-2 border border-[#06b6d4]/30 text-center">
                      <TrendingUp className="w-3 h-3 text-[#06b6d4] mx-auto mb-1" />
                      <p className="text-sm font-black text-white">{video.estimatedClicks}</p>
                    </div>
                    <div className="glass rounded-lg p-2 border border-[#10b981]/30 text-center">
                      <DollarSign className="w-3 h-3 text-[#10b981] mx-auto mb-1" />
                      <p className="text-sm font-black text-[#10b981]">{video.estimatedEarnings}</p>
                    </div>
                  </div>

                  {/* Comments */}
                  <div className="space-y-2">
                    <p className="text-sm font-bold text-white">5 Ready Comments:</p>
                    {video.commentTemplates.map((template, index) => {
                      const preview = template
                        .replace(/\[PRODUCT\]/g, productName)
                        .replace(/\[LINK\]/g, productLink)
                      
                      return (
                        <div key={index} className="glass rounded-lg p-3 border border-[#0ea5e9]/20 hover:border-[#10b981]/40 transition-all">
                          <div className="flex items-start gap-3">
                            <p className="text-xs text-white flex-1 leading-relaxed line-clamp-2">{preview}</p>
                            <Button
                              onClick={() => handleCopyComment(template, video.videoId, index)}
                              size="sm"
                              className={`h-8 px-3 font-bold rounded-lg flex-shrink-0 ${
                                copiedComment === `${video.videoId}-${index}`
                                  ? "bg-[#10b981]"
                                  : "bg-gradient-to-r from-[#0ea5e9] to-[#06b6d4]"
                              }`}
                            >
                              {copiedComment === `${video.videoId}-${index}` ? (
                                <Check className="w-3 h-3" />
                              ) : (
                                <Copy className="w-3 h-3" />
                              )}
                            </Button>
                          </div>
                        </div>
                      )
                    })}
                  </div>

                  {/* Open Video */}
                  <Button
                    asChild
                    className="w-full h-12 font-black bg-gradient-to-r from-[#ec4899] to-[#f97316] hover:from-[#f97316] hover:to-[#ec4899] rounded-xl"
                  >
                    <a href={`https://youtube.com/watch?v=${video.videoId}`} target="_blank" rel="noopener noreferrer">
                      <Youtube className="w-4 h-4 mr-2" />
                      Open Video
                    </a>
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </>
      )}
    </div>
  )
}

