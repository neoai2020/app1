import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { Card, CardContent } from "@/components/ui/card"
import { Play, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export default async function TrainingPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) {
    redirect("/auth/login")
  }

  const trainingSteps = [
    {
      step: 1,
      title: "Gold Rush Training",
      description: "Learn how to use the Gold Rush Generator to find viral opportunities and generate money-making comments",
      videoId: "1151044475",
      duration: "10 min",
    },
    {
      step: 2,
      title: "My Vault Training",
      description: "Master the My Vault system to manage your comment packs and track your results effectively",
      videoId: "1151044790",
      duration: "12 min",
    },
  ]

  return (
    <div className="max-w-7xl mx-auto space-y-12">
      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-1.5 h-10 bg-[#B3FF00] rounded-full" />
          <h1 className="text-6xl font-black text-white tracking-tighter uppercase italic">TRAINING HUB</h1>
        </div>
        <p className="text-xl text-zinc-500 font-bold uppercase tracking-tight max-w-2xl">
          Master the high-velocity extraction protocols. 5 steps to total system dominance.
        </p>
      </div>

      {/* Progress Bar / Stats */}
      <div className="glass-strong border-2 border-white/5 bg-[#111111] rounded-4xl p-8 flex flex-col md:flex-row items-center gap-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-[#B3FF00]/5 rounded-bl-[100%] blur-3xl" />
        <div className="w-20 h-20 rounded-3xl bg-[#B3FF00]/10 flex items-center justify-center shrink-0 border border-[#B3FF00]/20">
          <Play className="w-10 h-10 text-[#B3FF00]" />
        </div>
        <div className="flex-1 space-y-2 text-center md:text-left">
          <p className="text-2xl font-black text-white uppercase italic tracking-tight">ELEVATED CLEARANCE REQUIRED</p>
          <p className="text-zinc-500 font-bold uppercase text-[10px] tracking-widest">2 Essential modules identified • Active Learning Phase</p>
        </div>
        <div className="flex items-center gap-3">
           <div className="px-6 py-3 rounded-2xl bg-white/3 border border-white/5 font-black text-white text-sm italic">
             LVL 001
           </div>
        </div>
      </div>

      {/* Training Modules */}
      <div className="grid grid-cols-1 gap-12">
        {trainingSteps.map((training) => (
          <Card
            key={training.step}
            className="glass-strong border-2 border-white/5 bg-[#111111] rounded-5xl overflow-hidden group hover:border-[#B3FF00]/20 transition-all duration-700"
          >
            <CardContent className="p-0">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                {/* Video Player Section */}
                <div className="relative aspect-video bg-black group-hover:opacity-90 transition-opacity">
                   <div className="absolute inset-0 bg-[#B3FF00]/5 pointer-events-none z-10 opacity-0 group-hover:opacity-100 transition-opacity" />
                   <iframe
                    src={`https://player.vimeo.com/video/${training.videoId}?badge=0&autopause=0&player_id=0&app_id=58479`}
                    title={training.title}
                    allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media"
                    allowFullScreen
                    className="absolute inset-0 w-full h-full border-0 z-0"
                  />
                </div>

                {/* Info Section */}
                <div className="p-12 flex flex-col justify-center space-y-8 relative">
                  <div className="flex items-center gap-6">
                    <div className="w-24 h-24 rounded-4xl bg-white/3 border-2 border-white/5 flex items-center justify-center group-hover:bg-[#B3FF00] group-hover:rotate-6 transition-all duration-500">
                      <span className="text-5xl font-black text-white group-hover:text-black italic">{training.step}</span>
                    </div>
                    <div className="space-y-1">
                      <span className="px-4 py-1 rounded-full bg-[#B3FF00]/10 text-[#B3FF00] text-[10px] font-black uppercase tracking-widest border border-[#B3FF00]/20">
                        {training.duration} • PROTOCOL
                      </span>
                      <h2 className="text-4xl font-black text-white uppercase italic tracking-tighter">{training.title}</h2>
                    </div>
                  </div>
                  
                  <p className="text-xl text-zinc-500 font-bold leading-relaxed">
                    {training.description}
                  </p>

                  <div className="pt-4 flex items-center gap-4">
                    <div className="h-0.5 flex-1 bg-white/5 relative overflow-hidden rounded-full">
                       <div className="absolute inset-0 bg-[#B3FF00]/40 w-1/3 group-hover:w-full transition-all duration-1000" />
                    </div>
                    <span className="text-[10px] font-black text-zinc-600 uppercase tracking-widest">Readiness: 34%</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Support Section */}
      <Card className="glass-strong border-2 border-white/5 bg-[#111111] rounded-5xl overflow-hidden relative group">
        <CardContent className="p-16 text-center space-y-8 relative z-10">
          <div className="w-24 h-24 rounded-3xl bg-white/3 border border-white/5 flex items-center justify-center mx-auto group-hover:scale-110 transition-transform">
            <Play className="w-10 h-10 text-[#B3FF00]" />
          </div>
          <div className="space-y-4">
            <h3 className="text-4xl font-black text-white uppercase italic tracking-tighter">INTEL DEBRIEF REQUIRED?</h3>
            <p className="text-xl text-zinc-500 font-bold max-w-2xl mx-auto">
              If you require a deeper tactical breakdown or system support, our command center is active 24/7.
            </p>
          </div>
          <Button asChild className="h-16 px-12 text-lg font-black bg-white/3 hover:bg-[#B3FF00] border-2 border-white/5 hover:border-[#B3FF00] text-white hover:text-black rounded-2xl transition-all">
            <a
              href="https://p55account.zendesk.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3"
            >
              ACCESS SUPPORT COMMAND
              <ArrowRight className="w-5 h-5" />
            </a>
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
