import { getShopCategories } from "@/app/actions/category-actions"
import { ClientShopCategoriesTable } from "@/components/client-shop-categories-table"

export async function ShopCategoriesContainer({
  page,
  perPage,
}: {
  page: number
  perPage: number
}) {
  try {
    // Fetch categories from server action
    const allCategories = await getShopCategories()

    // Calculate pagination
    const totalCategories = allCategories.length
    const startIndex = (page - 1) * perPage
    const endIndex = startIndex + perPage
    const paginatedCategories = allCategories.slice(startIndex, endIndex)

    return (
      <ClientShopCategoriesTable
        categories={paginatedCategories}
        page={page}
        perPage={perPage}
        totalCategories={totalCategories}
      />
    )
  } catch (error) {
    return <div className="p-4 text-center text-red-600">Error loading categories. Please try again.</div>
  }
}
