import { MainLayout } from "@/components/main-layout"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Button } from "@/components/ui/button"

export default function UserCreateLoading() {
  return (
    <MainLayout>
      <div className="p-6">
        <div className="mb-4">
          <h1 className="text-xl font-semibold text-maroon">Create User</h1>
          <p className="text-xs text-gray-500 mt-1">Add a new user to the system</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>User Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="text-sm font-medium">First Name</div>
                <Skeleton className="h-10 w-full" />
              </div>
              <div className="space-y-2">
                <div className="text-sm font-medium">Last Name</div>
                <Skeleton className="h-10 w-full" />
              </div>
            </div>

            <div className="space-y-2">
              <div className="text-sm font-medium">Email</div>
              <Skeleton className="h-10 w-full" />
            </div>

            <div className="space-y-2">
              <div className="text-sm font-medium">Phone Number</div>
              <Skeleton className="h-10 w-full" />
            </div>

            <div className="space-y-2">
              <div className="text-sm font-medium">Role</div>
              <Skeleton className="h-10 w-full" />
            </div>

            <div className="space-y-2">
              <div className="text-sm font-medium">Password</div>
              <Skeleton className="h-10 w-full" />
            </div>

            <div className="space-y-2">
              <div className="text-sm font-medium">Confirm Password</div>
              <Skeleton className="h-10 w-full" />
            </div>
          </CardContent>
          <CardFooter className="flex justify-between border-t px-6 py-4">
            <Button variant="outline" disabled>
              Cancel
            </Button>
            <Button className="bg-maroon hover:bg-maroon/90 text-white" disabled>
              Create User
            </Button>
          </CardFooter>
        </Card>
      </div>
    </MainLayout>
  )
}