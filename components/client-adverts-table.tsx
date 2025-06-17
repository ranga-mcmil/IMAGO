"use client"

import { useState } from "react"
import Link from "next/link"
import { Calendar, Clock, Megaphone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Advert, AdvertStatusFilter } from "@/lib/http-service/adverts/types"
import { processAdvertApprovalAction, cancelAdvertAction } from "@/actions/adverts"
import { toast } from "sonner"

// Function to truncate text
const truncateText = (text: string, maxLength = 40) => {
  if (text.length <= maxLength) return text
  return text.substring(0, maxLength) + "..."
}

interface ClientAdvertsTableProps {
  adverts: Advert[]
  page: number
  perPage: number
  totalAdverts: number
  totalPages: number
  isLast: boolean
  status: AdvertStatusFilter
}

export function ClientAdvertsTable({
  adverts,
  page = 1,
  perPage = 10,
  totalAdverts,
  totalPages,
  isLast,
  status,
}: ClientAdvertsTableProps) {
  const [processingId, setProcessingId] = useState<number | null>(null)

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'PENDING':
        return 'bg-yellow-100 text-yellow-800'
      case 'APPROVED':
        return 'bg-blue-100 text-blue-800'
      case 'ACTIVE':
        return 'bg-green-100 text-green-800'
      case 'REJECTED':
        return 'bg-red-100 text-red-800'
      case 'EXPIRED':
        return 'bg-gray-100 text-gray-800'
      case 'CANCELLED':
        return 'bg-orange-100 text-orange-800'
      case 'PAUSED':
        return 'bg-purple-100 text-purple-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString()
  }

  const handleApprove = async (advertId: number) => {
    setProcessingId(advertId)
    try {
      const formData = new FormData()
      formData.append('action', 'APPROVE')
      formData.append('startDate', new Date().toISOString())

      const response = await processAdvertApprovalAction(advertId, formData)
      
      if (response.success) {
        toast.success('Advert approved successfully')
        window.location.reload()
      } else {
        toast.error(response.error || 'Failed to approve advert')
      }
    } catch (error) {
      toast.error('An error occurred while approving the advert')
    } finally {
      setProcessingId(null)
    }
  }

  const handleReject = async (advertId: number) => {
    const reason = prompt('Please provide a reason for rejection:')
    if (!reason) return

    setProcessingId(advertId)
    try {
      const formData = new FormData()
      formData.append('action', 'REJECT')
      formData.append('rejectionReason', reason)

      const response = await processAdvertApprovalAction(advertId, formData)
      
      if (response.success) {
        toast.success('Advert rejected successfully')
        window.location.reload()
      } else {
        toast.error(response.error || 'Failed to reject advert')
      }
    } catch (error) {
      toast.error('An error occurred while rejecting the advert')
    } finally {
      setProcessingId(null)
    }
  }

  const handleCancel = async (advertId: number) => {
    const reason = prompt('Please provide a reason for cancellation:')
    if (!reason) return

    setProcessingId(advertId)
    try {
      const formData = new FormData()
      formData.append('cancellationReason', reason)

      const response = await cancelAdvertAction(advertId, formData)
      
      if (response.success) {
        toast.success('Advert cancelled successfully')
        window.location.reload()
      } else {
        toast.error(response.error || 'Failed to cancel advert')
      }
    } catch (error) {
      toast.error('An error occurred while cancelling the advert')
    } finally {
      setProcessingId(null)
    }
  }

  // Calculate pagination display
  const startItem = totalAdverts === 0 ? 0 : (page - 1) * perPage + 1
  const endItem = Math.min(page * perPage, totalAdverts)

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent">
            <TableHead className="text-xs font-medium">Product</TableHead>
            <TableHead className="text-xs font-medium">Requester</TableHead>
            <TableHead className="text-xs font-medium">Status</TableHead>
            <TableHead className="text-xs font-medium">Duration</TableHead>
            <TableHead className="text-xs font-medium">Start Date</TableHead>
            <TableHead className="text-xs font-medium">Days Remaining</TableHead>
            <TableHead className="w-[50px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {adverts.length === 0 ? (
            <TableRow>
              <TableCell colSpan={7} className="text-center py-8">
                <div className="flex flex-col items-center justify-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gray-100 mb-3">
                    <Megaphone className="h-6 w-6 text-gray-400" />
                  </div>
                  <div className="text-center">
                    <h3 className="text-sm font-medium">No {status.toLowerCase()} adverts</h3>
                    <p className="text-xs text-gray-500 mt-1">No adverts found with this status</p>
                  </div>
                </div>
              </TableCell>
            </TableRow>
          ) : (
            adverts.map((advert) => (
              <TableRow key={advert.id} className="hover:bg-gray-50">
                <TableCell className="font-medium text-sm">
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded bg-gray-100">
                      <Megaphone className="h-4 w-4 text-gray-400" />
                    </div>
                    <span>{truncateText(advert.productName)}</span>
                  </div>
                </TableCell>
                <TableCell className="text-sm text-gray-500">
                  {truncateText(advert.requesterName)}
                </TableCell>
                <TableCell>
                  <Badge variant="secondary" className={getStatusColor(advert.status)}>
                    {advert.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-sm text-gray-500">
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3 text-gray-400" />
                    <span>{advert.durationDays} days</span>
                  </div>
                </TableCell>
                <TableCell className="text-sm text-gray-500">
                  {advert.startDate ? formatDate(advert.startDate) : '-'}
                </TableCell>
                <TableCell className="text-sm text-gray-500">
                  {advert.daysRemaining > 0 ? `${advert.daysRemaining} days` : '-'}
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-8 w-8"
                        disabled={processingId === advert.id}
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
                        View Details
                      </DropdownMenuItem>
                      
                      {/* PENDING status actions - Process Approval */}
                      {advert.status === 'PENDING' && (
                        <>
                          <DropdownMenuItem 
                            className="text-green-600"
                            onClick={() => handleApprove(advert.id)}
                            disabled={processingId === advert.id}
                          >
                            Approve
                          </DropdownMenuItem>
                          <DropdownMenuItem 
                            className="text-red-600"
                            onClick={() => handleReject(advert.id)}
                            disabled={processingId === advert.id}
                          >
                            Reject
                          </DropdownMenuItem>
                        </>
                      )}
                      
                      {/* ACTIVE/APPROVED status actions - Cancel */}
                      {(advert.status === 'ACTIVE' || advert.status === 'APPROVED') && (
                        <DropdownMenuItem 
                          className="text-orange-600"
                          onClick={() => handleCancel(advert.id)}
                          disabled={processingId === advert.id}
                        >
                          Cancel Advert
                        </DropdownMenuItem>
                      )}
                      
                      {/* REJECTED status - Show rejection reason if available */}
                      {advert.status === 'REJECTED' && advert.rejectionReason && (
                        <DropdownMenuItem disabled>
                          Reason: {truncateText(advert.rejectionReason, 30)}
                        </DropdownMenuItem>
                      )}
                      
                      {/* CANCELLED status - Show cancellation reason if available */}
                      {advert.status === 'CANCELLED' && advert.cancellationReason && (
                        <DropdownMenuItem disabled>
                          Reason: {truncateText(advert.cancellationReason, 30)}
                        </DropdownMenuItem>
                      )}
                      
                      {/* EXPIRED status - No additional actions */}
                      {advert.status === 'EXPIRED' && (
                        <DropdownMenuItem disabled className="text-gray-500">
                          Advert Expired
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
          {totalAdverts === 0 
            ? "No results" 
            : `${startItem} — ${endItem} of ${totalAdverts} results`
          }
        </div>
        <div className="flex items-center gap-2">
          <div className="text-xs text-gray-500">
            {totalPages === 0 ? "0 of 0 pages" : `${page} of ${totalPages} pages`}
          </div>
          <Link href={`/adverts?status=${status}&page=${Math.max(1, page - 1)}`} passHref>
            <Button variant="outline" size="sm" disabled={page <= 1} className="h-7 px-2 text-xs">
              Prev
            </Button>
          </Link>
          <Link href={`/adverts?status=${status}&page=${Math.min(totalPages, page + 1)}`} passHref>
            <Button variant="outline" size="sm" disabled={page >= totalPages} className="h-7 px-2 text-xs">
              Next
            </Button>
          </Link>
        </div>
      </div>
    </>
  )
}