"use client"

import { Smartphone, Zap } from "lucide-react"

export function NotificationBanner() {
  return (
    <div className="w-full bg-[#00B894] rounded-3xl p-6 md:p-12 mb-8 relative overflow-hidden group shadow-[0_12px_40px_rgba(0,184,148,0.25)] min-h-[220px] flex items-center">
      {/* Decorative background element */}
      <div className="absolute top-[-20%] right-[-5%] w-64 h-64 bg-white/10 rounded-full blur-3xl pointer-events-none group-hover:bg-white/20 transition-all duration-700" />
      
      <div className="flex flex-col md:flex-row items-center justify-between gap-6 md:gap-12 relative z-10 w-full">
        {/* Icon & Text Group */}
        <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8 text-center md:text-left">
          {/* Icon Section */}
          <div className="shrink-0">
            <div className="relative w-16 h-16 md:w-20 md:h-20 bg-white/20 rounded-2xl flex items-center justify-center border border-white/30 backdrop-blur-sm">
              <Smartphone className="w-8 h-8 md:w-10 md:h-10 text-white" />
              <div className="absolute -top-2 -right-2 bg-yellow-400 rounded-full p-1 shadow-lg border-2 border-[#00B894]">
                <Zap className="w-3 h-3 text-black fill-black" />
              </div>
            </div>
          </div>

          {/* Text Content */}
          <div className="space-y-1">
            <h2 className="text-xl md:text-2xl font-black text-white leading-tight uppercase italic tracking-tight">
              Want To Multiply Your Earnings To $1,000 - $5,000 A Day?
            </h2>
            <div className="space-y-2">
              <p className="text-[11px] md:text-xs text-white/90 font-bold leading-relaxed max-w-2xl">
                AI Wealth OS is powerful, but if you want to scale to truly life-changing income, you need to watch this training which shows how to automate your entire workflow. And guess what?
              </p>
              <p className="text-[11px] md:text-xs text-white/90 font-bold leading-relaxed">
                This training is free for all AI Wealth members. So, if you want to unlock your full potential, just tap the yellow button below.
              </p>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="shrink-0 w-full md:w-auto">
          <a 
            href="https://www.jvzoo.com/c/86517/415009" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center justify-center w-full md:w-auto bg-[#FFC107] hover:bg-[#FFB300] text-black font-black px-12 py-5 rounded-xl transition-all duration-300 shadow-[0_4px_15px_rgba(255,193,7,0.3)] hover:scale-105 active:scale-95 text-base uppercase italic tracking-tighter whitespace-nowrap"
          >
            Click Here To Learn How
          </a>
        </div>
      </div>
    </div>
  )
}
