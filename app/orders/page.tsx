import { Suspense } from "react"
import { MainLayout } from "@/components/main-layout"
import { Input } from "@/components/ui/input"
import { OrdersTableSkeleton } from "@/components/orders-table-skeleton"
import { OrdersContainer } from "./orders-container"
import { AdminOrderActions } from "@/components/admin-order-actions"

interface PageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export default async function OrdersPage({ searchParams }: PageProps) {
  const resolvedSearchParams = await searchParams
  const page = typeof resolvedSearchParams.page === "string" ? Number.parseInt(resolvedSearchParams.page) || 1 : 1
  const perPage = 10

  return (
    <MainLayout>
      <div className="p-4 lg:p-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-xl font-semibold text-maroon">Orders</h1>
            <p className="text-xs text-gray-500 mt-1">View and manage your orders</p>
          </div>
          <AdminOrderActions />
        </div>

        <div className="flex justify-end">
          <Input placeholder="Search orders" className="w-full sm:w-[250px] h-9" />
        </div>

        <div className="bg-white border rounded-md overflow-hidden">
          <Suspense fallback={<OrdersTableSkeleton />}>
            <OrdersContainer page={page} perPage={perPage} />
          </Suspense>
        </div>
      </div>
    </MainLayout>
  )
}