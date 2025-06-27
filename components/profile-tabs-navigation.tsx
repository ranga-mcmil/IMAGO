"use client"

import { useRouter, usePathname } from "next/navigation"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface ProfileTabsNavigationProps {
  activeTab: "general" | "security"
}

export function ProfileTabsNavigation({ activeTab }: ProfileTabsNavigationProps) {
  const router = useRouter()

  // Handle tab change
  const handleTabChange = (value: string) => {
    // Update the URL based on the selected tab
    if (value === "general") {
      router.push("/profile")
    } else {
      router.push(`/profile/${value}`)
    }
  }

  return (
    <Tabs value={activeTab} onValueChange={handleTabChange}>
      <TabsList className="mb-6">
        <TabsTrigger value="general">General</TabsTrigger>
        <TabsTrigger value="security">Security</TabsTrigger>
      </TabsList>
    </Tabs>
  )
}