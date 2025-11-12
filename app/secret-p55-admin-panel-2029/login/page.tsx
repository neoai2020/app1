"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Shield, AlertCircle } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function AdminLoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    // Hardcoded credentials check
    if (email === "admin@p55app.com" && password === "p55@@admin29") {
      // Set admin session in localStorage
      localStorage.setItem("p55_admin_authenticated", "true")
      router.push("/secret-p55-admin-panel-2029/dashboard")
    } else {
      setError("Invalid admin credentials")
    }

    setLoading(false)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-4">
      <Card className="w-full max-w-md border-red-500/20">
        <CardHeader className="space-y-1 text-center">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-red-500/10 rounded-full">
              <Shield className="h-8 w-8 text-red-500" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold">Admin Panel</CardTitle>
          <CardDescription>Restricted Access - Authorized Personnel Only</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <div className="space-y-2">
              <Label htmlFor="email">Admin Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="admin@p55app.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="border-slate-700"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Admin Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="border-slate-700"
              />
            </div>

            <Button type="submit" className="w-full bg-red-600 hover:bg-red-700" disabled={loading}>
              {loading ? "Authenticating..." : "Access Admin Panel"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
