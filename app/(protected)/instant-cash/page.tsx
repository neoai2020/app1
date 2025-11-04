"use client"

import { useState } from "react"
import { ArrowLeft, Loader2 } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function InstantCashPage() {
  const [isLoading, setIsLoading] = useState(true)

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

        <h1 className="text-4xl font-bold text-center mb-8">💵 Instant Cash Injection</h1>

        {/* How It Works Section */}
        <div className="bg-gray-50 rounded-lg p-8 mb-8 shadow-sm">
          <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">💡 How It Works</h2>

          <div className="space-y-4">
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-cyan-500 text-white rounded-full flex items-center justify-center font-bold">
                1
              </div>
              <div>
                <p className="text-lg">
                  <strong>Pick any survey below</strong> that interests you.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-cyan-500 text-white rounded-full flex items-center justify-center font-bold">
                2
              </div>
              <div>
                <p className="text-lg">
                  <strong>Answer a few simple questions</strong> honestly (takes 3–10 minutes).
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-cyan-500 text-white rounded-full flex items-center justify-center font-bold">
                3
              </div>
              <div>
                <p className="text-lg">
                  <strong>Once you finish</strong>, you'll instantly receive real cash rewards directly from Toluna.
                </p>
              </div>
            </div>
          </div>

          <p className="mt-6 text-center text-gray-600 italic">
            No experience needed. No commitments. Just your opinion — and instant cash.
          </p>
        </div>
      </div>

      {/* WebView/Iframe Section */}
      <div className="relative w-full" style={{ height: "calc(100vh - 400px)", minHeight: "600px" }}>
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-white z-10">
            <div className="text-center">
              <Loader2 className="w-8 h-8 animate-spin text-cyan-500 mx-auto mb-4" />
              <p className="text-gray-600">Loading surveys…</p>
            </div>
          </div>
        )}

        <iframe
          src="https://www.toluna.com/en"
          className="w-full h-full border-0 transition-opacity duration-300"
          style={{ opacity: isLoading ? 0 : 1 }}
          onLoad={() => setIsLoading(false)}
          title="Toluna Surveys"
          allow="payment"
        />
      </div>
    </div>
  )
}
