import { MainLayout } from "@/components/main-layout"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Skeleton } from "@/components/ui/skeleton"

export default function ProductCollectionsLoading() {
  return (
    <MainLayout>
      <div className="p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-semibold text-maroon">Collections</h1>
            <p className="text-xs text-gray-500 mt-1">Organize products into collections</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" disabled>
              Edit ranking
            </Button>
            <div>
              <Button size="sm" className="bg-maroon hover:bg-maroon/90 text-white" disabled>
                Create
              </Button>
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <Skeleton className="w-[250px] h-9" />
        </div>

        <div className="bg-white border rounded-md">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead className="text-xs font-medium">Name</TableHead>
                <TableHead className="text-xs font-medium">Description</TableHead>
                <TableHead className="text-xs font-medium">Products</TableHead>
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {Array.from({ length: 4 }).map((_, index) => (
                <TableRow key={index} className="hover:bg-gray-50">
                  <TableCell>
                    <Skeleton className="h-5 w-32" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-5 w-48" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-5 w-8" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-8 w-8 rounded-md" />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <div className="flex items-center justify-between border-t px-4 py-2">
            <Skeleton className="h-4 w-32" />
            <div className="flex items-center gap-2">
              <Skeleton className="h-4 w-24" />
              <Button variant="outline" size="sm" disabled className="h-7 px-2 text-xs">
                Prev
              </Button>
              <Button variant="outline" size="sm" disabled className="h-7 px-2 text-xs">
                Next
              </Button>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  )
}
