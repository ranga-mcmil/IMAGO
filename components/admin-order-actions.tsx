"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { triggerManualSyncAction, getOrderStatusSummaryAction } from "@/actions/order-status-admin"
import { toast } from "sonner"

export function AdminOrderActions() {
    const [processingAction, setProcessingAction] = useState<string | null>(null)

    const handleTriggerManualSync = async () => {
        setProcessingAction('manual-sync')
        try {
            const response = await triggerManualSyncAction()

            if (response.success) {
                toast.success('Manual sync triggered successfully')
                // window.location.reload()
            } else {
                toast.error(response.error || 'Failed to trigger manual sync')
            }
        } catch (error) {
            toast.error('An error occurred while triggering manual sync')
        } finally {
            setProcessingAction(null)
        }
    }

    const handleGetOrderStatusSummary = async () => {
        setProcessingAction('status-summary')
        try {
            const response = await getOrderStatusSummaryAction()

            if (response.success) {
                // You can customize this to display the summary in a modal or separate component
                console.log('Order Status Summary:', response.data)
                toast.success('Order status summary retrieved successfully')
                // For now, just log to console - you might want to show this in a modal
            } else {
                toast.error(response.error || 'Failed to get order status summary')
            }
        } catch (error) {
            toast.error('An error occurred while getting order status summary')
        } finally {
            setProcessingAction(null)
        }
    }

    return (
        <div className="flex flex-col sm:flex-row gap-2">
            <Button
                size="sm"
                variant="outline"
                className="w-full sm:w-auto"
                onClick={handleGetOrderStatusSummary}
                disabled={processingAction === 'status-summary'}
            >
                {processingAction === 'status-summary' ? 'Loading...' : 'Status Summary'}
            </Button>
            <Button
                size="sm"
                className="bg-maroon hover:bg-maroon/90 text-white w-full sm:w-auto"
                onClick={handleTriggerManualSync}
                disabled={processingAction === 'manual-sync'}
            >
                {processingAction === 'manual-sync' ? 'Syncing...' : 'Manual Sync'}
            </Button>
        </div>
    )
}