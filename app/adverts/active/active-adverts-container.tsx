import { getActiveAdvertsAction } from "@/actions/adverts"
import { ClientActiveAdvertsCards } from "@/components/client-active-adverts-cards"

export async function ActiveAdvertsContainer() {
  try {
    // Fetch active adverts from API
    const response = await getActiveAdvertsAction()
    
    if (!response.success) {
      return (
        <div className="p-4 text-center text-red-600">
          Error loading active adverts: {response.error}
        </div>
      )
    }

    const activeAdverts = response.data
    if (!activeAdverts || activeAdverts.length === 0) {
      return (
        <div className="flex flex-col items-center justify-center py-12">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gray-100 mb-3">
            <div className="h-6 w-6 bg-gray-400 rounded" />
          </div>
          <div className="text-center">
            <h3 className="text-sm font-medium">No active adverts</h3>
            <p className="text-xs text-gray-500 mt-1">No campaigns are currently running</p>
          </div>
        </div>
      )
    }

    return (
      <ClientActiveAdvertsCards activeAdverts={activeAdverts} />
    )
  } catch (error) {
    console.error('Error in ActiveAdvertsContainer:', error)
    return (
      <div className="p-4 text-center text-red-600">
        Error loading active adverts. Please try again.
      </div>
    )
  }
}