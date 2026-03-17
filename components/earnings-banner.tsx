import Link from "next/link"
import { Smartphone, DollarSign, TrendingUp } from "lucide-react"

export function EarningsBanner() {
  return (
    <div className="w-full bg-linear-to-r from-background via-card to-background border-2 border-primary/20 rounded-2xl p-6 md:p-8 mb-6 glow-gold">
      <div className="flex flex-col md:flex-row items-center gap-6 md:gap-8">
        <div className="shrink-0">
          <div className="relative w-40 md:w-52 h-40 md:h-52 flex items-center justify-center">
            {/* Phone icon with dollar signs */}
            <div className="relative">
              <Smartphone className="w-24 h-24 md:w-32 md:h-32 text-primary/90" strokeWidth={1.5} />
              <DollarSign
                className="absolute -top-2 -right-2 w-12 h-12 md:w-16 md:h-16 text-primary animate-pulse"
                strokeWidth={2.5}
              />
              <TrendingUp
                className="absolute -bottom-2 -left-2 w-10 h-10 md:w-12 md:h-12 text-secondary"
                strokeWidth={2}
              />
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 text-center md:text-left">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-3 leading-tight tracking-tight">
            Wanna Wake Up With An Additional $1,000-$5,000 In Your Bank Account Tomorrow?
          </h2>
          <p className="text-sm md:text-base text-secondary mb-4 leading-relaxed font-semibold">
            Robinhood is amazing, but if you want to know how to scale to $1,000 - $5,000 every single day... without doing any extra work...
            <br />
            <br />
            Then you have to watch this FREE training now (Will be taken down soon)
          </p>
          <Link
            href="https://www.jvzoo.com/c/86517/415009"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-linear-to-r from-primary to-secondary text-primary-foreground font-bold px-8 py-4 rounded-xl transition-all duration-200 glow-gold hover:scale-105"
          >
            Click Here To Watch Free Training {">>"}
          </Link>
        </div>
      </div>
    </div>
  )
}
