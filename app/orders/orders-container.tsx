import { getAllOrdersForAdminAction } from "@/actions/orders";
import { ClientOrdersTable } from "@/components/client-orders-table";

export async function OrdersContainer({
  page,
  perPage,
}: {
  page: number
  perPage: number
}) {
  try {
    // Fetch all orders for admin from real API
    const response = await getAllOrdersForAdminAction({
      pageNo: page - 1, // API uses 0-based indexing
      pageSize: perPage,
      sortBy: 'createdAt',
      sortDir: 'desc', // Show newest orders first
    });
    
    if (!response.success) {
      return (
        <div className="p-4 text-center text-red-600">
          Error loading orders: {response.error}
        </div>
      );
    }

    const ordersData = response.data;

    return (
      <ClientOrdersTable
        orders={ordersData?.content || []}
        page={page}
        perPage={perPage}
        totalOrders={ordersData?.totalElements || 0}
        totalPages={ordersData?.totalPages || 0}
        isLast={ordersData?.last || true}
      />
    );
  } catch (error) {
    console.error('Error in OrdersContainer:', error);
    return (
      <div className="p-4 text-center text-red-600">
        Error loading orders. Please try again.
      </div>
    );
  }
}