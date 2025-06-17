import { getProductCategories } from "@/app/actions/category-actions"
import { ClientProductCategoriesTable } from "@/components/client-product-categories-table"

export async function ProductCategoriesContainer({
  page,
  perPage,
}: {
  page: number
  perPage: number
}) {
  // Fetch categories from server action
  const allCategories = await getProductCategories()

  // Calculate pagination
  const totalCategories = allCategories.length
  const startIndex = (page - 1) * perPage
  const endIndex = startIndex + perPage
  const paginatedCategories = allCategories.slice(startIndex, endIndex)

  return (
    <ClientProductCategoriesTable
      categories={paginatedCategories}
      page={page}
      perPage={perPage}
      totalCategories={totalCategories}
    />
  )
}
