"use client"

import { useState } from "react"
import Link from "next/link"
import { FolderKanban } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { DeleteCategoryDialog } from "@/components/delete-category-dialog"
import { EditCategoryDialog } from "@/components/edit-category-dialog"
import { deleteShopCategory, updateShopCategory, type Category } from "@/app/actions/category-actions"

// Function to truncate text
const truncateText = (text: string, maxLength = 40) => {
  if (text.length <= maxLength) return text
  return text.substring(0, maxLength) + "..."
}

interface ClientShopCategoriesTableProps {
  categories: Category[]
  page: number
  perPage: number
  totalCategories: number
}

export function ClientShopCategoriesTable({
  categories,
  page = 1,
  perPage = 10,
  totalCategories,
}: ClientShopCategoriesTableProps) {
  const [categoryToDelete, setCategoryToDelete] = useState<Category | null>(null)
  const [categoryToEdit, setCategoryToEdit] = useState<Category | null>(null)

  // Calculate pagination
  const totalPages = Math.ceil(totalCategories / perPage)
  const startIndex = (page - 1) * perPage
  const endIndex = Math.min(startIndex + perPage, totalCategories)

  // Calculate pagination display
  const startItem = startIndex + 1
  const endItem = endIndex

  // Handle server action calls
  const handleDelete = async (id: number) => {
    return deleteShopCategory(id)
  }

  const handleUpdate = async (id: number, data: { name: string; description: string }) => {
    return updateShopCategory(id, data)
  }

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent">
            <TableHead className="text-xs font-medium">Name</TableHead>
            <TableHead className="text-xs font-medium">Description</TableHead>
            <TableHead className="w-[50px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {categories.map((category) => (
            <TableRow key={category.id} className="hover:bg-gray-50">
              <TableCell className="font-medium text-sm">
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded bg-gray-100">
                    <FolderKanban className="h-4 w-4 text-gray-400" />
                  </div>
                  <span>{category.name}</span>
                </div>
              </TableCell>
              <TableCell className="text-sm text-gray-500">{truncateText(category.description)}</TableCell>
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
                    <DropdownMenuItem onClick={() => setCategoryToEdit(category)}>Edit</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setCategoryToDelete(category)} className="text-red-600">
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="flex items-center justify-between border-t px-4 py-2">
        <div className="text-xs text-gray-500">
          {startItem} — {endItem} of {totalCategories} results
        </div>
        <div className="flex items-center gap-2">
          <div className="text-xs text-gray-500">
            {page} of {totalPages} pages
          </div>
          <Link href={`/shops/categories?page=${Math.max(1, page - 1)}`} passHref>
            <Button variant="outline" size="sm" disabled={page <= 1} className="h-7 px-2 text-xs">
              Prev
            </Button>
          </Link>
          <Link href={`/shops/categories?page=${Math.min(totalPages, page + 1)}`} passHref>
            <Button variant="outline" size="sm" disabled={page >= totalPages} className="h-7 px-2 text-xs">
              Next
            </Button>
          </Link>
        </div>
      </div>

      {/* Delete Dialog */}
      <DeleteCategoryDialog
        isOpen={categoryToDelete !== null}
        onClose={() => setCategoryToDelete(null)}
        onConfirm={() => {
          if (categoryToDelete) {
            return handleDelete(categoryToDelete.id)
          }
          return Promise.resolve({ success: false, message: "No category selected" })
        }}
        categoryName={categoryToDelete?.name || ""}
      />

      {/* Edit Dialog */}
      <EditCategoryDialog
        isOpen={categoryToEdit !== null}
        onClose={() => setCategoryToEdit(null)}
        onSave={(id, data) => handleUpdate(id, data)}
        category={categoryToEdit}
      />
    </>
  )
}
