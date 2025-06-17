import { getCategoriesAction } from "@/actions/shops";
import { ClientShopCategoriesTable } from "@/components/client-shop-categories-table";

export async function ShopCategoriesContainer({
  page,
  perPage,
}: {
  page: number
  perPage: number
}) {
  try {
    // Fetch categories from real API
    const response = await getCategoriesAction();
    
    if (!response.success) {
      return (
        <div className="p-4 text-center text-red-600">
          Error loading categories: {response.error}
        </div>
      );
    }

    const allCategories = response.data || [];

    // Calculate pagination
    const totalCategories = allCategories.length;
    const startIndex = (page - 1) * perPage;
    const endIndex = startIndex + perPage;
    const paginatedCategories = allCategories.slice(startIndex, endIndex);

    return (
      <ClientShopCategoriesTable
        categories={paginatedCategories}
        page={page}
        perPage={perPage}
        totalCategories={totalCategories}
      />
    );
  } catch (error) {
    console.error('Error in ShopCategoriesContainer:', error);
    return (
      <div className="p-4 text-center text-red-600">
        Error loading categories. Please try again.
      </div>
    );
  }
}