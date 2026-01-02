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
                className={`w-16 h-16 rounded-2xl flex items-center justify-center text-2xl font-bold transition-all duration-300 ${
                  currentStep > step.number
                    ? "bg-accent text-background glow-jade"
                    : currentStep === step.number
                      ? "bg-primary text-background glow-cyan"
                      : "bg-muted text-muted-foreground"
                }`}
              >
                {currentStep > step.number ? <Check className="w-8 h-8" /> : step.number}
              </div>
              <div className="text-center">
                <p
                  className={`text-lg font-bold ${currentStep >= step.number ? "text-foreground" : "text-muted-foreground"}`}
                >
                  {step.title}
                </p>
                <p className="text-sm text-muted-foreground">{step.description}</p>
              </div>
            </div>
            {index < steps.length - 1 && (
              <div className="flex-1 h-1 mx-4 rounded-full bg-muted overflow-hidden">
                <div
                  className={`h-full transition-all duration-500 ${currentStep > step.number ? "bg-accent w-full" : "bg-transparent w-0"}`}
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
