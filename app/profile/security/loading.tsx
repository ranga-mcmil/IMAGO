import { MainLayout } from "@/components/main-layout"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Button } from "@/components/ui/button"

export default function ProfileSecurityLoading() {
  return (
    <MainLayout>
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-semibold text-maroon">Profile Settings</h1>
          <Button size="sm" className="bg-maroon hover:bg-maroon/90 text-white" disabled>
            Save Changes
          </Button>
        </div>

        <Tabs defaultValue="security">
          <TabsList className="mb-6">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
          </TabsList>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Password Settings Card */}
            <div className="md:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Change Password</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="text-sm font-medium">Current Password</div>
                    <Skeleton className="h-10 w-full" />
                  </div>

                  <div className="space-y-2">
                    <div className="text-sm font-medium">New Password</div>
                    <Skeleton className="h-10 w-full" />
                  </div>

                  <div className="space-y-2">
                    <div className="text-sm font-medium">Confirm New Password</div>
                    <Skeleton className="h-10 w-full" />
                  </div>

                  <Skeleton className="h-10 w-32" />
                </CardContent>
              </Card>

              {/* Two-Factor Authentication Card */}
              <Card>
                <CardHeader>
                  <CardTitle>Two-Factor Authentication</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Skeleton className="h-5 w-48" />
                      <Skeleton className="h-4 w-64" />
                    </div>
                    <Skeleton className="h-6 w-12 rounded-full" />
                  </div>

                  <Skeleton className="h-10 w-40" />
                </CardContent>
              </Card>
            </div>

            {/* Security Settings Card */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Security Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="text-sm font-medium">Session Timeout</div>
                    <Skeleton className="h-10 w-full" />
                  </div>

                  <div className="space-y-2">
                    <div className="text-sm font-medium">Login Notifications</div>
                    <div className="flex items-center justify-between">
                      <Skeleton className="h-5 w-16" />
                      <Skeleton className="h-6 w-12 rounded-full" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="text-sm font-medium">Require Password Reset</div>
                    <Skeleton className="h-10 w-full" />
                  </div>
                </CardContent>
              </Card>

              {/* Recent Activity Card */}
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {Array.from({ length: 3 }).map((_, index) => (
                    <div key={index} className="border-b pb-3 last:border-0 last:pb-0">
                      <div className="flex justify-between items-start">
                        <div className="space-y-1">
                          <Skeleton className="h-4 w-32" />
                          <Skeleton className="h-3 w-24" />
                        </div>
                        <Skeleton className="h-3 w-16" />
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </div>
        </Tabs>
      </div>
    </MainLayout>
  )
}
