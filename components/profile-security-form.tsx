"use client"

import { useState } from "react"
import { Eye, EyeOff } from "lucide-react"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import { APIResponse } from "@/lib/http-service/apiClient"
import { ChangePasswordPayload } from "@/lib/http-service/users/types"

interface ProfileSecurityFormProps {
  changePasswordAction: (formData: FormData) => Promise<APIResponse<any, ChangePasswordPayload>>
}

export function ProfileSecurityForm({ changePasswordAction }: ProfileSecurityFormProps) {
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  // Form state
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })

  // Handle password input change
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setPasswordForm((prev) => ({ ...prev, [name]: value }))
  }

  // Validate password strength
  const validatePasswordStrength = (password: string) => {
    const minLength = password.length >= 8
    const hasUppercase = /[A-Z]/.test(password)
    const hasLowercase = /[a-z]/.test(password)
    const hasNumber = /\d/.test(password)
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password)

    return {
      isValid: minLength && hasUppercase && hasLowercase && hasNumber && hasSpecialChar,
      checks: {
        minLength,
        hasUppercase,
        hasLowercase,
        hasNumber,
        hasSpecialChar,
      }
    }
  }

  // Get password strength indicator
  const getPasswordStrength = () => {
    if (!passwordForm.newPassword) return null
    
    const validation = validatePasswordStrength(passwordForm.newPassword)
    const checkedCount = Object.values(validation.checks).filter(Boolean).length
    
    if (checkedCount < 2) return { label: "Weak", color: "text-red-500", width: "w-1/4" }
    if (checkedCount < 4) return { label: "Fair", color: "text-orange-500", width: "w-2/4" }
    if (checkedCount < 5) return { label: "Good", color: "text-yellow-500", width: "w-3/4" }
    return { label: "Strong", color: "text-green-500", width: "w-full" }
  }

  // Handle password form submission
  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Validate passwords match
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      toast({
        title: "Passwords don't match",
        description: "New password and confirm password must match.",
        variant: "destructive",
        duration: 3000,
      })
      return
    }

    // Validate password strength
    const passwordValidation = validatePasswordStrength(passwordForm.newPassword)
    if (!passwordValidation.isValid) {
      toast({
        title: "Password too weak",
        description: "Password must be at least 8 characters long and include uppercase, lowercase, numbers, and special characters.",
        variant: "destructive",
        duration: 5000,
      })
      return
    }

    setIsLoading(true)

    try {
      const formData = new FormData()
      formData.append('currentPassword', passwordForm.currentPassword)
      formData.append('newPassword', passwordForm.newPassword)

      const response = await changePasswordAction(formData)

      if (response.success) {
        // Reset form
        setPasswordForm({
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
        })

        toast({
          title: "Password updated",
          description: "Your password has been updated successfully.",
          duration: 3000,
        })
      } else {
        toast({
          title: "Error updating password",
          description: response.error || "Failed to update password",
          variant: "destructive",
          duration: 3000,
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred while updating your password",
        variant: "destructive",
        duration: 3000,
      })
    } finally {
      setIsLoading(false)
    }
  }

  const passwordStrength = getPasswordStrength()

  return (
    <form onSubmit={handlePasswordSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="currentPassword">Current Password</Label>
        <div className="relative">
          <Input
            id="currentPassword"
            name="currentPassword"
            type={showCurrentPassword ? "text" : "password"}
            value={passwordForm.currentPassword}
            onChange={handlePasswordChange}
            required
            placeholder="Enter your current password"
          />
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="absolute right-0 top-0 h-full px-3 py-2"
            onClick={() => setShowCurrentPassword(!showCurrentPassword)}
          >
            {showCurrentPassword ? (
              <EyeOff className="h-4 w-4 text-gray-500" />
            ) : (
              <Eye className="h-4 w-4 text-gray-500" />
            )}
            <span className="sr-only">{showCurrentPassword ? "Hide password" : "Show password"}</span>
          </Button>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="newPassword">New Password</Label>
        <div className="relative">
          <Input
            id="newPassword"
            name="newPassword"
            type={showNewPassword ? "text" : "password"}
            value={passwordForm.newPassword}
            onChange={handlePasswordChange}
            required
            placeholder="Enter your new password"
          />
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="absolute right-0 top-0 h-full px-3 py-2"
            onClick={() => setShowNewPassword(!showNewPassword)}
          >
            {showNewPassword ? (
              <EyeOff className="h-4 w-4 text-gray-500" />
            ) : (
              <Eye className="h-4 w-4 text-gray-500" />
            )}
            <span className="sr-only">{showNewPassword ? "Hide password" : "Show password"}</span>
          </Button>
        </div>
        
        {/* Password strength indicator */}
        {passwordForm.newPassword && passwordStrength && (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground">Password strength</span>
              <span className={`text-xs font-medium ${passwordStrength.color}`}>
                {passwordStrength.label}
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className={`h-2 rounded-full transition-all duration-300 ${
                  passwordStrength.label === 'Weak' ? 'bg-red-500' :
                  passwordStrength.label === 'Fair' ? 'bg-orange-500' :
                  passwordStrength.label === 'Good' ? 'bg-yellow-500' :
                  'bg-green-500'
                } ${passwordStrength.width}`}
              ></div>
            </div>
          </div>
        )}

        <div className="text-xs text-muted-foreground space-y-1">
          <p>Password must include:</p>
          <ul className="list-disc list-inside space-y-0.5 ml-2">
            <li>At least 8 characters</li>
            <li>Uppercase and lowercase letters</li>
            <li>Numbers and special characters</li>
          </ul>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="confirmPassword">Confirm New Password</Label>
        <div className="relative">
          <Input
            id="confirmPassword"
            name="confirmPassword"
            type={showConfirmPassword ? "text" : "password"}
            value={passwordForm.confirmPassword}
            onChange={handlePasswordChange}
            required
            placeholder="Confirm your new password"
          />
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="absolute right-0 top-0 h-full px-3 py-2"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          >
            {showConfirmPassword ? (
              <EyeOff className="h-4 w-4 text-gray-500" />
            ) : (
              <Eye className="h-4 w-4 text-gray-500" />
            )}
            <span className="sr-only">{showConfirmPassword ? "Hide password" : "Show password"}</span>
          </Button>
        </div>
        {passwordForm.confirmPassword && passwordForm.newPassword !== passwordForm.confirmPassword && (
          <p className="text-xs text-red-500">Passwords do not match</p>
        )}
      </div>

      <Button 
        type="submit" 
        className="bg-maroon hover:bg-maroon/90 text-white" 
        disabled={isLoading || !passwordForm.currentPassword || !passwordForm.newPassword || !passwordForm.confirmPassword}
      >
        {isLoading ? "Updating Password..." : "Update Password"}
      </Button>
    </form>
  )
}