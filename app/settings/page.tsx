import { Suspense } from "react"
import { MainLayout } from "@/components/main-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { CompanyInfoSection } from "@/components/company-info-section"
import { Bell, FileText, Activity } from "lucide-react"
import Link from "next/link"

function CompanyInfoSkeleton() {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Company Information</CardTitle>
          <Skeleton className="h-9 w-16" />
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4 py-3 border-b">
          <div className="text-sm font-medium">Company Name</div>
          <Skeleton className="h-5 w-32" />
        </div>
        <div className="grid grid-cols-2 gap-4 py-3 border-b">
          <div className="text-sm font-medium">Email</div>
          <Skeleton className="h-5 w-48" />
        </div>
        <div className="grid grid-cols-2 gap-4 py-3">
          <div className="text-sm font-medium">Phone Number</div>
          <Skeleton className="h-5 w-40" />
        </div>
      </CardContent>
    </Card>
  )
}

export default function SettingsPage() {
  return (
    <MainLayout>
      <div className="p-6 space-y-6">
        <div>
          <h1 className="text-xl font-semibold text-maroon">Settings</h1>
          <p className="text-xs text-gray-500 mt-1">Manage your store settings and company information</p>
        </div>

        {/* Company Information Section */}
        <Suspense fallback={<CompanyInfoSkeleton />}>
          <CompanyInfoSection />
        </Suspense>

        {/* System Administration Section */}
        <Card>
          <CardHeader>
            <CardTitle>System Administration</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {/* Notification Logs */}
              <Link href="/notification-logs">
                <div className="p-4 border rounded-lg hover:bg-gray-50 transition-colors cursor-pointer group">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="flex h-10 w-10 items-center justify-center rounded bg-blue-100 group-hover:bg-blue-200 transition-colors">
                      <Bell className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-sm font-medium">Notification Logs</h3>
                      <p className="text-xs text-gray-500">Monitor delivery status</p>
                    </div>
                  </div>
                  <p className="text-xs text-gray-600">
                    View and manage notification delivery logs, troubleshoot failed notifications.
                  </p>
                </div>
              </Link>

              {/* System Logs - Placeholder for future */}
              <div className="p-4 border rounded-lg bg-gray-50 opacity-50">
                <div className="flex items-center gap-3 mb-2">
                  <div className="flex h-10 w-10 items-center justify-center rounded bg-gray-100">
                    <FileText className="h-5 w-5 text-gray-400" />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">System Logs</h3>
                    <p className="text-xs text-gray-400">Coming soon</p>
                  </div>
                </div>
                <p className="text-xs text-gray-500">
                  Application logs and system monitoring.
                </p>
              </div>

              {/* Performance Monitoring - Placeholder for future */}
              <div className="p-4 border rounded-lg bg-gray-50 opacity-50">
                <div className="flex items-center gap-3 mb-2">
                  <div className="flex h-10 w-10 items-center justify-center rounded bg-gray-100">
                    <Activity className="h-5 w-5 text-gray-400" />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Performance</h3>
                    <p className="text-xs text-gray-400">Coming soon</p>
                  </div>
                </div>
                <p className="text-xs text-gray-500">
                  System performance and health monitoring.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  )
}