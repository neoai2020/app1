import { Loader2 } from "lucide-react"

export default function TrainingLoading() {
  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      <div className="space-y-4">
        <div className="h-12 w-64 bg-muted/50 rounded-lg animate-pulse" />
        <div className="h-6 w-96 bg-muted/50 rounded-lg animate-pulse" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="h-80 bg-muted/50 rounded-2xl animate-pulse" />
        ))}
      </div>

      <div className="flex items-center justify-center py-12">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    </div>
  )
}
