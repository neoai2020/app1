import type React from "react"
import { AppSidebar } from "@/components/app-sidebar"
import { NotificationBanner } from "@/components/notification-banner"

export default function ProtectedLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen w-full bg-[#080808]">
      <AppSidebar />
      <main className="flex-1 ml-72 p-6 lg:p-8">
        <div className="max-w-[1700px] mx-auto">
          <NotificationBanner />
        </div>
        {children}
      </main>
    </div>
  )
}
