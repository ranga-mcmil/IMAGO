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
import { CheckCircle2, AlertCircle } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { updateUserAction } from "@/actions/users"
import { APIResponse } from "@/lib/http-service/apiClient"
import { UpdateUserPayload, UpdateUserResponse, User } from "@/lib/http-service/users/types"

// Form state type that matches our API response
type UserEditFormState = APIResponse<UpdateUserResponse, UpdateUserPayload> & {
  success?: boolean
  message?: string
}

interface UserEditFormProps {
  user: User
}

// This component is used to get the pending state of the form submission
function SubmitButton() {
  const { pending } = useFormStatus()

  return (
    <Button size="sm" className="bg-maroon hover:bg-maroon/90 text-white" type="submit" disabled={pending}>
      {pending ? "Updating..." : "Update User"}
    </Button>
  )
}

// Wrapper function to handle the real API call and return compatible state
async function handleUpdateUser(
  email: string,
  prevState: UserEditFormState,
  formData: FormData
): Promise<UserEditFormState> {
  try {
    const result = await updateUserAction(email, formData)
    
    if (result.success) {
      return {
        ...result,
        success: true,
        message: "User updated successfully",
      }
    } else {
      return {
        ...result,
        success: false,
        message: result.error || "Failed to update user",
        errors: result.fieldErrors ? {
          email: result.fieldErrors.email || [],
          phoneNumber: result.fieldErrors.phoneNumber || [],
          firstName: result.fieldErrors.firstName || [],
          lastName: result.fieldErrors.lastName || [],
          role: result.fieldErrors.role || [],
        } : undefined,
      }
    }
  } catch (error) {
    console.error('Error updating user:', error)
    return {
      success: false,
      error: "An unexpected error occurred",
      message: "Failed to update user. Please try again.",
    }
  }
}

export function UserEditForm({ user }: UserEditFormProps) {
  const router = useRouter()
  const [formData, setFormData] = useState({
    firstName: user.firstName || "",
    lastName: user.lastName || "",
    email: user.email,
    phoneNumber: user.phoneNumber || "",
    role: user.role,
  })

  const initialState: UserEditFormState = { success: false }
  const [state, formAction] = useActionState(
    handleUpdateUser.bind(null, user.email),
    initialState
  )

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  // Redirect to user detail page after successful update
  if (state?.success) {
    setTimeout(() => {
      router.push(`/users/${encodeURIComponent(user.email)}`)
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
          <h3 className="text-lg font-medium mb-2">User Updated Successfully</h3>
          <p className="text-sm text-gray-500 mb-4">The user information has been updated successfully.</p>
          <p className="text-xs text-gray-500">Redirecting to user details...</p>
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

            {/* User ID Display */}
            <div>
              <Label className="text-base font-medium text-gray-700">
                User ID
              </Label>
              <div className="mt-2 px-3 py-2 bg-gray-50 border rounded-md text-sm text-gray-600">
                {user.id}
              </div>
              <p className="text-xs text-gray-500 mt-1">User ID cannot be changed</p>
            </div>

            {state?.message && !state.success && (
              <div className="flex items-center gap-2 p-3 bg-red-50 text-red-700 rounded-md">
                <AlertCircle className="h-4 w-4" />
                <p className="text-sm">{state.message}</p>
              </div>
            )}
          </CardContent>

          <CardFooter className="border-t p-6 flex justify-end gap-2">
            <Link href={`/users/${encodeURIComponent(user.email)}`}>
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