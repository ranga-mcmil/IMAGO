"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { CardContent, CardFooter } from "@/components/ui/card"
import { CheckCircle2 } from "lucide-react"

export function ForgotPasswordForm() {
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API request delay
    setTimeout(() => {
      setIsLoading(false)
      setIsSuccess(true)
    }, 1500)
  }

  if (isSuccess) {
    return (
      <div className="px-6 py-8">
        <div className="flex flex-col items-center justify-center text-center space-y-4">
          <div className="rounded-full bg-green-50 p-3">
            <CheckCircle2 className="h-6 w-6 text-green-600" />
          </div>
          <div className="space-y-2">
            <h3 className="text-lg font-medium">Check your email</h3>
            <p className="text-sm text-gray-500">
              We've sent a password reset link to <span className="font-medium text-gray-900">{email}</span>
            </p>
          </div>
          <p className="text-xs text-gray-500 mt-4">
            Didn't receive the email? Check your spam folder or{" "}
            <button type="button" className="text-maroon hover:underline" onClick={() => setIsSuccess(false)}>
              try again
            </button>
          </p>
        </div>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit}>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="name@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
      </CardContent>

      <CardFooter>
        <Button type="submit" className="w-full bg-maroon hover:bg-maroon/90 text-white" disabled={isLoading}>
          {isLoading ? "Sending reset link..." : "Send reset link"}
        </Button>
      </CardFooter>
    </form>
  )
}
