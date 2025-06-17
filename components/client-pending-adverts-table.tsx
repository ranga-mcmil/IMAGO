"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, CheckCircle, XCircle } from "lucide-react"
import Link from "next/link"
import { Advert } from "@/lib/http-service/adverts/types"
import { processAdvertApprovalAction } from "@/actions/adverts"
import { toast } from "sonner"

interface ClientPendingAdvertsTableProps {
  adverts: Advert[]
  page: number
  perPage: number
  totalAdverts: number
  totalPages: number
  isLast: boolean
}

export function ClientPendingAdvertsTable({
  adverts,
  page,
  perPage,
  totalAdverts,
  totalPages,
  isLast,
}: ClientPendingAdvertsTableProps) {
  const [processingId, setProcessingId] = useState<number | null>(null)

  const handleApprove = async (advertId: number) => {
    setProcessingId(advertId)
    try {
      const formData = new FormData()
      formData.append('action', 'APPROVE')
      formData.append('startDate', new Date().toISOString())

      const response = await processAdvertApprovalAction(advertId, formData)
      
      if (response.success) {
        toast.success('Advert approved successfully')
        // Refresh the page to update the data
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
        // Refresh the page to update the data
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

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString()
  }

  if (adverts.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gray-100 mb-3">
          <Calendar className="h-6 w-6 text-gray-400" />
        </div>
        <div className="text-center">
          <h3 className="text-sm font-medium">No pending adverts</h3>
          <p className="text-xs text-gray-500 mt-1">No adverts awaiting approval</p>
        </div>
      </div>
    )
  }

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
            <TableHead className="w-[120px]">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {adverts.map((advert) => (
            <TableRow key={advert.id} className="hover:bg-gray-50">
              <TableCell>
                <div className="font-medium text-sm">{advert.productName}</div>
              </TableCell>
              <TableCell>
                <div className="text-sm">{advert.requesterName}</div>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-1">
                  <Clock className="h-3 w-3 text-gray-400" />
                  <span className="text-sm">{advert.durationDays} days</span>
                </div>
              </TableCell>
              <TableCell>
                <span className="text-sm">{formatDate(advert.createdAt)}</span>
              </TableCell>
              <TableCell>
                <span className="text-sm text-gray-600">
                  {/* Notes would be displayed here if available in the API */}
                  -
                </span>
              </TableCell>
              <TableCell>
                <div className="flex gap-1">
                  <Button
                    size="sm"
                    variant="outline"
                    className="h-7 px-2 text-xs text-green-600 border-green-200 hover:bg-green-50"
                    onClick={() => handleApprove(advert.id)}
                    disabled={processingId === advert.id}
                  >
                    <CheckCircle className="h-3 w-3 mr-1" />
                    Approve
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="h-7 px-2 text-xs text-red-600 border-red-200 hover:bg-red-50"
                    onClick={() => handleReject(advert.id)}
                    disabled={processingId === advert.id}
                  >
                    <XCircle className="h-3 w-3 mr-1" />
                    Reject
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="flex items-center justify-between border-t px-4 py-2">
        <p className="text-xs text-gray-500">
          Showing {(page - 1) * perPage + 1} to {Math.min(page * perPage, totalAdverts)} of {totalAdverts} results
        </p>
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-500">
            Page {page} of {totalPages}
          </span>
          <Link href={`/adverts/pending?page=${Math.max(1, page - 1)}`}>
            <Button variant="outline" size="sm" disabled={page <= 1} className="h-7 px-2 text-xs">
              Prev
            </Button>
          </Link>
          <Link href={`/adverts/pending?page=${page + 1}`}>
            <Button variant="outline" size="sm" disabled={isLast} className="h-7 px-2 text-xs">
              Next
            </Button>
          </Link>
        </div>
      </div>
    </>
  )
}
    