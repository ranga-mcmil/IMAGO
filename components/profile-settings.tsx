import { Suspense } from "react"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth/next-auth-options"
import { ProfileGeneral } from "@/components/profile-general"
import { ProfileSecurity } from "@/components/profile-security"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertCircle } from "lucide-react"
import { ProfileTabsNavigation } from "./profile-tabs-navigation"

interface ProfileSettingsProps {
  activeTab?: "general" | "security"
}

export async function ProfileSettings({ activeTab = "general" }: ProfileSettingsProps) {
  const session = await getServerSession(authOptions)

  // Show error state if user is not authenticated
  if (!session) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-semibold text-maroon">Profile Settings</h1>
        </div>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-amber-500" />
              Authentication Required
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              You must be logged in to access your profile settings. Please sign in and try again.
            </p>
          </CardContent>
        </Card>
      </div>
    )
  }

  const renderTabContent = () => {
    switch (activeTab) {
      case "security":
        return (
          <Suspense fallback={<ProfileTabLoading />}>
            <ProfileSecurity />
          </Suspense>
        )
      default:
        return (
          <Suspense fallback={<ProfileTabLoading />}>
            <ProfileGeneral />
          </Suspense>
        )
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold text-maroon">Profile Settings</h1>
        <div className="text-sm text-muted-foreground">
          Welcome, {session.user?.email || "User"}
        </div>
      </div>

      <ProfileTabsNavigation activeTab={activeTab} />
      
      <div className="mt-6">
        {renderTabContent()}
      </div>
    </div>
  )
}

// Loading component for tab content
function ProfileTabLoading() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Loading...</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="animate-pulse space-y-4">
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            <div className="h-4 bg-gray-200 rounded w-5/6"></div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}