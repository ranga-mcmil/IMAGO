import { MainLayout } from "@/components/main-layout"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Button } from "@/components/ui/button"

export default function ProfileLoading() {
  return (
    <MainLayout>
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-semibold text-maroon">Profile Settings</h1>
          <Button size="sm" className="bg-maroon hover:bg-maroon/90 text-white" disabled>
            Save Changes
          </Button>
        </div>

        <Tabs defaultValue="general">
          <TabsList className="mb-6">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
          </TabsList>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Profile Information Card */}
            <div className="md:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Profile Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-4 mb-6">
                    <Skeleton className="h-16 w-16 rounded-full" />
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-32" />
                      <Skeleton className="h-9 w-24" />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <div className="text-sm font-medium">First Name</div>
                      <Skeleton className="h-10 w-full" />
                    </div>
                    <div className="space-y-2">
                      <div className="text-sm font-medium">Last Name</div>
                      <Skeleton className="h-10 w-full" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="text-sm font-medium">Email</div>
                    <Skeleton className="h-10 w-full" />
                  </div>

                  <div className="space-y-2">
                    <div className="text-sm font-medium">Job Title</div>
                    <Skeleton className="h-10 w-full" />
                  </div>
                </CardContent>
              </Card>

              {/* Contact Information Card */}
              <Card>
                <CardHeader>
                  <CardTitle>Contact Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="text-sm font-medium">Phone Number</div>
                    <Skeleton className="h-10 w-full" />
                  </div>

                  <div className="space-y-2">
                    <div className="text-sm font-medium">Address</div>
                    <Skeleton className="h-10 w-full" />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <div className="text-sm font-medium">City</div>
                      <Skeleton className="h-10 w-full" />
                    </div>
                    <div className="space-y-2">
                      <div className="text-sm font-medium">Postal Code</div>
                      <Skeleton className="h-10 w-full" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="text-sm font-medium">Country</div>
                    <Skeleton className="h-10 w-full" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Account Settings Card */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Account Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="text-sm font-medium">Language</div>
                    <Skeleton className="h-10 w-full" />
                  </div>

                  <div className="space-y-2">
                    <div className="text-sm font-medium">Time Zone</div>
                    <Skeleton className="h-10 w-full" />
                  </div>

                  <div className="space-y-2">
                    <div className="text-sm font-medium">Date Format</div>
                    <Skeleton className="h-10 w-full" />
                  </div>
                </CardContent>
              </Card>

              {/* Theme Settings Card */}
              <Card>
                <CardHeader>
                  <CardTitle>Theme Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="text-sm font-medium">Theme</div>
                    <div className="flex items-center justify-between">
                      <Skeleton className="h-5 w-16" />
                      <Skeleton className="h-6 w-12 rounded-full" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="text-sm font-medium">Sidebar Collapsed</div>
                    <div className="flex items-center justify-between">
                      <Skeleton className="h-5 w-16" />
                      <Skeleton className="h-6 w-12 rounded-full" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </Tabs>
      </div>
    </MainLayout>
  )
}
