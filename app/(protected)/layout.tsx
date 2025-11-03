import type React from "react"
import { AppSidebar } from "@/components/app-sidebar"

export default function ProtectedLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen w-full bg-[#0A0E12]">
      <AppSidebar />
      <main className="flex-1 ml-64 p-6 lg:p-8">{children}</main>
    </div>
  )
}
