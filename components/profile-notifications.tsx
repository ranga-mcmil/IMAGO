import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ProfileNotificationsForm } from "@/components/profile-notifications-form"

export function ProfileNotifications() {
  return (
    <div className="w-full">
      {/* Email Notifications Card */}
      <Card>
        <CardHeader>
          <CardTitle>Email Notifications</CardTitle>
          <p className="text-sm text-muted-foreground">
            Choose which email notifications you'd like to receive
          </p>
        </CardHeader>
        <CardContent>
          <ProfileNotificationsForm />
        </CardContent>
      </Card>
    </div>
  )
}