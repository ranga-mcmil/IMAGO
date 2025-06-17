import { getShopsAction } from "@/actions/shops";
import { ClientShopsTable } from "@/components/client-shops-table";

export async function ShopsContainer({
  page,
  perPage,
}: {
  page: number
  perPage: number
}) {
  try {
    // Fetch shops from real API
    const response = await getShopsAction({
      pageNo: page - 1, // API uses 0-based indexing
      pageSize: perPage,
      sortBy: 'name',
      sortDir: 'asc',
    });
    
    if (!response.success) {
      return (
        <div className="p-4 text-center text-red-600">
          Error loading shops: {response.error}
        </div>
      );
    }

    const shopsData = response.data;

    return (
      <ClientShopsTable
        shops={shopsData?.content || []}
        page={page}
        perPage={perPage}
        totalShops={shopsData?.totalElements || 0}
        totalPages={shopsData?.totalPages || 0}
        isLast={shopsData?.last || true}
      />
    );
  } catch (error) {
    console.error('Error in ShopsContainer:', error);
    return (
      <div className="p-4 text-center text-red-600">
        Error loading shops. Please try again.
      </div>
    );
  }
}