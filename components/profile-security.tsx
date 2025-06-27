import { Shield, AlertTriangle } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { ProfileSecurityForm } from "@/components/profile-security-form"
import { changePasswordAction } from "@/actions/users"

export function ProfileSecurity() {
  return (
    <div className="space-y-6">
      {/* Password Settings Card */}
      <Card>
        <CardHeader>
          <CardTitle>Change Password</CardTitle>
        </CardHeader>
        <CardContent>
          <ProfileSecurityForm changePasswordAction={changePasswordAction} />
        </CardContent>
      </Card>

      {/* Two-Factor Authentication Card */}
      <Card>
        <CardHeader>
          <CardTitle>Two-Factor Authentication</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-base">Two-Factor Authentication</Label>
              <p className="text-sm text-muted-foreground">Add an extra layer of security to your account</p>
            </div>
            <div className="text-sm text-muted-foreground">Coming soon</div>
          </div>

          <div className="rounded-md bg-amber-50 border border-amber-200 p-4">
            <div className="flex">
              <AlertTriangle className="h-5 w-5 text-amber-600 mr-2 mt-0.5" />
              <div className="space-y-1">
                <p className="text-sm font-medium text-amber-800">Two-factor authentication is disabled</p>
                <p className="text-xs text-amber-700">
                  Enable 2FA to add an extra layer of security to your account.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}