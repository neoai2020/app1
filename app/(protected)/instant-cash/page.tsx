"use client"

import { useState } from "react"
import { ArrowLeft, ExternalLink } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function InstantCashPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [iframeError, setIframeError] = useState(false)

  return (
    <div className="min-h-screen bg-white">
      {/* Header Section */}
      <div className="max-w-4xl mx-auto px-6 py-8">
        <Link href="/dashboard">
          <Button variant="ghost" className="mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Button>
        </Link>

        <h1 className="text-4xl font-bold text-center mb-8 text-gray-900">💵 Instant Cash Injection</h1>

        {/* How It Works Section */}
        <div className="bg-gray-50 rounded-lg p-8 mb-8 shadow-sm border border-gray-200">
          <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2 text-gray-900">💡 How It Works</h2>

          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-cyan-500 text-white rounded-full flex items-center justify-center font-bold">
                1
              </div>
              <div>
                <p className="text-lg text-gray-900">
                  <strong className="text-gray-900">Pick any survey below</strong>{" "}
                  <span className="text-gray-700">that interests you.</span>
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-cyan-500 text-white rounded-full flex items-center justify-center font-bold">
                2
              </div>
              <div>
                <p className="text-lg text-gray-900">
                  <strong className="text-gray-900">Answer a few simple questions</strong>{" "}
                  <span className="text-gray-700">honestly (takes 3–10 minutes).</span>
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-cyan-500 text-white rounded-full flex items-center justify-center font-bold">
                3
              </div>
              <div>
                <p className="text-lg text-gray-900">
                  <strong className="text-gray-900">Once you finish</strong>,{" "}
                  <span className="text-gray-700">
                    you'll instantly receive real cash rewards directly from Toluna.
                  </span>
                </p>
              </div>
            </div>
          </div>

          <p className="mt-6 text-center text-gray-600 italic font-medium">
            No experience needed. No commitments. Just your opinion — and instant cash.
          </p>
        </div>

        <div className="bg-gradient-to-br from-cyan-50 to-blue-50 rounded-xl p-12 text-center border-2 border-cyan-200 shadow-lg">
          <div className="max-w-2xl mx-auto">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">Ready to Start Earning?</h3>
            <p className="text-lg text-gray-700 mb-8">
              Click the button below to access hundreds of paid surveys from Toluna. Start earning cash rewards for
              sharing your opinions today!
            </p>

            <a
              href="https://www.toluna.com/en"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-bold text-xl py-5 px-10 rounded-xl transition-all transform hover:scale-105 shadow-xl hover:shadow-2xl"
            >
              <span>Start Taking Surveys Now</span>
              <ExternalLink className="w-6 h-6" />
            </a>

            <p className="mt-6 text-sm text-gray-600">Opens in a new tab • 100% Free • Instant Rewards</p>
          </div>
        </div>
      </div>
    </div>
  )
}
