import { Suspense } from "react"
import { MainLayout } from "@/components/main-layout"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { NotificationLogsTableSkeleton } from "@/components/notification-logs-table-skeleton"
import { NotificationLogsContainer } from "./notification-logs-container"
import Link from "next/link"

interface NotificationLogsPageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export default async function NotificationLogsPage({ searchParams }: NotificationLogsPageProps) {
  const params = await searchParams
  const page = typeof params.page === "string" ? Number.parseInt(params.page) : 1
  const status = typeof params.status === "string" ? params.status : ""
  const perPage = 20 // Default to 20 as per API default

  return (
    <MainLayout>
      <div className="p-4 lg:p-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-xl font-semibold text-maroon">Notification Logs</h1>
            <p className="text-xs text-gray-500 mt-1">Monitor notification delivery status and history</p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex flex-wrap gap-2">
            <Link href="/notification-logs">
              <Button 
                variant={status === "" ? "default" : "outline"} 
                size="sm"
                className={status === "" ? "bg-maroon hover:bg-maroon/90 text-white" : ""}
              >
                All
              </Button>
            </Link>
            <Link href="/notification-logs?status=SENT">
              <Button 
                variant={status === "SENT" ? "default" : "outline"} 
                size="sm"
                className={status === "SENT" ? "bg-maroon hover:bg-maroon/90 text-white" : ""}
              >
                Sent
              </Button>
            </Link>
            <Link href="/notification-logs?status=PENDING">
              <Button 
                variant={status === "PENDING" ? "default" : "outline"} 
                size="sm" 
                className={status === "PENDING" ? "bg-maroon hover:bg-maroon/90 text-white" : ""}
              >
                Pending
              </Button>
            </Link>
            <Link href="/notification-logs?status=FAILED">
              <Button 
                variant={status === "FAILED" ? "default" : "outline"} 
                size="sm"
                className={status === "FAILED" ? "bg-maroon hover:bg-maroon/90 text-white" : ""}
              >
                Failed
              </Button>
            </Link>
            <Link href="/notification-logs?status=RETRYING">
              <Button 
                variant={status === "RETRYING" ? "default" : "outline"} 
                size="sm"
                className={status === "RETRYING" ? "bg-maroon hover:bg-maroon/90 text-white" : ""}
              >
                Retrying
              </Button>
            </Link>
          </div>
          <Input placeholder="Search notification logs" className="w-full sm:w-[250px] h-9" />
        </div>

        <div className="bg-white border rounded-md overflow-hidden">
          <Suspense fallback={<NotificationLogsTableSkeleton />}>
            <NotificationLogsContainer page={page} perPage={perPage} status={status} />
          </Suspense>
        </div>
      </div>
    </MainLayout>
  )
}