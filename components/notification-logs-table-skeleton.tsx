import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Skeleton } from "@/components/ui/skeleton"
import { Button } from "@/components/ui/button"

export function NotificationLogsTableSkeleton() {
  return (
    <>
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent">
            <TableHead className="text-xs font-medium">Recipient</TableHead>
            <TableHead className="text-xs font-medium">Type</TableHead>
            <TableHead className="text-xs font-medium">Template</TableHead>
            <TableHead className="text-xs font-medium">Status</TableHead>
            <TableHead className="text-xs font-medium">Created</TableHead>
            <TableHead className="text-xs font-medium">Sent</TableHead>
            <TableHead className="text-xs font-medium">Error</TableHead>
            <TableHead className="w-[50px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {Array.from({ length: 5 }).map((_, index) => (
            <TableRow key={index} className="hover:bg-gray-50">
              <TableCell>
                <div className="flex items-center gap-3">
                  <Skeleton className="h-8 w-8 rounded" />
                  <Skeleton className="h-5 w-40" />
                </div>
              </TableCell>
              <TableCell>
                <Skeleton className="h-5 w-24" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-5 w-20" />
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Skeleton className="h-4 w-4 rounded-full" />
                  <Skeleton className="h-5 w-16" />
                </div>
              </TableCell>
              <TableCell>
                <Skeleton className="h-5 w-32" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-5 w-32" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-5 w-24" />
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
    </>
  )
}