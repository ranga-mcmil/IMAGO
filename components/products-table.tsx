import { Package } from "lucide-react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

// Generate a larger product list for pagination
const generateProducts = () => {
  const categories = ["Apparel", "Accessories", "Footwear", "Home Goods", "Electronics"]
  const collections = ["Summer", "Winter", "Spring", "Fall", "Limited Edition", "Essentials"]
  const statuses = ["Published", "Draft", "Archived"]
  const salesChannels = ["Default", "Online", "In-store", "Wholesale"]

  return Array.from({ length: 45 }, (_, i) => {
    const id = i + 1
    const categoryIndex = i % categories.length
    const collectionIndex = i % collections.length
    const statusIndex = i % statuses.length
    const salesChannelIndex = i % salesChannels.length
    const variants = Math.floor(Math.random() * 10) + 1

    return {
      id,
      name: `Imago ${categories[categoryIndex]} ${id}`,
      collection: collections[collectionIndex] || "-",
      salesChannel: salesChannels[salesChannelIndex],
      variants: variants.toString(),
      status: statuses[statusIndex],
    }
  })
}

const allProducts = generateProducts()

export function ProductsTable({ page = 1, perPage = 10 }: { page: number; perPage: number }) {
  // Calculate pagination
  const totalProducts = allProducts.length
  const totalPages = Math.ceil(totalProducts / perPage)
  const startIndex = (page - 1) * perPage
  const endIndex = startIndex + perPage
  const products = allProducts.slice(startIndex, endIndex)

  // Calculate pagination display
  const startItem = startIndex + 1
  const endItem = Math.min(endIndex, totalProducts)

  return (
    <>
      {/* Desktop Table */}
      <div className="hidden md:block">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead className="text-xs font-medium">Product</TableHead>
              <TableHead className="text-xs font-medium">Collection</TableHead>
              <TableHead className="text-xs font-medium">Sales Channels</TableHead>
              <TableHead className="text-xs font-medium">Variants</TableHead>
              <TableHead className="text-xs font-medium">Status</TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product.id} className="hover:bg-gray-50">
                <TableCell>
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded bg-gray-100">
                      <Package className="h-5 w-5 text-gray-400" />
                    </div>
                    <span className="font-medium text-sm">{product.name}</span>
                  </div>
                </TableCell>
                <TableCell className="text-sm text-gray-500">{product.collection}</TableCell>
                <TableCell className="text-sm text-gray-500">{product.salesChannel}</TableCell>
                <TableCell className="text-sm text-gray-500">{product.variants}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <div
                      className={`h-2 w-2 rounded-full ${
                        product.status === "Published"
                          ? "bg-green-500"
                          : product.status === "Draft"
                            ? "bg-amber-500"
                            : "bg-gray-500"
                      }`}
                    ></div>
                    <span className="text-sm text-gray-500">{product.status}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <svg
                          width="15"
                          height="15"
                          viewBox="0 0 15 15"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4"
                        >
                          <path
                            d="M8.625 2.5C8.625 3.12132 8.12132 3.625 7.5 3.625C6.87868 3.625 6.375 3.12132 6.375 2.5C6.375 1.87868 6.87868 1.375 7.5 1.375C8.12132 1.375 8.625 1.87868 8.625 2.5ZM8.625 7.5C8.625 8.12132 8.12132 8.625 7.5 8.625C6.87868 8.625 6.375 8.12132 6.375 7.5C6.375 6.87868 6.87868 6.375 7.5 6.375C8.12132 6.375 8.625 6.87868 8.625 7.5ZM7.5 13.625C8.12132 13.625 8.625 13.1213 8.625 12.5C8.625 11.8787 8.12132 11.375 7.5 11.375C6.87868 11.375 6.375 11.8787 6.375 12.5C6.375 13.1213 6.87868 13.625 7.5 13.625Z"
                            fill="currentColor"
                            fillRule="evenodd"
                            clipRule="evenodd"
                          ></path>
                        </svg>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>Edit</DropdownMenuItem>
                      <DropdownMenuItem>Duplicate</DropdownMenuItem>
                      <DropdownMenuItem className="text-red-600">Delete</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Mobile Card Layout */}
      <div className="md:hidden space-y-3 p-4">
        {products.map((product) => (
          <div key={product.id} className="bg-white border rounded-lg p-4 space-y-3">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3 flex-1">
                <div className="flex h-10 w-10 items-center justify-center rounded bg-gray-100 flex-shrink-0">
                  <Package className="h-5 w-5 text-gray-400" />
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="font-medium text-sm truncate">{product.name}</h3>
                  <p className="text-xs text-gray-500">{product.collection}</p>
                </div>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8 flex-shrink-0">
                    <svg
                      width="15"
                      height="15"
                      viewBox="0 0 15 15"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                    >
                      <path
                        d="M8.625 2.5C8.625 3.12132 8.12132 3.625 7.5 3.625C6.87868 3.625 6.375 3.12132 6.375 2.5C6.375 1.87868 6.87868 1.375 7.5 1.375C8.12132 1.375 8.625 1.87868 8.625 2.5ZM8.625 7.5C8.625 8.12132 8.12132 8.625 7.5 8.625C6.87868 8.625 6.375 8.12132 6.375 7.5C6.375 6.87868 6.87868 6.375 7.5 6.375C8.12132 6.375 8.625 6.87868 8.625 7.5ZM7.5 13.625C8.12132 13.625 8.625 13.1213 8.625 12.5C8.625 11.8787 8.12132 11.375 7.5 11.375C6.87868 11.375 6.375 11.8787 6.375 12.5C6.375 13.1213 6.87868 13.625 7.5 13.625Z"
                        fill="currentColor"
                        fillRule="evenodd"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>Edit</DropdownMenuItem>
                  <DropdownMenuItem>Duplicate</DropdownMenuItem>
                  <DropdownMenuItem className="text-red-600">Delete</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            <div className="grid grid-cols-2 gap-4 text-xs">
              <div>
                <span className="text-gray-500">Sales Channel:</span>
                <p className="font-medium">{product.salesChannel}</p>
              </div>
              <div>
                <span className="text-gray-500">Variants:</span>
                <p className="font-medium">{product.variants}</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div
                className={`h-2 w-2 rounded-full ${
                  product.status === "Published"
                    ? "bg-green-500"
                    : product.status === "Draft"
                      ? "bg-amber-500"
                      : "bg-gray-500"
                }`}
              ></div>
              <span className="text-sm text-gray-500">{product.status}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-t px-4 py-3 gap-3">
        <div className="text-xs text-gray-500 text-center sm:text-left">
          {startItem} — {endItem} of {totalProducts} results
        </div>
        <div className="flex items-center justify-center sm:justify-end gap-2">
          <div className="text-xs text-gray-500">
            {page} of {totalPages} pages
          </div>
          <Link href={`/products?page=${Math.max(1, page - 1)}`} passHref>
            <Button variant="outline" size="sm" disabled={page <= 1} className="h-7 px-2 text-xs">
              Prev
            </Button>
          </Link>
          <Link href={`/products?page=${Math.min(totalPages, page + 1)}`} passHref>
            <Button variant="outline" size="sm" disabled={page >= totalPages} className="h-7 px-2 text-xs">
              Next
            </Button>
          </Link>
        </div>
      </div>
    </>
  )
}
