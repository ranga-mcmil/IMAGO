import { Suspense } from "react"
import { MainLayout } from "@/components/main-layout"
import { Input } from "@/components/ui/input"
import { ActiveAdvertsCardsSkeleton } from "@/components/active-adverts-cards-skeleton"
import { ActiveAdvertsContainer } from "./active-adverts-container"

export default function ActiveAdvertsPage() {
  return (
    <MainLayout>
      <div className="p-4 lg:p-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-xl font-semibold text-maroon">Active Adverts</h1>
            <p className="text-xs text-gray-500 mt-1">Currently running advertising campaigns</p>
          </div>
        </div>

        <div className="flex justify-end">
          <Input placeholder="Search active adverts" className="w-full sm:w-[250px] h-9" />
        </div>

        <Suspense fallback={<ActiveAdvertsCardsSkeleton />}>
          <ActiveAdvertsContainer />
        </Suspense>
      </div>
    </MainLayout>
  )
}