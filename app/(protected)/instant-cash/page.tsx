"use client"

import { useState } from "react"
import { ArrowLeft, Loader2, ExternalLink } from "lucide-react"
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
      </div>

      <div className="w-full bg-gray-100 border-t-4 border-cyan-500">
        <div className="max-w-7xl mx-auto">
          <div className="relative w-full" style={{ height: "800px" }}>
            {isLoading && !iframeError && (
              <div className="absolute inset-0 flex items-center justify-center bg-white z-10">
                <div className="text-center">
                  <Loader2 className="w-8 h-8 animate-spin text-cyan-500 mx-auto mb-4" />
                  <p className="text-gray-900 font-medium">Loading surveys…</p>
                </div>
              </div>
            )}

            {iframeError ? (
              <div className="absolute inset-0 flex items-center justify-center bg-white">
                <div className="text-center max-w-md px-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Unable to load surveys directly</h3>
                  <p className="text-gray-700 mb-6">
                    Please click the button below to open Toluna surveys in a new tab:
                  </p>
                  <a
                    href="https://www.toluna.com/en"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-3 px-6 rounded-lg transition-colors"
                  >
                    Open Toluna Surveys
                    <ExternalLink className="w-5 h-5" />
                  </a>
                </div>
              </div>
            ) : (
              <iframe
                src="https://www.toluna.com/en"
                className="w-full h-full border-0"
                onLoad={() => {
                  console.log("[v0] Iframe loaded successfully")
                  setIsLoading(false)
                }}
                onError={() => {
                  console.log("[v0] Iframe failed to load")
                  setIframeError(true)
                  setIsLoading(false)
                }}
                title="Toluna Surveys"
                allow="payment; geolocation"
                sandbox="allow-same-origin allow-scripts allow-forms allow-popups allow-popups-to-escape-sandbox"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
