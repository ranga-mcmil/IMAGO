import { Camera } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { getCurrentUserAction, updateUserV2Action } from "@/actions/users"
import { ProfileGeneralForm } from "@/components/profile-general-form"
import { AlertCircle } from "lucide-react"

export async function ProfileGeneral() {
  // Load current user data on the server
  const userResponse = await getCurrentUserAction()
  
  if (!userResponse.success) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertCircle className="h-5 w-5 text-red-500" />
            Error Loading Profile
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            {userResponse.error || "Failed to load user profile"}
          </p>
        </CardContent>
      </Card>
    )
  }

  const userData = userResponse.data!

  // Get user initials for avatar fallback
  const getUserInitials = () => {
    const first = userData.firstName?.[0] || ""
    const last = userData.lastName?.[0] || ""
    return (first + last).toUpperCase() || userData.email[0].toUpperCase()
  }

  return (
    <div className="space-y-6">
      {/* Profile Information Card */}
      <Card>
        <CardHeader>
          <CardTitle>Profile Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-4 mb-6">
            <div className="relative">
              <Avatar className="h-16 w-16">
                <AvatarImage src="" alt="Profile" />
                <AvatarFallback className="bg-maroon text-white text-lg">
                  {getUserInitials()}
                </AvatarFallback>
              </Avatar>
              <div className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full bg-secondary border-2 border-background flex items-center justify-center">
                <Camera className="h-4 w-4" />
              </div>
            </div>
            <div>
              <p className="text-sm font-medium">Profile Photo</p>
              <p className="text-xs text-maroon cursor-pointer hover:underline">
                Change photo
              </p>
            </div>
          </div>

          <ProfileGeneralForm 
            userData={userData}
            updateUserAction={updateUserV2Action}
          />
        </CardContent>
      </Card>

      {/* Account Information Card */}
      <Card>
        <CardHeader>
          <CardTitle>Account Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <Label className="text-sm font-medium">User ID</Label>
              <p className="text-sm text-muted-foreground">{userData.id}</p>
            </div>
            <div className="space-y-1">
              <Label className="text-sm font-medium">Shop ID</Label>
              <p className="text-sm text-muted-foreground">{userData.shopId || "Not assigned"}</p>
            </div>
          </div>
          
          <div className="space-y-1">
            <Label className="text-sm font-medium">Account Status</Label>
            <p className="text-sm text-green-600 font-medium">Active</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}