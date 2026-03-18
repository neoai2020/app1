"use client"

import type React from "react"

import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { Brain } from "lucide-react"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    const supabase = createClient()
    setIsLoading(true)
    setError(null)

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })
      if (error) throw error
      router.push("/")
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : "An error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen w-full items-center justify-center p-6 bg-linear-to-br from-background via-card to-background">
      <div className="w-full max-w-lg">
        <Card className="glass-strong glow-gold border-2 border-primary/40">
          <CardHeader className="space-y-4">
            <div className="flex items-center justify-center mb-6">
              <div className="relative w-20 h-20 rounded-3xl bg-linear-to-br from-primary via-secondary to-accent flex items-center justify-center shadow-[0_0_80px_rgba(212,175,55,0.4)]">
                <div className="w-[72px] h-[72px] rounded-[22px] bg-background flex items-center justify-center">
                  <Brain className="w-10 h-10 text-primary" />
                </div>
              </div>
            </div>
            <CardTitle className="text-4xl font-extrabold text-white text-center tracking-tight">Access Robinhood</CardTitle>
            <CardDescription className="text-lg text-secondary text-center font-semibold">
              Neural Engagement Platform
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-7">
              <div className="space-y-3">
                <Label htmlFor="email" className="text-base font-bold text-white">
                  Email Address
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-14 text-lg glass border-2 border-primary/30 focus:border-primary rounded-2xl"
                />
              </div>
              <div className="space-y-3">
                <Label htmlFor="password" className="text-base font-bold text-white">
                  Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-14 text-lg glass border-2 border-primary/30 focus:border-primary rounded-2xl"
                />
              </div>
              {error && (
                <div className="p-4 rounded-2xl bg-destructive/15 border-2 border-destructive/30">
                  <p className="text-sm text-destructive font-semibold">{error}</p>
                </div>
              )}
              <Button type="submit" className="w-full h-16 text-lg font-extrabold glow-gold bg-linear-to-r from-primary to-secondary text-primary-foreground hover:brightness-110 rounded-2xl transition-all duration-300" disabled={isLoading}>
                {isLoading ? "Authenticating..." : "Enter Platform"}
              </Button>
              <div className="text-center pt-2">
                <p className="text-base text-secondary/80">
                  New user?{" "}
                  <Link href="/auth/sign-up" className="text-primary hover:text-accent font-bold transition-colors">
                    Create Account
                  </Link>
                </p>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
