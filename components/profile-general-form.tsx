"use client"

import { useState } from "react"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import { User, UpdateUserV2Payload } from "@/lib/http-service/users/types"
import { APIResponse } from "@/lib/http-service/apiClient"

interface ProfileGeneralFormProps {
  userData: User
  updateUserAction: (email: string, formData: FormData) => Promise<APIResponse<any, UpdateUserV2Payload>>
}

export function ProfileGeneralForm({ userData, updateUserAction }: ProfileGeneralFormProps) {
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)

  // Form state
  const [formData, setFormData] = useState({
    firstName: userData.firstName || "",
    lastName: userData.lastName || "",
    email: userData.email,
    phoneNumber: userData.phoneNumber,
    role: userData.role,
  })

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const formDataToSubmit = new FormData()
      formDataToSubmit.append('email', formData.email)
      formDataToSubmit.append('phoneNumber', formData.phoneNumber)
      formDataToSubmit.append('firstName', formData.firstName)
      formDataToSubmit.append('lastName', formData.lastName)
      formDataToSubmit.append('role', formData.role)

      const response = await updateUserAction(userData.email, formDataToSubmit)

      if (response.success) {
        toast({
          title: "Profile updated",
          description: "Your profile information has been updated successfully.",
          duration: 3000,
        })
      } else {
        toast({
          title: "Error updating profile",
          description: response.error || "Failed to update profile",
          variant: "destructive",
          duration: 3000,
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred while updating your profile",
        variant: "destructive",
        duration: 3000,
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="firstName">First Name</Label>
          <Input 
            id="firstName" 
            name="firstName" 
            value={formData.firstName} 
            onChange={handleInputChange}
            placeholder="Enter first name"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="lastName">Last Name</Label>
          <Input 
            id="lastName" 
            name="lastName" 
            value={formData.lastName} 
            onChange={handleInputChange}
            placeholder="Enter last name"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input 
          id="email" 
          name="email" 
          type="email" 
          value={formData.email} 
          onChange={handleInputChange}
          disabled
          className="bg-gray-50"
        />
        <p className="text-xs text-muted-foreground">
          Email cannot be changed for security reasons
        </p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="phoneNumber">Phone Number</Label>
        <Input 
          id="phoneNumber" 
          name="phoneNumber" 
          value={formData.phoneNumber} 
          onChange={handleInputChange}
          placeholder="Enter phone number"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="role">Role</Label>
        <Input 
          id="role" 
          name="role" 
          value={formData.role} 
          onChange={handleInputChange}
          disabled
          className="bg-gray-50"
        />
        <p className="text-xs text-muted-foreground">
          Role is managed by system administrators
        </p>
      </div>

      <Button 
        type="submit" 
        className="w-full bg-maroon hover:bg-maroon/90 text-white" 
        disabled={isLoading}
      >
        {isLoading ? "Saving Changes..." : "Save Changes"}
      </Button>
    </form>
  )
}