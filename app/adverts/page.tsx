import { Suspense } from "react"
import { MainLayout } from "@/components/main-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { AdvertsTableSkeleton } from "@/components/adverts-table-skeleton"
import { AdvertsContainer } from "./adverts-container"
import Link from "next/link"

interface AdvertsPageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export default async function AdvertsPage({ searchParams }: AdvertsPageProps) {
  const params = await searchParams
  const page = typeof params.page === "string" ? Number.parseInt(params.page) : 1
  // Default to ACTIVE instead of PENDING when no status is provided
  const status = typeof params.status === "string" ? params.status : "ACTIVE"
  const perPage = 10

  return (
    <MainLayout>
      <div className="p-4 lg:p-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-xl font-semibold text-maroon">Adverts</h1>
            <p className="text-xs text-gray-500 mt-1">Manage your advertising campaigns</p>
          </div>
          <div>
            <Link href="/adverts/create">
              <Button size="sm" className="bg-maroon hover:bg-maroon/90 text-white w-full sm:w-auto">
                Create
              </Button>
            </Link>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex flex-wrap gap-2">
            <Link href="/adverts?status=ACTIVE">
              <Button 
                variant={status === "ACTIVE" ? "default" : "outline"} 
                size="sm"
                className={status === "ACTIVE" ? "bg-maroon hover:bg-maroon/90 text-white" : ""}
              >
                Active
              </Button>
            </Link>
            <Link href="/adverts?status=PENDING">
              <Button 
                variant={status === "PENDING" ? "default" : "outline"} 
                size="sm" 
                className={status === "PENDING" ? "bg-maroon hover:bg-maroon/90 text-white" : ""}
              >
                Pending
              </Button>
            </Link>
            <Link href="/adverts?status=APPROVED">
              <Button 
                variant={status === "APPROVED" ? "default" : "outline"} 
                size="sm"
                className={status === "APPROVED" ? "bg-maroon hover:bg-maroon/90 text-white" : ""}
              >
                Approved
              </Button>
            </Link>
            <Link href="/adverts?status=REJECTED">
              <Button 
                variant={status === "REJECTED" ? "default" : "outline"} 
                size="sm"
                className={status === "REJECTED" ? "bg-maroon hover:bg-maroon/90 text-white" : ""}
              >
                Rejected
              </Button>
            </Link>
            <Link href="/adverts?status=EXPIRED">
              <Button 
                variant={status === "EXPIRED" ? "default" : "outline"} 
                size="sm"
                className={status === "EXPIRED" ? "bg-maroon hover:bg-maroon/90 text-white" : ""}
              >
                Expired
              </Button>
            </Link>
            <Link href="/adverts?status=CANCELLED">
              <Button 
                variant={status === "CANCELLED" ? "default" : "outline"} 
                size="sm"
                className={status === "CANCELLED" ? "bg-maroon hover:bg-maroon/90 text-white" : ""}
              >
                Cancelled
              </Button>
            </Link>
            <Link href="/adverts?status=PAUSED">
              <Button 
                variant={status === "PAUSED" ? "default" : "outline"} 
                size="sm"
                className={status === "PAUSED" ? "bg-maroon hover:bg-maroon/90 text-white" : ""}
              >
                Paused
              </Button>
            </Link>
          </div>
          <Input placeholder="Search adverts" className="w-full sm:w-[250px] h-9" />
        </div>

        <div className="bg-white border rounded-md overflow-hidden">
          <Suspense fallback={<AdvertsTableSkeleton />}>
            <AdvertsContainer page={page} perPage={perPage} status={status} />
          </Suspense>
        </div>
      </div>
    </MainLayout>
  )
}