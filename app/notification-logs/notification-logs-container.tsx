import { getAllNotificationLogsAction } from "@/actions/notification-logs"
import { ClientNotificationLogsTable } from "@/components/client-notification-logs-table"
import { NotificationLogStatusFilter } from "@/lib/http-service/notification-logs/types"

export async function NotificationLogsContainer({
  page,
  perPage,
  status,
}: {
  page: number
  perPage: number
  status: string
}) {
  try {
    // Validate and convert status
    const validStatuses = ['PENDING', 'FAILED', 'SENT', 'RETRYING']
    const logStatus = validStatuses.includes(status) ? status as NotificationLogStatusFilter : undefined

    // Fetch notification logs from API
    const response = await getAllNotificationLogsAction(logStatus, {
      pageNo: page - 1, // API uses 0-based pagination
      pageSize: perPage,
      sortBy: 'createdAt',
      sortDir: 'desc'
    })
    
    if (!response.success) {
      return (
        <div className="p-4 text-center text-red-600">
          Error loading notification logs: {response.error}
        </div>
      )
    }

    const logsData = response.data
    if (!logsData) {
      return (
        <div className="p-4 text-center text-gray-500">
          No notification logs found
        </div>
      )
    }

    return (
      <ClientNotificationLogsTable
        logs={logsData.content}
        page={page}
        perPage={perPage}
        totalLogs={logsData.totalElements}
        totalPages={logsData.totalPages}
        isLast={logsData.last}
        status={status}
      />
    )
  } catch (error) {
    console.error('Error in NotificationLogsContainer:', error)
    return (
      <div className="p-4 text-center text-red-600">
        Error loading notification logs. Please try again.
      </div>
    )
  }
}