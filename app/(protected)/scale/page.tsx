import { ArrowRight, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function ScalePage() {
  const siteName = "Robinhood"

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center p-6 text-center relative overflow-hidden">
      <div className="max-w-4xl space-y-12 relative z-10">
        {/* Exclusive Badge */}
        <div className="flex justify-center">
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#B3FF00]/10 border-2 border-[#B3FF00]/20 text-[#B3FF00] text-[11px] font-black uppercase tracking-[0.25em] shadow-[0_0_30px_rgba(179,255,0,0.15)] animate-pulse">
            <Sparkles className="w-3.5 h-3.5 fill-[#B3FF00]" />
            EXCLUSIVE TRAINING
          </div>
        </div>

        {/* Main Heading */}
        <div className="space-y-6">
          <h1 className="text-6xl md:text-8xl font-black text-white tracking-tighter uppercase italic leading-[0.9]">
            SCALE YOUR <br />
            <span className="text-[#B3FF00] drop-shadow-[0_0_20px_rgba(179,255,0,0.4)]">{siteName}</span> TO
            <br />
            <span className="text-white">$1,000+ PER DAY</span>
          </h1>
          <p className="text-xl md:text-2xl text-zinc-400 font-bold max-w-3xl mx-auto leading-relaxed uppercase tracking-tight">
            Watch this exclusive training to multiply your results and automate your path to life-changing income.
          </p>
        </div>

        {/* Call to Action */}
        <div className="pt-8">
          <Button
            asChild
            className="h-24 px-16 text-2xl md:text-3xl font-black bg-[#B3FF00] hover:bg-[#c4ff33] text-black rounded-3xl shadow-[0_0_50px_rgba(179,255,0,0.3)] hover:shadow-[0_0_70px_rgba(179,255,0,0.5)] transition-all duration-500 hover:scale-105 group border-none italic uppercase"
            size="lg"
          >
            <a href="https://www.jvzoo.com/c/86517/415009" target="_blank" rel="noopener noreferrer" className="flex items-center gap-6">
              CLICK HERE TO ACCESS TRAINING
              <ArrowRight className="w-10 h-10 group-hover:translate-x-3 transition-transform stroke-3" />
            </a>
          </Button>
        </div>

        {/* Background Visual Elements */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 w-[900px] h-[900px] bg-[#B3FF00]/10 rounded-full blur-[160px] pointer-events-none opacity-40" />
      </div>
    </div>
  )
}
