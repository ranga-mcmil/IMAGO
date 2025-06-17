import { ProfileSettings } from "@/components/profile-settings"
import { MainLayout } from "@/components/main-layout"

export default function ProfileNotificationsPage() {
  return (
    <MainLayout>
      <div className="p-6">
        <ProfileSettings />
      </div>
    </MainLayout>
  )
}
