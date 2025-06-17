import { MainLayout } from "@/components/main-layout"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Button } from "@/components/ui/button"

export default function AdvertCreateLoading() {
  return (
    <MainLayout>
      <div className="p-6">
        <div className="mb-4">
          <h1 className="text-xl font-semibold text-maroon">Create Advert</h1>
          <p className="text-xs text-gray-500 mt-1">Create a new advertising campaign</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Advert Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="text-sm font-medium">Product</div>
              <Skeleton className="h-10 w-full" />
            </div>

            <div className="space-y-2">
              <div className="text-sm font-medium">Duration (Days)</div>
              <Skeleton className="h-10 w-full" />
            </div>

            <div className="space-y-2">
              <div className="text-sm font-medium">Notes</div>
              <Skeleton className="h-24 w-full" />
            </div>
          </CardContent>
          <CardFooter className="flex justify-between border-t px-6 py-4">
            <Button variant="outline" disabled>
              Cancel
            </Button>
            <Button className="bg-maroon hover:bg-maroon/90 text-white" disabled>
              Create
            </Button>
          </CardFooter>
        </Card>
      </div>
    </MainLayout>
  )
}