import { getPendingAdvertsAction } from "@/actions/adverts"
import { ClientPendingAdvertsTable } from "@/components/client-pending-adverts-table"

export async function PendingAdvertsContainer({
  page,
  perPage,
}: {
  page: number
  perPage: number
}) {
  try {
    // Fetch pending adverts from API
    const response = await getPendingAdvertsAction({
      pageNo: page - 1, // API uses 0-based pagination
      pageSize: perPage,
      sortBy: 'id',
      sortDir: 'desc'
    })
    
    if (!response.success) {
      return (
        <div className="p-4 text-center text-red-600">
          Error loading pending adverts: {response.error}
        </div>
      )
    }

    const advertsData = response.data
    if (!advertsData) {
      return (
        <div className="p-4 text-center text-gray-500">
          No pending adverts found
        </div>
      )
    }

    return (
      <ClientPendingAdvertsTable
        adverts={advertsData.content}
        page={page}
        perPage={perPage}
        totalAdverts={advertsData.totalElements}
        totalPages={advertsData.totalPages}
        isLast={advertsData.last}
      />
    )
  } catch (error) {
    console.error('Error in PendingAdvertsContainer:', error)
    return (
      <div className="p-4 text-center text-red-600">
        Error loading pending adverts. Please try again.
      </div>
    )
  }
}