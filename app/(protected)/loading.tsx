import { Loader2 } from "lucide-react"

export default function Loading() {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="text-center space-y-6">
        <div className="relative w-20 h-20 mx-auto">
          <div className="absolute inset-0 bg-gradient-to-br from-[#a855f7] via-[#d946ef] to-[#fbbf24] rounded-2xl blur-xl opacity-50" />
          <div className="relative w-20 h-20 rounded-2xl bg-gradient-to-br from-[#a855f7] to-[#d946ef] flex items-center justify-center">
            <Loader2 className="w-10 h-10 animate-spin text-white" />
          </div>
        </div>
        <p className="text-xl font-bold text-white">Loading AI Platform...</p>
      </div>
    </div>
  )
}
