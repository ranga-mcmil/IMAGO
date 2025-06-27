// app/profile/security/page.tsx
import { ProfileSettings } from "@/components/profile-settings"
import { MainLayout } from "@/components/main-layout"

export default function ProfileSecurityPage() {
  return (
    <MainLayout>
      <div className="p-6">
        <ProfileSettings activeTab="security" />
      </div>
    </MainLayout>
  )
}