import { MainLayout } from "@/components/main-layout"
import { Button } from "@/components/ui/button"
import { BookmarkPlus } from "lucide-react"

export default function ReservationsPage() {
  return (
    <MainLayout>
      <div className="p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-semibold text-maroon">Reservations</h1>
          <Button size="sm" className="bg-maroon hover:bg-maroon/90 text-white">
            Create
          </Button>
        </div>

        <div className="flex flex-col items-center justify-center py-12 bg-white border rounded-md">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gray-100 mb-3">
            <BookmarkPlus className="h-6 w-6 text-gray-400" />
          </div>
          <div className="text-center">
            <h3 className="text-sm font-medium">No reservations yet</h3>
            <p className="text-xs text-gray-500 mt-1">Create your first reservation</p>
          </div>
        </div>
      </div>
    </MainLayout>
  )
}
