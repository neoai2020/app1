import Link from "next/link"

export function EarningsBanner() {
  return (
    <div className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 rounded-lg p-6 md:p-8 mb-6">
      <div className="flex flex-col md:flex-row items-center gap-6 md:gap-8">
        {/* Image */}
        <div className="flex-shrink-0">
          <img
            src="https://app.wifi-profits.com/assets/img/banner-ill.svg"
            alt="Phone Earning"
            className="w-40 md:w-52 h-auto"
          />
        </div>

        {/* Content */}
        <div className="flex-1 text-center md:text-left">
          <h2 className="text-xl md:text-2xl font-bold text-white mb-3">
            Want To Multiply Your Earnings To $1,000 - $5,000 A Day?
          </h2>
          <p className="text-sm md:text-base text-white/95 mb-4 leading-relaxed">
            The P55 Account Is Great, but if you want to scale to truly life-changing income, you need to watch this
            training which shows how to make the serious big boy big girl money. And guess what?
            <br />
            <br />
            This training is free if you're a P55 account member. So, if you want to watch the training, just tap the
            yellow button below.
          </p>
          <Link
            href="https://freedomescapexcelerator.com/2k-per-day"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-amber-400 hover:bg-amber-500 text-black font-bold px-6 py-3 rounded-md transition-colors duration-200"
          >
            Click Here To Learn How
          </Link>
        </div>
      </div>
    </div>
  )
}
