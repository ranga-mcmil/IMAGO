import { MainLayout } from "@/components/main-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { PlusCircle } from "lucide-react"
import Link from "next/link"

export default function CollectionsPage() {
  return (
    <MainLayout>
      <div className="p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-semibold text-maroon">Collections</h1>
            <p className="text-xs text-gray-500 mt-1">Organize products into collections</p>
          </div>
          <div>
            <Link href="/products/collections/create">
              <Button size="sm" className="bg-maroon hover:bg-maroon/90 text-white">
                Create
              </Button>
            </Link>
          </div>
        </div>

        <div className="flex justify-end">
          <Input placeholder="Search collections" className="w-[250px] h-9" />
        </div>

        <div className="flex flex-col items-center justify-center py-12 bg-white border rounded-md">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gray-100 mb-3">
            <PlusCircle className="h-6 w-6 text-gray-400" />
          </div>
          <div className="text-center">
            <h3 className="text-sm font-medium">No collections yet</h3>
            <p className="text-xs text-gray-500 mt-1">Create your first collection</p>
          </div>
        </div>
      </div>
    </MainLayout>
  )
}
