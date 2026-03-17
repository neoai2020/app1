import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Check, Crown, Zap, Rocket } from "lucide-react"
import Link from "next/link"

const upgrades = [
  {
    id: "dfy_vault",
    name: "DFY Vault",
    tagline: "Done-For-You Templates",
    icon: Crown,
    color: "cyan",
    features: [
      "50+ Pre-Written Page Templates",
      "Swipe File of Top Performers",
      "Advanced SEO Training",
      "Priority Email Support",
      "Unlimited Page Generation",
      "Custom Branding Options",
    ],
    href: "/upgrades/dfy-vault",
  },
  {
    id: "instant_income",
    name: "Instant Income",
    tagline: "Fast-Track Your Earnings",
    icon: Zap,
    color: "violet",
    features: [
      "Everything in DFY Vault",
      "Paid Traffic Training",
      "FB Ads Masterclass",
      "Landing Page Builder",
      "Split Testing Tools",
      "1-on-1 Strategy Call",
    ],
    href: "/upgrades/instant-income",
  },
  {
    id: "automated_income",
    name: "Automated Income",
    tagline: "Set It and Forget It",
    icon: Rocket,
    color: "jade",
    features: [
      "Everything in Instant Income",
      "Email Automation System",
      "Auto-Responder Sequences",
      "Traffic Automation Tools",
      "Advanced Analytics Dashboard",
      "Lifetime Updates & Support",
    ],
    href: "/upgrades/automated-income",
  },
]

export default async function UpgradesPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) {
    redirect("/auth/login")
  }

  const { data: profile } = await supabase.from("users").select("*").eq("id", user.id).single()

  return (
    <div className="max-w-7xl mx-auto space-y-12">
      <div className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#B3FF00]/10 border border-[#B3FF00]/20 mb-4">
          <Crown className="w-4 h-4 text-[#B3FF00]" />
          <span className="text-[10px] font-black text-white uppercase tracking-[0.2em]">Premium Access Level</span>
        </div>
        <h1 className="text-6xl font-black text-white tracking-tighter uppercase italic">COMMAND UPGRADES</h1>
        <p className="text-xl text-zinc-500 font-bold uppercase tracking-tight max-w-2xl mx-auto">
          Elevate your operational capabilities and unlock advanced profit extraction protocols.
        </p>
      </div>

      {profile?.upgrade_level !== "free" && (
        <div className="glass-strong border-2 border-[#B3FF00]/20 bg-[#B3FF00]/5 rounded-3xl p-8 flex items-center justify-center gap-4 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-[#B3FF00]/40 blur-sm" />
          <Zap className="w-6 h-6 text-[#B3FF00]" />
          <p className="text-lg font-black text-white uppercase italic tracking-wider">
            CURRENT ACCESS PROTOCOL:{" "}
            <span className="text-[#B3FF00]">
              {profile?.upgrade_level === "dfy_vault"
                ? "DFY VAULT"
                : profile?.upgrade_level === "instant_income"
                  ? "INSTANT INCOME"
                  : "AUTOMATED INCOME"}
            </span>
          </p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {upgrades.map((upgrade) => {
          const Icon = upgrade.icon
          const isCurrentPlan = profile?.upgrade_level === upgrade.id
          
          return (
            <Card key={upgrade.id} className="glass-strong border-2 border-white/5 bg-[#111111] overflow-hidden group hover:border-[#B3FF00]/30 transition-all duration-500 flex flex-col rounded-4xl relative">
              <div className="absolute top-0 left-0 w-full h-1 bg-white/5 group-hover:bg-[#B3FF00]/40 transition-all" />
              
              <CardHeader className="p-10 text-center pb-8 border-b border-white/5">
                <div className="w-24 h-24 rounded-4xl bg-white/3 flex items-center justify-center mx-auto mb-6 border-2 border-white/5 group-hover:bg-[#B3FF00] group-hover:rotate-12 transition-all duration-500 shadow-xl">
                  <Icon className="w-12 h-12 text-white group-hover:text-black" />
                </div>
                <div className="space-y-2">
                   <p className="text-[10px] font-black text-[#B3FF00] uppercase tracking-[0.3em]">{upgrade.tagline}</p>
                   <CardTitle className="text-3xl font-black text-white uppercase italic tracking-tighter">{upgrade.name}</CardTitle>
                </div>
              </CardHeader>

              <CardContent className="p-10 flex-1 flex flex-col space-y-10">
                <div className="space-y-4 flex-1">
                  <p className="text-[10px] font-black text-zinc-600 uppercase tracking-widest mb-6">Unlocked Features:</p>
                  {upgrade.features.map((feature, index) => (
                    <div key={index} className="flex items-start gap-3 group/feat">
                      <div className="w-5 h-5 rounded bg-[#B3FF00]/10 flex items-center justify-center shrink-0 border border-[#B3FF00]/20 group-hover/feat:bg-[#B3FF00]">
                         <Check className="w-3 h-3 text-[#B3FF00] group-hover/feat:text-black" />
                      </div>
                      <p className="text-sm font-bold text-zinc-400 group-hover/feat:text-white transition-colors">{feature}</p>
                    </div>
                  ))}
                </div>

                <Link href={upgrade.href} className="w-full">
                  <Button className={`w-full h-16 text-lg font-black uppercase italic rounded-2xl transition-all ${
                    isCurrentPlan 
                      ? "bg-white/5 border border-white/10 text-white hover:bg-white/10" 
                      : "bg-[#B3FF00] text-black shadow-[0_8px_30px_rgba(179,255,0,0.2)] hover:scale-105"
                  }`}>
                    {isCurrentPlan ? "ACCESS COMMAND" : "VIEW DETAILS"}
                  </Button>
                </Link>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
