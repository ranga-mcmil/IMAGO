import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Button } from "@/components/ui/button"

export function ShopCategoryCreateFormSkeleton() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Category Details</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="text-sm font-medium">Name</div>
          <Skeleton className="h-10 w-full" />
        </div>

        <div className="space-y-2">
          <div className="text-sm font-medium">Description</div>
          <Skeleton className="h-24 w-full" />
        </div>

        <div className="space-y-2">
          <div className="text-sm font-medium">Image</div>
          <Skeleton className="h-[150px] w-full rounded-md" />
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
  )
}
