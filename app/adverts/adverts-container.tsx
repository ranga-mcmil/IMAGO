import { getAdvertsAction } from "@/actions/adverts"
import { ClientAdvertsTable } from "@/components/client-adverts-table"
import { AdvertStatusFilter } from "@/lib/http-service/adverts/types"

export async function AdvertsContainer({
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
    const validStatuses = ['PENDING', 'APPROVED', 'ACTIVE', 'REJECTED', 'EXPIRED', 'CANCELLED', 'PAUSED']
    const advertStatus = validStatuses.includes(status) ? status as AdvertStatusFilter : 'ACTIVE'

    // Fetch adverts from API
    const response = await getAdvertsAction(advertStatus, {
      pageNo: page - 1, // API uses 0-based pagination
      pageSize: perPage,
      sortBy: 'id',
      sortDir: 'desc'
    })
    
    if (!response.success) {
      return (
        <div className="p-4 text-center text-red-600">
          Error loading adverts: {response.error}
        </div>
      )
    }

    const advertsData = response.data
    if (!advertsData) {
      return (
        <div className="p-4 text-center text-gray-500">
          No adverts found
        </div>
      )
    }

    return (
      <ClientAdvertsTable
        adverts={advertsData.content}
        page={page}
        perPage={perPage}
        totalAdverts={advertsData.totalElements}
        totalPages={advertsData.totalPages}
        isLast={advertsData.last}
        status={advertStatus}
      />
    )
  } catch (error) {
    console.error('Error in AdvertsContainer:', error)
    return (
      <div className="p-4 text-center text-red-600">
        Error loading adverts. Please try again.
      </div>
    )
  }
}