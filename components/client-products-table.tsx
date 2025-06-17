"use client"

import { useState } from "react"
import Link from "next/link"
import { Package, Star, DollarSign } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { Product } from "@/lib/http-service/products/types"

// Function to format price
const formatPrice = (price: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(price)
}

// Function to calculate discounted price
const getDiscountedPrice = (price: number, discountPercentage: number) => {
  if (discountPercentage > 0) {
    return price - (price * discountPercentage / 100)
  }
  return price
}

// Function to render star rating
const renderStarRating = (rating: number | null | undefined) => {
  const stars = []
  const validRating = rating || 0
  const fullStars = Math.floor(validRating)
  const hasHalfStar = validRating % 1 !== 0

  for (let i = 0; i < fullStars; i++) {
    stars.push(
      <Star key={i} className="h-3 w-3 fill-yellow-400 text-yellow-400" />
    )
  }

  if (hasHalfStar) {
    stars.push(
      <Star key="half" className="h-3 w-3 fill-yellow-400/50 text-yellow-400" />
    )
  }

  const emptyStars = 5 - Math.ceil(validRating)
  for (let i = 0; i < emptyStars; i++) {
    stars.push(
      <Star key={`empty-${i}`} className="h-3 w-3 text-gray-300" />
    )
  }

  return stars
}

interface ClientProductsTableProps {
  products: Product[]
  page: number
  perPage: number
  totalProducts: number
  totalPages: number
  isLast: boolean
}

export function ClientProductsTable({ 
  products, 
  page, 
  perPage, 
  totalProducts, 
  totalPages, 
  isLast 
}: ClientProductsTableProps) {
  // Calculate pagination display
  const startIndex = (page - 1) * perPage
  const endIndex = Math.min(startIndex + perPage, totalProducts)
  const startItem = startIndex + 1
  const endItem = endIndex

  return (
    <>
      {/* Desktop Table */}
      <div className="hidden md:block">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead className="text-xs font-medium">Product</TableHead>
              <TableHead className="text-xs font-medium">Shop</TableHead>
              <TableHead className="text-xs font-medium">Price</TableHead>
              <TableHead className="text-xs font-medium">Rating</TableHead>
              <TableHead className="text-xs font-medium">Brand</TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((product) => {
              const discountedPrice = getDiscountedPrice(product.price, product.discountPercentage)
              
              return (
                <TableRow key={product.id} className="hover:bg-gray-50">
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded bg-gray-100 overflow-hidden">
                        {product.imageUrl ? (
                          <img 
                            src={product.imageUrl} 
                            alt={product.name}
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <Package className="h-5 w-5 text-gray-400" />
                        )}
                      </div>
                      <div className="flex flex-col">
                        <span className="font-medium text-sm">{product.name}</span>
                        <span className="text-xs text-gray-500 truncate max-w-[200px]">
                          {product.description}
                        </span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col">
                      <span className="text-sm font-medium">{product.shopName}</span>
                      <span className="text-xs text-gray-500">{product.shopCategory}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col">
                      {product.discountPercentage > 0 ? (
                        <>
                          <span className="text-sm font-medium text-green-600">
                            {formatPrice(discountedPrice)}
                          </span>
                          <div className="flex items-center gap-1">
                            <span className="text-xs text-gray-500 line-through">
                              {formatPrice(product.price)}
                            </span>
                            <Badge variant="destructive" className="text-xs px-1 py-0">
                              -{product.discountPercentage}%
                            </Badge>
                          </div>
                        </>
                      ) : (
                        <span className="text-sm font-medium">
                          {formatPrice(product.price)}
                        </span>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-1">
                        {renderStarRating(product.averageRating)}
                      </div>
                      <span className="text-xs text-gray-500">
                        {(product.averageRating || 0).toFixed(1)} ({product.ratings?.length || 0} reviews)
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="text-sm text-gray-500">
                    {product.brand || "—"}
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
                        <DropdownMenuItem asChild>
                          <Link href={`/products/${product.id}`}>
                            View Details
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link href={`/products/${product.id}/edit`}>
                            Edit
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem>Duplicate</DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600">
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </div>

      {/* Mobile Card Layout */}
      <div className="md:hidden space-y-3 p-4">
        {products.map((product) => {
          const discountedPrice = getDiscountedPrice(product.price, product.discountPercentage)
          
          return (
            <div key={product.id} className="bg-white border rounded-lg p-4 space-y-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3 flex-1">
                  <div className="flex h-12 w-12 items-center justify-center rounded bg-gray-100 overflow-hidden flex-shrink-0">
                    {product.imageUrl ? (
                      <img 
                        src={product.imageUrl} 
                        alt={product.name}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <Package className="h-6 w-6 text-gray-400" />
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="font-medium text-sm truncate">{product.name}</h3>
                    <p className="text-xs text-gray-500 truncate">{product.shopName}</p>
                    <div className="flex items-center gap-1 mt-1">
                      {renderStarRating(product.averageRating)}
                      <span className="text-xs text-gray-500 ml-1">
                        ({product.ratings?.length || 0})
                      </span>
                    </div>
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
                    <DropdownMenuItem asChild>
                      <Link href={`/products/${product.id}`}>
                        View Details
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href={`/products/${product.id}/edit`}>
                        Edit
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>Duplicate</DropdownMenuItem>
                    <DropdownMenuItem className="text-red-600">
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex flex-col">
                  {product.discountPercentage > 0 ? (
                    <>
                      <span className="text-sm font-medium text-green-600">
                        {formatPrice(discountedPrice)}
                      </span>
                      <div className="flex items-center gap-1">
                        <span className="text-xs text-gray-500 line-through">
                          {formatPrice(product.price)}
                        </span>
                        <Badge variant="destructive" className="text-xs px-1 py-0">
                          -{product.discountPercentage}%
                        </Badge>
                      </div>
                    </>
                  ) : (
                    <span className="text-sm font-medium">
                      {formatPrice(product.price)}
                    </span>
                  )}
                </div>
                {product.brand && (
                  <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                    {product.brand}
                  </span>
                )}
              </div>
            </div>
          )
        })}
      </div>

      {/* Pagination */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-t px-4 py-3 gap-3">
        <div className="text-xs text-gray-500 text-center sm:text-left">
          {totalProducts > 0 ? `${startItem} — ${endItem} of ${totalProducts} results` : "No products found"}
        </div>
        <div className="flex items-center justify-center sm:justify-end gap-2">
          <div className="text-xs text-gray-500">
            {totalPages > 0 ? `${page} of ${totalPages} pages` : "0 pages"}
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