import { Diamond, Play, Sparkles, Zap, ArrowRight, Video, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function DFYVaultPage() {
  const trainingVideos = [
    {
      title: "How The DFY Vault Works",
      description: "Quick overview of the 200+ video library and comment system",
      duration: "9:22",
      thumbnail: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=1074&auto=format&fit=crop",
    },
    {
      title: "Maximizing Your Results",
      description: "Best practices for comment placement and timing",
      duration: "7:45",
      thumbnail: "https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?q=80&w=1074&auto=format&fit=crop",
    },
    {
      title: "Niche Selection Strategy",
      description: "How to pick the right videos for your product",
      duration: "11:12",
      thumbnail: "https://images.unsplash.com/photo-1611162618071-b39a2ec055fb?q=80&w=1074&auto=format&fit=crop",
    },
    {
      title: "Scaling To $1k+ Per Day",
      description: "Advanced tactics to multiply your earnings",
      duration: "12:30",
      thumbnail: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1115&auto=format&fit=crop",
    },
  ]

  return (
    <div className="max-w-[1400px] mx-auto p-4 md:p-8 space-y-12">
      {/* Header Section */}
      <div className="text-center space-y-4">
        <div className="flex justify-center">
          <Diamond className="w-16 h-16 text-blue-400 drop-shadow-[0_0_15px_rgba(96,165,250,0.5)]" />
        </div>
        <h1 className="text-4xl md:text-6xl font-black text-white uppercase italic tracking-tighter">
          Robinhood DFY Vault
        </h1>
        <div className="space-y-1 uppercase tracking-widest font-bold">
          <p className="text-blue-400 text-lg md:text-xl">120 Pre-Loaded Viral Videos + 5 Comments Each</p>
          <p className="text-zinc-500 text-sm">Select your product once, copy & paste comments on any video</p>
        </div>
      </div>

      {/* DFY Vault Training Section */}
      <Card className="glass-strong border-2 border-primary/20 bg-[#111111] overflow-hidden rounded-4xl">
        <CardHeader className="flex flex-row items-center gap-4 p-6 border-b border-white/5">
          <div className="w-12 h-12 rounded-full bg-pink-500/20 flex items-center justify-center">
            <Video className="w-6 h-6 text-pink-500" />
          </div>
          <div>
            <CardTitle className="text-2xl font-black text-white uppercase italic">DFY Vault Training</CardTitle>
            <CardDescription className="text-blue-400 font-bold">
              Watch this first to maximize your results with the 200+ DFY videos
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent className="p-0 relative">
          {/* Video Placeholder */}
          <div className="aspect-video bg-zinc-900 flex items-center justify-center group cursor-pointer">
            <div className="w-24 h-24 rounded-full bg-pink-500/80 flex items-center justify-center shadow-[0_0_50px_rgba(236,72,153,0.4)] group-hover:scale-110 transition-transform duration-300">
              <Play className="w-10 h-10 text-white fill-white ml-1" />
            </div>
            {/* Click to play text overlay */}
            <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex items-center gap-2 text-white font-black uppercase tracking-widest text-xl drop-shadow-md">
                <Play className="w-6 h-6 fill-white" />
                Click to Play Training
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Bonus Banner */}
      <div className="bg-[#004d40] rounded-4xl p-8 md:p-12 relative overflow-hidden group">
        <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
            <div className="w-24 h-24 shrink-0 rounded-3xl bg-primary/20 border-2 border-primary/30 flex items-center justify-center shadow-[0_0_30px_rgba(179,255,0,0.2)]">
                <div className="relative">
                    <Zap className="w-12 h-12 text-primary" />
                    <span className="absolute -top-1 -right-1 text-yellow-400 text-xl font-black">$</span>
                </div>
            </div>
            <div className="flex-1 space-y-4 text-center md:text-left">
                <h3 className="text-2xl md:text-3xl font-black text-white uppercase italic leading-tight">
                    Wanna Wake Up With An Additional <span className="text-primary">$1,000-$5,000</span> In Your Bank Account Tomorrow?
                </h3>
                <p className="text-zinc-300 font-medium max-w-2xl">
                    Robinhood is amazing, but if you want to know how to scale to $1,000 - $5,000 every single day... without doing any extra work...
                </p>
                <p className="text-[#B3FF00] font-black italic uppercase text-sm tracking-wider">
                    Then you have to watch this FREE training now (Will be taken down soon)
                </p>
            </div>
            <Button className="h-16 px-8 bg-[#fb923c] hover:bg-[#f97316] text-black font-black text-lg -skew-x-12 rounded-none group">
                <span className="skew-x-12 flex items-center gap-2 italic uppercase">
                    Click Here To Watch Free Training <ArrowRight className="w-5 h-5" />
                </span>
            </Button>
        </div>
        {/* Background Decorative Element */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
      </div>

      {/* Training Library */}
      <div className="space-y-8">
        <div className="space-y-1">
            <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-pink-500/20 flex items-center justify-center">
                    <Video className="w-4 h-4 text-pink-500" />
                </div>
                <h2 className="text-3xl font-black text-white uppercase italic">Training Library</h2>
            </div>
            <p className="text-zinc-500 font-bold uppercase text-xs tracking-widest pl-11">Watch these first to maximize your results</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {trainingVideos.map((video, idx) => (
                <div key={idx} className="group cursor-pointer space-y-4">
                    <div className="relative aspect-video rounded-2xl overflow-hidden border-2 border-white/5 transition-all duration-300 group-hover:border-primary/50 group-hover:shadow-[0_0_30px_rgba(179,255,0,0.1)]">
                        <img src={video.thumbnail} alt={video.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors" />
                        <div className="absolute bottom-3 right-3 bg-black/80 px-2 py-1 rounded text-[10px] font-black text-white">{video.duration}</div>
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                            <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center">
                                <Play className="w-6 h-6 text-white fill-white ml-0.5" />
                            </div>
                        </div>
                    </div>
                    <div className="space-y-1">
                        <h4 className="text-white font-black uppercase text-sm group-hover:text-primary transition-colors">{video.title}</h4>
                        <p className="text-zinc-500 text-xs font-medium leading-relaxed">{video.description}</p>
                    </div>
                </div>
            ))}
        </div>
      </div>

      {/* Select Your Product Section */}
      <Card className="glass-strong border-2 border-primary/20 bg-[#111111] overflow-hidden rounded-4xl shadow-[0_0_60px_rgba(0,0,0,0.5)]">
        <CardContent className="p-10 md:p-14 space-y-10">
            <div className="flex items-center gap-6">
                <div className="w-16 h-16 rounded-2xl bg-[#fbbf24]/20 border-2 border-[#fbbf24]/30 flex items-center justify-center shadow-[0_0_30px_rgba(251,191,36,0.2)] text-[#fbbf24]">
                    <Zap className="w-10 h-10 fill-[#fbbf24]" />
                </div>
                <div className="space-y-1">
                    <h2 className="text-4xl font-black text-white uppercase italic leading-none">Select Your Product</h2>
                    <p className="text-blue-400 font-bold tracking-tight">Your product will be inserted into all comments automatically</p>
                </div>
            </div>

            <div className="h-px bg-white/5 w-full" />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-3">
                    <Label className="text-lg font-black text-white uppercase italic tracking-tighter">Product Name</Label>
                    <Input 
                        placeholder="e.g., Keto Weight Loss System" 
                        className="h-16 bg-blue-900/10 border-2 border-white/5 focus:border-[#fb923c]/50 rounded-2xl text-lg font-bold placeholder:text-zinc-700" 
                    />
                </div>
                <div className="space-y-3">
                    <Label className="text-lg font-black text-white uppercase italic tracking-tighter">Affiliate Link</Label>
                    <Input 
                        placeholder="https://..." 
                        className="h-16 bg-blue-900/10 border-2 border-white/5 focus:border-[#fb923c]/50 rounded-2xl text-lg font-bold placeholder:text-zinc-700"
                    />
                </div>
            </div>

            <Button className="w-full h-20 bg-[#fb923c] hover:bg-[#f97316] text-white font-black text-2xl uppercase italic tracking-tighter rounded-3xl shadow-[0_10px_40px_rgba(249,115,22,0.3)] transition-all duration-300 hover:scale-[1.02]">
                Unlock DFY Library <ArrowRight className="w-8 h-8 ml-2" />
            </Button>
        </CardContent>
      </Card>
    </div>
  )
}
