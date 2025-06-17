"use client"

import { useState } from "react"
import Link from "next/link"
import { ShoppingBag, Package, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Order } from "@/lib/http-service/orders/types"
import { cancelOrderAction } from "@/actions/orders"
import { syncSpecificOrderAction, triggerManualSyncAction } from "@/actions/order-status-admin"
import { toast } from "sonner"

// Function to truncate text
const truncateText = (text: string, maxLength = 40) => {
  if (text.length <= maxLength) return text
  return text.substring(0, maxLength) + "..."
}

interface ClientOrdersTableProps {
  orders: Order[]
  page: number
  perPage: number
  totalOrders: number
  totalPages: number
  isLast: boolean
}

export function ClientOrdersTable({
  orders,
  page = 1,
  perPage = 10,
  totalOrders,
  totalPages,
  isLast,
}: ClientOrdersTableProps) {
  const [processingAction, setProcessingAction] = useState<string | null>(null)

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800'
      case 'confirmed':
      case 'processing':
        return 'bg-blue-100 text-blue-800'
      case 'shipped':
      case 'out_for_delivery':
        return 'bg-purple-100 text-purple-800'
      case 'delivered':
      case 'completed':
        return 'bg-green-100 text-green-800'
      case 'cancelled':
        return 'bg-red-100 text-red-800'
      case 'refunded':
        return 'bg-orange-100 text-orange-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    })
  }

  const formatStatus = (status: string) => {
    return status.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())
  }

  const canCancelOrder = (status: string) => {
    const cancelableStatuses = ['pending', 'confirmed', 'processing']
    return cancelableStatuses.includes(status.toLowerCase())
  }

  const handleTriggerManualSync = async () => {
    setProcessingAction('manual-sync')
    try {
      const response = await triggerManualSyncAction()
      
      if (response.success) {
        toast.success('Manual sync triggered successfully')
        window.location.reload()
      } else {
        toast.error(response.error || 'Failed to trigger manual sync')
      }
    } catch (error) {
      toast.error('An error occurred while triggering manual sync')
    } finally {
      setProcessingAction(null)
    }
  }

  const handleSyncSpecificOrder = async (orderNumber: string) => {
    setProcessingAction(`sync-${orderNumber}`)
    try {
      const response = await syncSpecificOrderAction(orderNumber)
      
      if (response.success) {
        toast.success(`Order ${orderNumber} synced successfully`)
        window.location.reload()
      } else {
        toast.error(response.error || 'Failed to sync order')
      }
    } catch (error) {
      toast.error('An error occurred while syncing the order')
    } finally {
      setProcessingAction(null)
    }
  }

  const handleCancelOrder = async (orderNumber: string) => {
    const confirmed = window.confirm('Are you sure you want to cancel this order?')
    if (!confirmed) return

    setProcessingAction(`cancel-${orderNumber}`)
    try {
      const response = await cancelOrderAction(orderNumber)
      
      if (response.success) {
        toast.success('Order cancelled successfully')
        window.location.reload()
      } else {
        toast.error(response.error || 'Failed to cancel order')
      }
    } catch (error) {
      toast.error('An error occurred while cancelling the order')
    } finally {
      setProcessingAction(null)
    }
  }

  // Calculate pagination display
  const startItem = totalOrders === 0 ? 0 : (page - 1) * perPage + 1
  const endItem = Math.min(page * perPage, totalOrders)

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent">
            <TableHead className="text-xs font-medium">Order Number</TableHead>
            <TableHead className="text-xs font-medium">Status</TableHead>
            <TableHead className="text-xs font-medium">Date</TableHead>
            <TableHead className="w-[50px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.length === 0 ? (
            <TableRow>
              <TableCell colSpan={4} className="text-center py-8">
                <div className="flex flex-col items-center justify-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gray-100 mb-3">
                    <ShoppingBag className="h-6 w-6 text-gray-400" />
                  </div>
                  <div className="text-center">
                    <h3 className="text-sm font-medium">No orders yet</h3>
                    <p className="text-xs text-gray-500 mt-1">Orders will appear here</p>
                  </div>
                </div>
              </TableCell>
            </TableRow>
          ) : (
            orders.map((order) => (
              <TableRow key={order.id} className="hover:bg-gray-50">
                <TableCell className="font-medium text-sm">
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded bg-gray-100">
                      <Package className="h-4 w-4 text-gray-400" />
                    </div>
                    <span className="font-mono">{order.orderNumber}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="secondary" className={getStatusColor(order.status)}>
                    {formatStatus(order.status)}
                  </Badge>
                </TableCell>
                <TableCell className="text-sm text-gray-500">
                  {formatDate(order.createdAt)}
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-8 w-8"
                        disabled={processingAction?.includes(order.orderNumber)}
                      >
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
                      {/* Always available */}
                      <DropdownMenuItem>
                        <Eye className="mr-2 h-4 w-4" />
                        View Details
                      </DropdownMenuItem>
                      
                      {/* Order Status Admin Actions */}
                      <DropdownMenuItem 
                        className="text-blue-600"
                        onClick={() => handleSyncSpecificOrder(order.orderNumber)}
                        disabled={processingAction?.includes(order.orderNumber)}
                      >
                        {processingAction === `sync-${order.orderNumber}` ? 'Syncing...' : 'Sync Order Status'}
                      </DropdownMenuItem>
                      
                      {/* Keep original cancel for backwards compatibility if needed */}
                      {canCancelOrder(order.status) && (
                        <DropdownMenuItem 
                          className="text-red-600"
                          onClick={() => handleCancelOrder(order.orderNumber)}
                          disabled={processingAction?.includes(order.orderNumber)}
                        >
                          Cancel Order
                        </DropdownMenuItem>
                      )}
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
          {totalOrders === 0 
            ? "No results" 
            : `${startItem} — ${endItem} of ${totalOrders} results`
          }
        </div>
        <div className="flex items-center gap-2">
          <div className="text-xs text-gray-500">
            {totalPages === 0 ? "0 of 0 pages" : `${page} of ${totalPages} pages`}
          </div>
          <Link href={`/orders?page=${Math.max(1, page - 1)}`} passHref>
            <Button variant="outline" size="sm" disabled={page <= 1} className="h-7 px-2 text-xs">
              Prev
            </Button>
          </Link>
          <Link href={`/orders?page=${Math.min(totalPages, page + 1)}`} passHref>
            <Button variant="outline" size="sm" disabled={page >= totalPages} className="h-7 px-2 text-xs">
              Next
            </Button>
          </Link>
        </div>
      </div>
    </>
  )
}