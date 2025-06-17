import { getAllProductsAction } from "@/actions/products";
import { ClientProductsTable } from "@/components/client-products-table";

export async function ProductsContainer({
  page,
  perPage,
}: {
  page: number
  perPage: number
}) {
  try {
    // Fetch products from real API
    const response = await getAllProductsAction({
      pageNo: page - 1, // API uses 0-based indexing
      pageSize: perPage,
      sortBy: 'name',
      sortDir: 'asc',
    });
    
    if (!response.success) {
      return (
        <div className="p-4 text-center text-red-600">
          Error loading products: {response.error}
        </div>
      );
    }

    const productsData = response.data;

    return (
      <ClientProductsTable
        products={productsData?.content || []}
        page={page}
        perPage={perPage}
        totalProducts={productsData?.totalElements || 0}
        totalPages={productsData?.totalPages || 0}
        isLast={productsData?.last || true}
      />
    );
  } catch (error) {
    console.error('Error in ProductsContainer:', error);
    return (
      <div className="p-4 text-center text-red-600">
        Error loading products. Please try again.
      </div>
    );
  }
}