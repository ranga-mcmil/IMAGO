"use client"

import { useState } from "react"
import Link from "next/link"
import { Bell, Clock, CheckCircle, XCircle, RefreshCw, AlertTriangle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { NotificationLog } from "@/lib/http-service/notification-logs/types"
import { ScrollArea } from "@/components/ui/scroll-area"

// Function to truncate text
const truncateText = (text: string, maxLength = 40) => {
  if (text.length <= maxLength) return text
  return text.substring(0, maxLength) + "..."
}

interface ClientNotificationLogsTableProps {
  logs: NotificationLog[]
  page: number
  perPage: number
  totalLogs: number
  totalPages: number
  isLast: boolean
  status: string
}

export function ClientNotificationLogsTable({
  logs,
  page = 1,
  perPage = 20,
  totalLogs,
  totalPages,
  isLast,
  status,
}: ClientNotificationLogsTableProps) {
  const [selectedLog, setSelectedLog] = useState<NotificationLog | null>(null)

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'SENT':
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case 'PENDING':
        return <Clock className="h-4 w-4 text-yellow-500" />
      case 'FAILED':
        return <XCircle className="h-4 w-4 text-red-500" />
      case 'RETRYING':
        return <RefreshCw className="h-4 w-4 text-blue-500" />
      default:
        return <AlertTriangle className="h-4 w-4 text-gray-500" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'SENT':
        return 'bg-green-100 text-green-800'
      case 'PENDING':
        return 'bg-yellow-100 text-yellow-800'
      case 'FAILED':
        return 'bg-red-100 text-red-800'
      case 'RETRYING':
        return 'bg-blue-100 text-blue-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString()
  }

  const formatNotificationType = (type: string) => {
    return type.split('_').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
    ).join(' ')
  }

  // Calculate pagination display
  const startItem = totalLogs === 0 ? 0 : (page - 1) * perPage + 1
  const endItem = Math.min(page * perPage, totalLogs)

  const getSearchParam = () => status ? `?status=${status}` : ""

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
          {logs.length === 0 ? (
            <TableRow>
              <TableCell colSpan={8} className="text-center py-8">
                <div className="flex flex-col items-center justify-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gray-100 mb-3">
                    <Bell className="h-6 w-6 text-gray-400" />
                  </div>
                  <div className="text-center">
                    <h3 className="text-sm font-medium">No notification logs</h3>
                    <p className="text-xs text-gray-500 mt-1">
                      {status ? `No ${status.toLowerCase()} notifications found` : "No notification logs found"}
                    </p>
                  </div>
                </div>
              </TableCell>
            </TableRow>
          ) : (
            logs.map((log) => (
              <TableRow key={log.id} className="hover:bg-gray-50">
                <TableCell className="font-medium text-sm">
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded bg-gray-100">
                      <Bell className="h-4 w-4 text-gray-400" />
                    </div>
                    <span>{truncateText(log.recipient)}</span>
                  </div>
                </TableCell>
                <TableCell className="text-sm text-gray-500">
                  {formatNotificationType(log.notificationType)}
                </TableCell>
                <TableCell className="text-sm text-gray-500">
                  {truncateText(log.templateId || "—", 20)}
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    {getStatusIcon(log.status)}
                    <Badge variant="secondary" className={getStatusColor(log.status)}>
                      {log.status}
                    </Badge>
                  </div>
                </TableCell>
                <TableCell className="text-sm text-gray-500">
                  {formatDate(log.createdAt)}
                </TableCell>
                <TableCell className="text-sm text-gray-500">
                  {log.sentAt ? formatDate(log.sentAt) : '—'}
                </TableCell>
                <TableCell className="text-sm text-gray-500">
                  {log.lastError ? (
                    <span className="text-red-600 font-mono text-xs">
                      {truncateText(log.lastError, 30)}
                    </span>
                  ) : (
                    '—'
                  )}
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <svg
                          width="15"
                          height="15"
                          viewBox="0 0 15 15"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4"
                        >
                          <path
                            d="M8.625 2.5C8.625 3.12132 8.12132 3.625 7.5 3.625C6.87868 3.625 6.375 3.12132 6.375 2.5C6.375 1.87868 6.87868 1.375 7.5 1.375C8.12132 1.375 8.625 1.87868 8.625 2.5ZM8.625 7.5C8.625 8.12132 8.12132 8.625 7.5 8.625C6.87868 8.625 6.375 8.12132 6.375 7.5C6.375 6.87868 6.87868 6.375 7.5 6.375C8.12132 6.375 8.625 6.87868 8.625 7.5ZM7.5 13.625C8.12132 13.625 8.625 13.1213 8.625 12.5C8.625 11.8787 8.12132 11.375 7.5 11.375C6.87868 11.375 6.375 11.8787 6.375 12.5C6.375 13.1213 6.87868 13.625 7.5 13.625Z"
                            fill="currentColor"
                            fillRule="evenodd"
                            clipRule="evenodd"
                          ></path>
                        </svg>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => setSelectedLog(log)}>
                        View Details
                      </DropdownMenuItem>
                      {log.status === 'FAILED' && (
                        <DropdownMenuItem className="text-orange-600">
                          Retry Notification
                        </DropdownMenuItem>
                      )}
                      <DropdownMenuItem>
                        Copy ID
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
      
      <div className="flex items-center justify-between border-t px-4 py-2">
        <div className="text-xs text-gray-500">
          {totalLogs === 0 
            ? "No results" 
            : `${startItem} — ${endItem} of ${totalLogs} results`
          }
        </div>
        <div className="flex items-center gap-2">
          <div className="text-xs text-gray-500">
            {totalPages === 0 ? "0 of 0 pages" : `${page} of ${totalPages} pages`}
          </div>
          <Link href={`/notification-logs${getSearchParam()}&page=${Math.max(1, page - 1)}`} passHref>
            <Button variant="outline" size="sm" disabled={page <= 1} className="h-7 px-2 text-xs">
              Prev
            </Button>
          </Link>
          <Link href={`/notification-logs${getSearchParam()}&page=${Math.min(totalPages, page + 1)}`} passHref>
            <Button variant="outline" size="sm" disabled={page >= totalPages} className="h-7 px-2 text-xs">
              Next
            </Button>
          </Link>
        </div>
      </div>

      {/* Notification Log Details Dialog */}
      <Dialog open={selectedLog !== null} onOpenChange={() => setSelectedLog(null)}>
        <DialogContent className="max-w-2xl max-h-[80vh]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5" />
              Notification Log Details
            </DialogTitle>
            <DialogDescription>
              View detailed information about this notification log entry
            </DialogDescription>
          </DialogHeader>
          {selectedLog && (
            <ScrollArea className="max-h-[60vh]">
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700">ID</label>
                    <p className="text-sm font-mono text-gray-900 bg-gray-50 p-2 rounded">
                      {selectedLog.id}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">Status</label>
                    <div className="flex items-center gap-2 mt-1">
                      {getStatusIcon(selectedLog.status)}
                      <Badge variant="secondary" className={getStatusColor(selectedLog.status)}>
                        {selectedLog.status}
                      </Badge>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700">Recipient</label>
                    <p className="text-sm text-gray-900">{selectedLog.recipient}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">Notification Type</label>
                    <p className="text-sm text-gray-900">
                      {formatNotificationType(selectedLog.notificationType)}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700">Template ID</label>
                    <p className="text-sm text-gray-900">{selectedLog.templateId || "—"}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">Created At</label>
                    <p className="text-sm text-gray-900">{formatDate(selectedLog.createdAt)}</p>
                  </div>
                </div>

                {selectedLog.sentAt && (
                  <div>
                    <label className="text-sm font-medium text-gray-700">Sent At</label>
                    <p className="text-sm text-gray-900">{formatDate(selectedLog.sentAt)}</p>
                  </div>
                )}

                {selectedLog.lastError && (
                  <div>
                    <label className="text-sm font-medium text-gray-700">Error Details</label>
                    <p className="text-sm text-red-600 bg-red-50 p-3 rounded font-mono whitespace-pre-wrap">
                      {selectedLog.lastError}
                    </p>
                  </div>
                )}

                <div>
                  <label className="text-sm font-medium text-gray-700">Payload</label>
                  <pre className="text-xs text-gray-900 bg-gray-50 p-3 rounded overflow-x-auto whitespace-pre-wrap">
                    {selectedLog.payload ? JSON.stringify(JSON.parse(selectedLog.payload), null, 2) : "No payload data"}
                  </pre>
                </div>
              </div>
            </ScrollArea>
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}