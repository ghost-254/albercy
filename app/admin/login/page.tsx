"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { toast } from "react-toastify"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { useAuth } from "@/contexts/AuthContext"
import { Loader2, ShieldCheck } from "lucide-react"

export default function AdminLoginPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  const [loading, setLoading] = useState(false)
  const { login, user, loading: authLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!authLoading && user) {
      router.push("/admin/dashboard")
    }
  }, [user, authLoading, router])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      await login(formData.email, formData.password)
      toast.success("Login successful!")
      router.push("/admin/dashboard")
    } catch (error: any) {
      console.error("Login error:", error)
      if (error.code === "auth/user-not-found") {
        toast.error("No account found with this email")
      } else if (error.code === "auth/wrong-password") {
        toast.error("Incorrect password")
      } else if (error.code === "auth/invalid-credential") {
        toast.error("Invalid email or password")
      } else if (error.code === "auth/invalid-email") {
        toast.error("Invalid email address")
      } else {
        toast.error(error.message || "Failed to login")
      }
    } finally {
      setLoading(false)
    }
  }

  // Show loading while checking auth state
  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-100 to-white">
        <Loader2 className="h-12 w-12 animate-spin text-[#5900ff]" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-white text-gray-800 py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <div className="w-full max-w-md">
        <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <Card className="shadow-xl border-t-4 border-t-[#5900ff]">
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 bg-[#5900ff]/10 p-3 rounded-full w-fit">
                <ShieldCheck className="h-8 w-8 text-[#5900ff]" />
              </div>
              <CardTitle className="text-2xl font-bold font-['Orbitron'] text-[#5900ff]">Admin Login</CardTitle>
              <CardDescription>Sign in to access the admin dashboard</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    disabled={loading}
                    placeholder="admin@example.com"
                  />
                </div>
                <div>
                  <Label htmlFor="password">Password</Label>
                  <Input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    disabled={loading}
                    placeholder="••••••••"
                  />
                </div>
                <Button type="submit" className="w-full bg-[#5900ff] hover:bg-[#4700cc]" disabled={loading}>
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Signing In...
                    </>
                  ) : (
                    "Login"
                  )}
                </Button>
              </form>
              <p className="mt-6 text-center text-sm text-gray-500">
                Admin access only. Contact support if you need access.
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
