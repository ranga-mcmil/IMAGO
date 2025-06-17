import { Suspense } from "react"
import { MainLayout } from "@/components/main-layout"
import { Input } from "@/components/ui/input"
import { PendingAdvertsTableSkeleton } from "@/components/pending-adverts-table-skeleton"
import { PendingAdvertsContainer } from "./pending-adverts-container"

export default function PendingAdvertsPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const page = typeof searchParams.page === "string" ? Number.parseInt(searchParams.page) : 1
  const perPage = 10

  return (
    <MainLayout>
      <div className="p-4 lg:p-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-xl font-semibold text-maroon">Pending Adverts</h1>
            <p className="text-xs text-gray-500 mt-1">Review and approve advertising requests</p>
          </div>
        </div>

        <div className="flex justify-end">
          <Input placeholder="Search pending adverts" className="w-full sm:w-[250px] h-9" />
        </div>

        <div className="bg-white border rounded-md overflow-hidden">
          <Suspense fallback={<PendingAdvertsTableSkeleton />}>
            <PendingAdvertsContainer page={page} perPage={perPage} />
          </Suspense>
        </div>
      </div>
    </MainLayout>
  )
}