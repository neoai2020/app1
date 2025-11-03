"use client"

import { useState } from "react"
import { StepIndicator } from "@/components/step-indicator"
import { NicheSelector } from "@/components/niche-selector"
import { OfferSelector } from "@/components/offer-selector"
import { PageGenerator } from "@/components/page-generator"

export default function CreatePage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [selectedNiche, setSelectedNiche] = useState<string | null>(null)
  const [selectedOffer, setSelectedOffer] = useState<string | null>(null)

  const handleNicheSelect = (nicheId: string) => {
    setSelectedNiche(nicheId)
    setCurrentStep(2)
  }

  const handleOfferSelect = (offerId: string) => {
    setSelectedOffer(offerId)
    setCurrentStep(3)
  }

  const handleBack = () => {
    if (currentStep === 2) {
      setCurrentStep(1)
      setSelectedNiche(null)
    } else if (currentStep === 3) {
      setCurrentStep(2)
      setSelectedOffer(null)
    }
  }

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      <div className="space-y-4">
        <h1 className="text-4xl lg:text-5xl font-bold text-foreground">Build Your P55 Profit Page</h1>
        <p className="text-xl text-muted-foreground">Follow 3 simple steps to create your money-making page</p>
      </div>

      <StepIndicator currentStep={currentStep} />

      <div className="min-h-[600px]">
        {currentStep === 1 && <NicheSelector onSelect={handleNicheSelect} />}
        {currentStep === 2 && selectedNiche && (
          <OfferSelector nicheId={selectedNiche} onSelect={handleOfferSelect} onBack={handleBack} />
        )}
        {currentStep === 3 && selectedNiche && selectedOffer && (
          <PageGenerator nicheId={selectedNiche} offerId={selectedOffer} onBack={handleBack} />
        )}
      </div>
    </div>
  )
}
