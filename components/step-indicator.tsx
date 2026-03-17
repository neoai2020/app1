import { Check } from "lucide-react"

interface StepIndicatorProps {
  currentStep: number
}

const steps = [
  { number: 1, title: "Pick a Category", description: "Choose what you like" },
  { number: 2, title: "Generate Comments", description: "Get your comment pack" },
]

export function StepIndicator({ currentStep }: StepIndicatorProps) {
  return (
    <div className="glass-strong border-border/50 rounded-2xl p-6 lg:p-8">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => (
          <div key={step.number} className="flex items-center flex-1">
            <div className="flex flex-col items-center gap-3 flex-1">
              <div
                className={`w-16 h-16 rounded-2xl flex items-center justify-center text-2xl font-black transition-all duration-300 ${
                  currentStep > step.number
                    ? "bg-primary text-primary-foreground glow-gold"
                    : currentStep === step.number
                      ? "bg-secondary text-primary-foreground glow-emerald"
                      : "bg-card text-muted-foreground border-2 border-primary/10"
                }`}
              >
                {currentStep > step.number ? <Check className="w-8 h-8" /> : step.number}
              </div>
              <div className="text-center">
                <p
                  className={`text-lg font-extrabold ${currentStep >= step.number ? "text-white" : "text-secondary/50"}`}
                >
                  {step.title}
                </p>
                <p className="text-sm text-secondary font-semibold">{step.description}</p>
              </div>
            </div>
            {index < steps.length - 1 && (
              <div className="flex-1 h-1 mx-4 rounded-full bg-card overflow-hidden border border-primary/10">
                <div
                  className={`h-full transition-all duration-500 ${currentStep > step.number ? "bg-primary w-full" : "bg-transparent w-0"}`}
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
