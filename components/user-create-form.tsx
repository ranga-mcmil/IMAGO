"use client"

import type React from "react"
import { useState } from "react"
import { useActionState } from "react"
import { useFormStatus } from "react-dom"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle2, AlertCircle, Eye, EyeOff } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { createUserAction } from "@/actions/users"
import { APIResponse } from "@/lib/http-service/apiClient"
import { CreateUserPayload, CreateUserResponse } from "@/lib/http-service/users/types"

// Form state type that matches our API response
type UserFormState = APIResponse<CreateUserResponse, CreateUserPayload> & {
  success?: boolean
  message?: string
}

// This component is used to get the pending state of the form submission
function SubmitButton() {
  const { pending } = useFormStatus()

  return (
    <Button size="sm" className="bg-maroon hover:bg-maroon/90 text-white" type="submit" disabled={pending}>
      {pending ? "Creating..." : "Create User"}
    </Button>
  )
}

// Wrapper function to handle the real API call and return compatible state
async function handleCreateUser(
  prevState: UserFormState,
  formData: FormData
): Promise<UserFormState> {
  try {
    const result = await createUserAction(formData)
    
    if (result.success) {
      return {
        ...result,
        success: true,
        message: "User created successfully",
      }
    } else {
      return {
        ...result,
        success: false,
        message: result.error || "Failed to create user",
        errors: result.fieldErrors ? {
          email: result.fieldErrors.email || [],
          password: result.fieldErrors.password || [],
          phoneNumber: result.fieldErrors.phoneNumber || [],
          firstName: result.fieldErrors.firstName || [],
          lastName: result.fieldErrors.lastName || [],
          role: result.fieldErrors.role || [],
        } : undefined,
      }
    }
  } catch (error) {
    console.error('Error creating user:', error)
    return {
      success: false,
      error: "An unexpected error occurred",
      message: "Failed to create user. Please try again.",
    }
  }
}

