"use client"

import { useState } from "react"
import { StepIndicator } from "@/components/step-indicator"
import { NicheSelector } from "@/components/niche-selector"
import { PageGenerator } from "@/components/page-generator"

export default function CreatePage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [selectedNiche, setSelectedNiche] = useState<string | null>(null)

  const handleNicheSelect = (nicheId: string) => {
    setSelectedNiche(nicheId)
    setCurrentStep(2)
  }

  const handleBack = () => {
    setCurrentStep(1)
    setSelectedNiche(null)
  }

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      <div className="space-y-4">
        <h1 className="text-4xl lg:text-5xl font-bold text-foreground">Build Your P55 Profit Page</h1>
        <p className="text-xl text-muted-foreground">Follow 2 simple steps to create your money-making page</p>
      </div>

      <StepIndicator currentStep={currentStep} />

      <div className="min-h-[600px]">
        {currentStep === 1 && <NicheSelector onSelect={handleNicheSelect} />}
        {currentStep === 2 && selectedNiche && <PageGenerator nicheId={selectedNiche} onBack={handleBack} />}
      </div>
    </div>
  )
}
