// app/profile/page.tsx
import { ProfileSettings } from "@/components/profile-settings"
import { MainLayout } from "@/components/main-layout"

export default function ProfilePage() {
  return (
    <MainLayout>
      <div className="p-6">
        <ProfileSettings activeTab="general" />
      </div>
    </MainLayout>
  )
}