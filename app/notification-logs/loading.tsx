import { MainLayout } from "@/components/main-layout"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Skeleton } from "@/components/ui/skeleton"

export default function NotificationLogsLoading() {
  return (
    <MainLayout>
      <div className="p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-semibold text-maroon">Notification Logs</h1>
            <p className="text-xs text-gray-500 mt-1">Monitor notification delivery status and history</p>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex gap-2">
            <Skeleton className="w-12 h-9" />
            <Skeleton className="w-16 h-9" />
            <Skeleton className="w-20 h-9" />
            <Skeleton className="w-16 h-9" />
            <Skeleton className="w-20 h-9" />
          </div>
          <Skeleton className="w-[250px] h-9" />
        </div>

        <div className="bg-white border rounded-md">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead className="text-xs font-medium">Recipient</TableHead>
                <TableHead className="text-xs font-medium">Type</TableHead>
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
                    <Skeleton className="h-5 w-40" />
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
                    <Skeleton className="h-5 w-20" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-5 w-32" />
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