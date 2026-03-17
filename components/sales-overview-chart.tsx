"use client"

import { Card } from "@/components/ui/card"
import { Users, ShoppingBag, Globe, PieChart } from "lucide-react"

export function SalesOverviewChart() {
  return (
    <Card className="glass-card p-8 bg-[#111111] border-white/5 flex flex-col h-full">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h3 className="text-lg font-black text-white uppercase tracking-wider">Sales Overview</h3>
          <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-tight mt-1">Monthly performance data</p>
        </div>
        <div className="flex items-center gap-2">
           <div className="flex items-center gap-1.5 px-3 py-1.5 bg-white/2 rounded-lg border border-white/5">
              <span className="w-2 h-2 rounded-full bg-primary" />
              <span className="text-[10px] font-black text-white uppercase">Profit</span>
           </div>
        </div>
      </div>

      <div className="flex-1 flex flex-col items-center justify-around gap-8">
        {/* Donut Chart Representation */}
        <div className="relative w-56 h-56">
          <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
            <circle
              cx="50" cy="50" r="40"
              fill="transparent"
              stroke="#1a1a1a"
              strokeWidth="12"
            />
            <circle
              cx="50" cy="50" r="40"
              fill="transparent"
              stroke="#B3FF00"
              strokeWidth="12"
              strokeDasharray="251.2"
              strokeDashoffset="62.8"
              strokeLinecap="round"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-4xl font-black text-white tracking-widest">75%</span>
            <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest mt-1">Growth</span>
          </div>
        </div>

        {/* Legend / Stats */}
        <div className="grid grid-cols-2 gap-8 w-full max-w-[320px] mx-auto pb-4">
           <div className="space-y-1 flex flex-col items-center">
              <div className="flex items-center gap-2 text-zinc-500">
                 <ShoppingBag className="w-3.5 h-3.5" />
                 <span className="text-[10px] font-bold uppercase tracking-wider">Products</span>
              </div>
              <p className="text-xl font-black text-white tracking-tight">1,211</p>
           </div>
           <div className="space-y-1 flex flex-col items-center">
              <div className="flex items-center gap-2 text-zinc-500">
                 <Users className="w-3.5 h-3.5" />
                 <span className="text-[10px] font-bold uppercase tracking-wider">Clients</span>
              </div>
              <p className="text-xl font-black text-white tracking-tight">8,221</p>
           </div>
           <div className="space-y-1 flex flex-col items-center">
              <div className="flex items-center gap-2 text-zinc-500">
                 <Globe className="w-3.5 h-3.5" />
                 <span className="text-[10px] font-bold uppercase tracking-wider">Reach</span>
              </div>
              <p className="text-xl font-black text-white tracking-tight">2.4M</p>
           </div>
           <div className="space-y-1 flex flex-col items-center">
              <div className="flex items-center gap-2 text-zinc-500">
                 <PieChart className="w-3.5 h-3.5" />
                 <span className="text-[10px] font-bold uppercase tracking-wider">Share</span>
              </div>
              <p className="text-xl font-black text-white tracking-tight">12.5%</p>
           </div>
        </div>
      </div>
    </Card>
  )
}
