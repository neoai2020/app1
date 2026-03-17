"use client"

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Sparkles, MessageSquare, Phone, MoreVertical } from "lucide-react"

const recentActivities = [
  { id: 1, type: "Registration", user: "Michael S.", time: "2m ago", amount: "+ $24.00" },
  { id: 2, type: "Payment", user: "Sarah L.", time: "15m ago", amount: "+ $150.00" },
  { id: 3, type: "Interaction", user: "David C.", time: "32m ago", amount: "+ $5.00" },
]

export function LiveActivitiesSidebar() {
  return (
    <div className="flex flex-col gap-8 w-full">
      {/* Activity Feed */}
      <Card className="glass-card bg-[#111111] border-white/5 overflow-hidden">
        <CardHeader className="p-8 pb-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-black text-white uppercase tracking-widest">Live Activity</h3>
            <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse shadow-[0_0_8px_rgba(239,68,68,0.5)]" />
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="flex flex-col">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="p-8 py-5 flex items-center justify-between border-b border-white/5 hover:bg-white/2 transition-colors cursor-pointer last:border-0 group">
                <div className="flex items-center gap-4">
                   <div className="w-10 h-10 rounded-xl bg-zinc-800 flex items-center justify-center text-[10px] font-black text-white group-hover:bg-primary group-hover:text-black transition-colors uppercase">
                      {activity.user.charAt(0)}
                   </div>
                   <div>
                      <p className="text-xs font-black text-white tracking-tight">{activity.user}</p>
                      <p className="text-[9px] text-zinc-500 font-bold uppercase tracking-widest">{activity.time}</p>
                   </div>
                </div>
                <div className="text-right">
                   <p className="text-xs font-black text-primary drop-shadow-[0_0_10px_rgba(179,255,0,0.3)]">{activity.amount}</p>
                   <p className="text-[9px] text-zinc-500 font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">View</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recommended/Quick Actions to Match reference */}
      <Card className="glass-card bg-[#111111] border-white/5 p-8 relative overflow-hidden group">
         <div className="relative z-10">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
               <Sparkles className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-lg font-black text-white uppercase tracking-wider mb-2">Manager Support</h3>
            <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-tight mb-8">Personal assistant available 24/7</p>
            
            <div className="flex items-center gap-4">
               <Button className="h-12 flex-1 bg-white/3 hover:bg-white/5 text-white font-black text-[10px] uppercase tracking-widest border border-white/5 rounded-xl">
                  Connect
               </Button>
               <Button size="icon" className="h-12 w-12 bg-primary hover:bg-primary/90 text-black rounded-xl border-none">
                  <Phone className="w-4 h-4 fill-black" />
               </Button>
            </div>
         </div>
         {/* Abstract background shape */}
         <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl -mr-16 -mt-16" />
      </Card>
    </div>
  )
}
