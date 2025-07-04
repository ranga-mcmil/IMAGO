import { Suspense } from "react"
import { MainLayout } from "@/components/main-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ShopCategoriesTableSkeleton } from "@/components/shop-categories-table-skeleton"
import Link from "next/link"
import { ShopCategoriesContainer } from "./shop-categories-container"

interface PageProps {
  searchParams: { [key: string]: string | string[] | undefined }
}

export default function ShopCategoriesPage({ searchParams }: PageProps) {
  const page = typeof searchParams.page === "string" ? Number.parseInt(searchParams.page) || 1 : 1
  const perPage = 10

  return (
    <MainLayout>
      <div className="p-4 lg:p-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-xl font-semibold text-maroon">Shop Categories</h1>
            <p className="text-xs text-gray-500 mt-1">Organize your shops by category</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-2">
            <div>
              <Link href="/shops/categories/create">
                <Button size="sm" className="bg-maroon hover:bg-maroon/90 text-white w-full sm:w-auto">
                  Create
                </Button>
              </Link>
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <Input placeholder="Search categories" className="w-full sm:w-[250px] h-9" />
        </div>

        <div className="bg-white border rounded-md overflow-hidden">
          <Suspense fallback={<ShopCategoriesTableSkeleton />}>
            <ShopCategoriesContainer page={page} perPage={perPage} />
          </Suspense>
        </div>
      </div>
    </MainLayout>
  )
}
