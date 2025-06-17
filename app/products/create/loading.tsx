import { MainLayout } from "@/components/main-layout"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Button } from "@/components/ui/button"

export default function ProductCreateLoading() {
  return (
    <MainLayout>
      <div className="p-6">
        <div className="mb-4">
          <h1 className="text-xl font-semibold text-maroon">Create Product</h1>
          <p className="text-xs text-gray-500 mt-1">Add a new product to your inventory</p>
        </div>

        <Tabs defaultValue="general">
          <TabsList className="mb-4">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="variants">Variants</TabsTrigger>
            <TabsTrigger value="attributes">Attributes</TabsTrigger>
            <TabsTrigger value="media">Media</TabsTrigger>
          </TabsList>

          <TabsContent value="general">
            <Card>
              <CardHeader>
                <CardTitle>General Information</CardTitle>
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

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="text-sm font-medium">Price</div>
                    <Skeleton className="h-10 w-full" />
                  </div>
                  <div className="space-y-2">
                    <div className="text-sm font-medium">Inventory</div>
                    <Skeleton className="h-10 w-full" />
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between border-t px-6 py-4">
                <Button variant="outline" disabled>
                  Cancel
                </Button>
                <Button className="bg-maroon hover:bg-maroon/90 text-white" disabled>
                  Save & Continue
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  )
}
