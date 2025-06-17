"use client"

import type React from "react"
import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Eye, EyeOff } from "lucide-react"
import Link from "next/link"
import { useToast } from "@/hooks/use-toast"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { CardContent, CardFooter } from "@/components/ui/card"
import { signIn } from 'next-auth/react';
import { SignInPayload } from "@/lib/http-service/accounts/types"
import { useForm } from "react-hook-form"
import { zodResolver } from '@hookform/resolvers/zod';
import { SignInSchema } from "@/lib/http-service/accounts/schema"



export function SignInForm() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl');
  const defaultValues = {
    email: '',
    password: ''

  };

  const form = useForm<SignInPayload>({
    resolver: zodResolver(SignInSchema),
    defaultValues
  });

  const onSubmit = async (data: SignInPayload) => {
    setIsLoading(true);
    try {
      await handleSignIn(data);
    } catch {
      console.error("Error during sign in");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignIn = async (data: SignInPayload) => {
    const signInResponse = await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
      callbackUrl: callbackUrl ?? '/'
    });
  
    if (signInResponse?.ok) {
      toast({
        title: "Login successful",
        description: "Welcome to RoofStar Industries POS",
      })
      router.push(signInResponse?.url ?? '/');
    } else {
      toast({
        title: "Login failed",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      })
    }
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="name@example.com"
            {...form.register("email")}
            required
          />
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="password">Password</Label>
            <Link href="/forgot-password" className="text-xs text-maroon hover:underline">
              Forgot password?
            </Link>
          </div>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              {...form.register("password")}
              required
            />
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="absolute right-0 top-0 h-full px-3 py-2"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff className="h-4 w-4 text-gray-500" /> : <Eye className="h-4 w-4 text-gray-500" />}
              <span className="sr-only">{showPassword ? "Hide password" : "Show password"}</span>
            </Button>
          </div>
        </div>
      </CardContent>

      <CardFooter>
        <Button type="submit" className="w-full bg-maroon hover:bg-maroon/90 text-white" disabled={isLoading}>
          {isLoading ? "Signing in..." : "Sign in"}
        </Button>
      </CardFooter>
    </form>
  )
}