export function UserCreateForm() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    role: "",
    password: "",
    confirmPassword: "",
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [passwordMatch, setPasswordMatch] = useState(true)

  const initialState: UserFormState = { success: false }
  const [state, formAction] = useActionState(handleCreateUser, initialState)

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    
    // Check password match when typing in either password field
    if (field === 'password' || field === 'confirmPassword') {
      const password = field === 'password' ? value : formData.password
      const confirmPassword = field === 'confirmPassword' ? value : formData.confirmPassword
      setPasswordMatch(password === confirmPassword || confirmPassword === "")
    }
  }

  // Redirect to users page after successful creation
  if (state?.success) {
    setTimeout(() => {
      router.push("/users")
    }, 2000)
  }

  // Role options
  const roleOptions = [
    { value: "ROLE_USER", label: "User" },
    { value: "ROLE_SHOP_OWNER", label: "Shop Owner" },
    { value: "ROLE_MANAGER", label: "Manager" },
    { value: "ROLE_ADMIN", label: "Admin" },
  ]

  return (
    <Card className="border rounded-md overflow-hidden">
      {state?.success ? (
        <div className="p-6 flex flex-col items-center justify-center text-center">
          <div className="rounded-full bg-green-50 p-3 mb-4">
            <CheckCircle2 className="h-6 w-6 text-green-600" />
          </div>
          <h3 className="text-lg font-medium mb-2">User Created Successfully</h3>
          <p className="text-sm text-gray-500 mb-4">The new user account has been created and is now active.</p>
          <p className="text-xs text-gray-500">Redirecting to users page...</p>
        </div>
      ) : (
        <form action={formAction}>
          <CardContent className="p-6 space-y-6">
            {/* Name Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="firstName" className="text-base font-medium">
                  First Name
                </Label>
                <Input
                  id="firstName"
                  name="firstName"
                  placeholder="Enter first name"
                  className={`mt-2 w-full ${state?.fieldErrors?.firstName ? "border-red-500" : ""}`}
                  value={formData.firstName}
                  onChange={(e) => handleInputChange('firstName', e.target.value)}
                />
                {state?.fieldErrors?.firstName && <p className="text-sm text-red-500 mt-1">{state.fieldErrors.firstName[0]}</p>}
              </div>

              <div>
                <Label htmlFor="lastName" className="text-base font-medium">
                  Last Name
                </Label>
                <Input
                  id="lastName"
                  name="lastName"
                  placeholder="Enter last name"
                  className={`mt-2 w-full ${state?.fieldErrors?.lastName ? "border-red-500" : ""}`}
                  value={formData.lastName}
                  onChange={(e) => handleInputChange('lastName', e.target.value)}
                />
                {state?.fieldErrors?.lastName && <p className="text-sm text-red-500 mt-1">{state.fieldErrors.lastName[0]}</p>}
              </div>
            </div>

            {/* Email */}
            <div>
              <Label htmlFor="email" className="text-base font-medium">
                Email <span className="text-red-500">*</span>
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="Enter email address"
                className={`mt-2 w-full ${state?.fieldErrors?.email ? "border-red-500" : ""}`}
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                required
              />
              {state?.fieldErrors?.email && <p className="text-sm text-red-500 mt-1">{state.fieldErrors.email[0]}</p>}
            </div>

            {/* Phone Number */}
            <div>
              <Label htmlFor="phoneNumber" className="text-base font-medium">
                Phone Number <span className="text-red-500">*</span>
              </Label>
              <Input
                id="phoneNumber"
                name="phoneNumber"
                type="tel"
                placeholder="Enter phone number (e.g., +1234567890)"
                className={`mt-2 w-full ${state?.fieldErrors?.phoneNumber ? "border-red-500" : ""}`}
                value={formData.phoneNumber}
                onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
                required
              />
              {state?.fieldErrors?.phoneNumber && <p className="text-sm text-red-500 mt-1">{state.fieldErrors.phoneNumber[0]}</p>}
            </div>

            {/* Role */}
            <div>
              <Label htmlFor="role" className="text-base font-medium">
                Role <span className="text-red-500">*</span>
              </Label>
              <Select
                name="role"
                value={formData.role}
                onValueChange={(value) => handleInputChange('role', value)}
                required
              >
                <SelectTrigger className={`mt-2 w-full ${state?.fieldErrors?.role ? "border-red-500" : ""}`}>
                  <SelectValue placeholder="Select user role" />
                </SelectTrigger>
                <SelectContent>
                  {roleOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {state?.fieldErrors?.role && <p className="text-sm text-red-500 mt-1">{state.fieldErrors.role[0]}</p>}
            </div>

            {/* Password */}
            <div>
              <Label htmlFor="password" className="text-base font-medium">
                Password <span className="text-red-500">*</span>
              </Label>
              <div className="relative mt-2">
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter password"
                  className={`w-full pr-10 ${state?.fieldErrors?.password ? "border-red-500" : ""}`}
                  value={formData.password}
                  onChange={(e) => handleInputChange('password', e.target.value)}
                  required
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 flex items-center pr-3"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4 text-gray-400" />
                  ) : (
                    <Eye className="h-4 w-4 text-gray-400" />
                  )}
                </button>
              </div>
              {state?.fieldErrors?.password && <p className="text-sm text-red-500 mt-1">{state.fieldErrors.password[0]}</p>}
              <p className="text-xs text-gray-500 mt-1">
                Password must be at least 8 characters with uppercase, lowercase, number, and special character.
              </p>
            </div>

            {/* Confirm Password */}
            <div>
              <Label htmlFor="confirmPassword" className="text-base font-medium">
                Confirm Password <span className="text-red-500">*</span>
              </Label>
              <div className="relative mt-2">
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm password"
                  className={`w-full pr-10 ${!passwordMatch ? "border-red-500" : ""}`}
                  value={formData.confirmPassword}
                  onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                  required
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 flex items-center pr-3"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-4 w-4 text-gray-400" />
                  ) : (
                    <Eye className="h-4 w-4 text-gray-400" />
                  )}
                </button>
              </div>
              {!passwordMatch && <p className="text-sm text-red-500 mt-1">Passwords do not match</p>}
            </div>

            {state?.message && !state.success && (
              <div className="flex items-center gap-2 p-3 bg-red-50 text-red-700 rounded-md">
                <AlertCircle className="h-4 w-4" />
                <p className="text-sm">{state.message}</p>
              </div>
            )}
          </CardContent>

          <CardFooter className="border-t p-6 flex justify-end gap-2">
            <Link href="/users">
              <Button variant="outline" size="sm" type="button">
                Cancel
              </Button>
            </Link>
            <SubmitButton />
          </CardFooter>
        </form>
      )}
    </Card>
  )
}