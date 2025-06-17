import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Skeleton } from "@/components/ui/skeleton"
import { Button } from "@/components/ui/button"

export function PendingAdvertsTableSkeleton() {
  return (
    <>
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent">
            <TableHead className="text-xs font-medium">Product</TableHead>
            <TableHead className="text-xs font-medium">Requester</TableHead>
            <TableHead className="text-xs font-medium">Duration</TableHead>
            <TableHead className="text-xs font-medium">Created</TableHead>
            <TableHead className="text-xs font-medium">Notes</TableHead>
            <TableHead className="w-[100px]">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {Array.from({ length: 4 }).map((_, index) => (
            <TableRow key={index} className="hover:bg-gray-50">
              <TableCell>
                <Skeleton className="h-5 w-32" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-5 w-24" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-5 w-16" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-5 w-20" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-5 w-40" />
              </TableCell>
              <TableCell>
                <div className="flex gap-1">
                  <Skeleton className="h-7 w-16" />
                  <Skeleton className="h-7 w-16" />
                </div>
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
    </>
  )
}