"use client"

import { useState } from "react"
import Link from "next/link"
import { Store, Mail, Phone, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { Shop } from "@/lib/http-service/shops/types"

// Function to truncate text
const truncateText = (text: string, maxLength = 30) => {
  if (text.length <= maxLength) return text
  return text.substring(0, maxLength) + "..."
}

// Function to get shop status badge
const getStatusBadge = (active: boolean) => {
  if (active) {
    return <Badge variant="secondary" className="bg-green-100 text-green-800">Active</Badge>
  } else {
    return <Badge variant="outline" className="text-gray-600">Inactive</Badge>
  }
}

interface ClientShopsTableProps {
  shops: Shop[]
  page: number
  perPage: number
  totalShops: number
  totalPages: number
  isLast: boolean
}

export function ClientShopsTable({ 
  shops, 
  page, 
  perPage, 
  totalShops, 
  totalPages, 
  isLast 
}: ClientShopsTableProps) {
  // Calculate pagination display
  const startIndex = (page - 1) * perPage
  const endIndex = Math.min(startIndex + perPage, totalShops)
  const startItem = startIndex + 1
  const endItem = endIndex

  return (
    <>
      {/* Desktop Table */}
      <div className="hidden md:block">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead className="text-xs font-medium">Shop</TableHead>
              <TableHead className="text-xs font-medium">Category</TableHead>
              <TableHead className="text-xs font-medium">Location</TableHead>
              <TableHead className="text-xs font-medium">Contact</TableHead>
              <TableHead className="text-xs font-medium">Status</TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {shops.map((shop) => (
              <TableRow key={shop.id} className="hover:bg-gray-50">
                <TableCell className="font-medium text-sm">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded bg-gray-100 overflow-hidden">
                      {shop.logo ? (
                        <img 
                          src={shop.logo} 
                          alt={shop.name}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <Store className="h-5 w-5 text-gray-400" />
                      )}
                    </div>
                    <div className="flex flex-col">
                      <span className="font-medium">{shop.name}</span>
                      <span className="text-xs text-gray-500 truncate max-w-[200px]">
                        {shop.description}
                      </span>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="text-sm text-gray-500">
                  {shop.shopCategoryName || "—"}
                </TableCell>
                <TableCell className="text-sm text-gray-500">
                  <div className="flex items-center gap-1">
                    <MapPin className="h-3 w-3 text-gray-400" />
                    {truncateText(shop.location)}
                  </div>
                </TableCell>
                <TableCell className="text-sm text-gray-500">
                  <div className="flex flex-col gap-1">
                    {shop.email && (
                      <div className="flex items-center gap-1">
                        <Mail className="h-3 w-3 text-gray-400" />
                        <span className="truncate max-w-[120px]">{shop.email}</span>
                      </div>
                    )}
                    {shop.phoneNumber && (
                      <div className="flex items-center gap-1">
                        <Phone className="h-3 w-3 text-gray-400" />
                        <span>{shop.phoneNumber}</span>
                      </div>
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  {getStatusBadge(shop.active)}
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
                      <DropdownMenuItem disabled className="text-gray-400 cursor-not-allowed">
                        View Details
                      </DropdownMenuItem>
                      <DropdownMenuItem disabled className="text-gray-400 cursor-not-allowed">
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem disabled className="text-gray-400 cursor-not-allowed">
                        Duplicate
                      </DropdownMenuItem>
                      <DropdownMenuItem disabled className="text-gray-400 cursor-not-allowed">
                        Delete
                      </DropdownMenuItem>
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
        {shops.map((shop) => (
          <div key={shop.id} className="bg-white border rounded-lg p-4 space-y-3">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3 flex-1">
                <div className="flex h-12 w-12 items-center justify-center rounded bg-gray-100 overflow-hidden flex-shrink-0">
                  {shop.logo ? (
                    <img 
                      src={shop.logo} 
                      alt={shop.name}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <Store className="h-6 w-6 text-gray-400" />
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="font-medium text-sm truncate">{shop.name}</h3>
                  <p className="text-xs text-gray-500 truncate">{shop.shopCategoryName}</p>
                  <div className="flex items-center mt-1">
                    {getStatusBadge(shop.active)}
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
                  <DropdownMenuItem disabled className="text-gray-400 cursor-not-allowed">
                    View Details
                  </DropdownMenuItem>
                  <DropdownMenuItem disabled className="text-gray-400 cursor-not-allowed">
                    Edit
                  </DropdownMenuItem>
                  <DropdownMenuItem disabled className="text-gray-400 cursor-not-allowed">
                    Duplicate
                  </DropdownMenuItem>
                  <DropdownMenuItem disabled className="text-gray-400 cursor-not-allowed">
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex items-center gap-2">
                <MapPin className="h-3 w-3 text-gray-400" />
                <span className="text-gray-600 truncate">{shop.location}</span>
              </div>
              {shop.email && (
                <div className="flex items-center gap-2">
                  <Mail className="h-3 w-3 text-gray-400" />
                  <span className="text-gray-600 truncate">{shop.email}</span>
                </div>
              )}
              {shop.phoneNumber && (
                <div className="flex items-center gap-2">
                  <Phone className="h-3 w-3 text-gray-400" />
                  <span className="text-gray-600">{shop.phoneNumber}</span>
                </div>
              )}
            </div>

            {shop.description && (
              <p className="text-xs text-gray-500 truncate">{shop.description}</p>
            )}
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-t px-4 py-3 gap-3">
        <div className="text-xs text-gray-500 text-center sm:text-left">
          {totalShops > 0 ? `${startItem} — ${endItem} of ${totalShops} results` : "No shops found"}
        </div>
        <div className="flex items-center justify-center sm:justify-end gap-2">
          <div className="text-xs text-gray-500">
            {totalPages > 0 ? `${page} of ${totalPages} pages` : "0 pages"}
          </div>
          <Link href={`/shops?page=${Math.max(1, page - 1)}`} passHref>
            <Button variant="outline" size="sm" disabled={page <= 1} className="h-7 px-2 text-xs">
              Prev
            </Button>
          </Link>
          <Link href={`/shops?page=${Math.min(totalPages, page + 1)}`} passHref>
            <Button variant="outline" size="sm" disabled={page >= totalPages} className="h-7 px-2 text-xs">
              Next
            </Button>
          </Link>
        </div>
      </div>
    </>
  )
}