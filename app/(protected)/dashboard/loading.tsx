import { Loader2 } from "lucide-react"

export default function DashboardLoading() {
  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Welcome Section Skeleton */}
      <div className="space-y-4">
        <div className="h-12 w-96 bg-muted/50 rounded-lg animate-pulse" />
        <div className="h-6 w-64 bg-muted/50 rounded-lg animate-pulse" />
      </div>

      {/* Stats Grid Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-32 bg-muted/50 rounded-2xl animate-pulse" />
        ))}
      </div>

      {/* Quick Actions Skeleton */}
      <div className="space-y-6">
        <div className="h-10 w-48 bg-muted/50 rounded-lg animate-pulse" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-48 bg-muted/50 rounded-2xl animate-pulse" />
          ))}
        </div>
      </div>

      <div className="flex items-center justify-center py-12">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    </div>
  )
}
