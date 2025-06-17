import { Suspense } from "react"
import { MainLayout } from "@/components/main-layout"
import { DashboardStats } from "@/components/dashboard-stats"
import { RecentActivity } from "@/components/recent-activity"
import { ShopPerformance } from "@/components/shop-performance"
import { DashboardSkeleton } from "@/components/dashboard-skeleton"

export default function DashboardPage() {
  return (
    <MainLayout>
      <div className="p-4 lg:p-6 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-maroon">Dashboard</h1>
            <p className="text-gray-600">Welcome back! Here's what's happening with your business.</p>
          </div>
          <div className="flex gap-2">
            <select className="px-3 py-2 border border-gray-300 rounded-md text-sm">
              <option>Last 7 days</option>
              <option>Last 30 days</option>
              <option>Last 90 days</option>
              <option>Last year</option>
            </select>
          </div>
        </div>

        <Suspense fallback={<DashboardSkeleton />}>
          {/* Key Metrics */}
          <DashboardStats />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ShopPerformance />
            <RecentActivity />
          </div>
        </Suspense>
      </div>
    </MainLayout>
  )
}
