"use client"

import { useState } from "react"
import { useRouter, usePathname } from "next/navigation"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ProfileGeneral } from "@/components/profile-general"
import { ProfileSecurity } from "@/components/profile-security"
import { ProfileNotifications } from "@/components/profile-notifications"

export function ProfileSettings() {
  const router = useRouter()
  const pathname = usePathname()

  // Determine active tab based on the current path
  const getActiveTab = () => {
    if (pathname.includes("/profile/security")) return "security"
    if (pathname.includes("/profile/notifications")) return "notifications"
    return "general"
  }

  const [activeTab, setActiveTab] = useState(getActiveTab())

  // Handle tab change
  const handleTabChange = (value: string) => {
    setActiveTab(value)

    // Update the URL based on the selected tab
    if (value === "general") {
      router.push("/profile")
    } else {
      router.push(`/profile/${value}`)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold text-maroon">Profile Settings</h1>
      </div>

      <Tabs value={activeTab} onValueChange={handleTabChange}>
        <TabsList className="mb-6">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
        </TabsList>

        <TabsContent value="general">
          <ProfileGeneral />
        </TabsContent>

        <TabsContent value="security">
          <ProfileSecurity />
        </TabsContent>

        <TabsContent value="notifications">
          <ProfileNotifications />
        </TabsContent>
      </Tabs>
    </div>
  )
}
