"use client"

import { useState } from "react"
import Link from "next/link"
import { User, Mail, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { User as UserType } from "@/lib/http-service/users/types"

// Function to get user initials
const getUserInitials = (firstName?: string, lastName?: string, email?: string) => {
  if (firstName && lastName) {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase()
  }
  if (firstName) {
    return firstName.charAt(0).toUpperCase()
  }
  if (email) {
    return email.charAt(0).toUpperCase()
  }
  return "U"
}

// Function to get user display name
const getUserDisplayName = (firstName?: string, lastName?: string, email?: string) => {
  if (firstName && lastName) {
    return `${firstName} ${lastName}`
  }
  if (firstName) {
    return firstName
  }
  return email || "Unknown User"
}

// Function to get role display name and color
const getRoleDisplay = (role: string) => {
  const roleMap: Record<string, { label: string; variant: "default" | "secondary" | "destructive" | "outline" }> = {
    "ROLE_ADMIN": { label: "Admin", variant: "destructive" },
    "ROLE_MANAGER": { label: "Manager", variant: "default" },
    "ROLE_SHOP_OWNER": { label: "Shop Owner", variant: "secondary" },
    "ROLE_USER": { label: "User", variant: "outline" },
  }
  
  return roleMap[role] || { label: role, variant: "outline" as const }
}

interface ClientUsersTableProps {
  users: UserType[]
  page: number
  perPage: number
  totalUsers: number
  totalPages: number
  isLast: boolean
}

export function ClientUsersTable({ users, page, perPage, totalUsers, totalPages, isLast }: ClientUsersTableProps) {
  // Calculate pagination display
  const startIndex = (page - 1) * perPage
  const endIndex = Math.min(startIndex + perPage, totalUsers)
  const startItem = startIndex + 1
  const endItem = endIndex

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent">
            <TableHead className="text-xs font-medium">Name</TableHead>
            <TableHead className="text-xs font-medium">Email</TableHead>
            <TableHead className="text-xs font-medium">Role</TableHead>
            <TableHead className="text-xs font-medium">Phone</TableHead>
            <TableHead className="w-[50px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => {
            const roleDisplay = getRoleDisplay(user.role)
            
            return (
              <TableRow key={user.id} className="hover:bg-gray-50">
                <TableCell className="font-medium text-sm">
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-maroon text-white text-xs font-medium">
                      {getUserInitials(user.firstName, user.lastName, user.email)}
                    </div>
                    <span>{getUserDisplayName(user.firstName, user.lastName, user.email)}</span>
                  </div>
                </TableCell>
                <TableCell className="text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <Mail className="h-3 w-3 text-gray-400" />
                    {user.email}
                  </div>
                </TableCell>
                <TableCell className="text-sm">
                  <Badge variant={roleDisplay.variant} className="text-xs">
                    {roleDisplay.label}
                  </Badge>
                </TableCell>
                <TableCell className="text-sm text-gray-600">
                  {user.phoneNumber ? (
                    <div className="flex items-center gap-2">
                      <Phone className="h-3 w-3 text-gray-400" />
                      {user.phoneNumber}
                    </div>
                  ) : (
                    <span className="text-gray-400">—</span>
                  )}
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
                        <Link href={`/users/${encodeURIComponent(user.email)}`}>
                          View Details
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href={`/users/${encodeURIComponent(user.email)}/edit`}>
                          Edit
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-red-600">
                        Deactivate
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
      <div className="flex items-center justify-between border-t px-4 py-2">
        <div className="text-xs text-gray-500">
          {totalUsers > 0 ? `${startItem} — ${endItem} of ${totalUsers} results` : "No users found"}
        </div>
        <div className="flex items-center gap-2">
          <div className="text-xs text-gray-500">
            {totalPages > 0 ? `${page} of ${totalPages} pages` : "0 pages"}
          </div>
          <Link href={`/users?page=${Math.max(1, page - 1)}`} passHref>
            <Button variant="outline" size="sm" disabled={page <= 1} className="h-7 px-2 text-xs">
              Prev
            </Button>
          </Link>
          <Link href={`/users?page=${Math.min(totalPages, page + 1)}`} passHref>
            <Button variant="outline" size="sm" disabled={page >= totalPages} className="h-7 px-2 text-xs">
              Next
            </Button>
          </Link>
        </div>
      </div>
    </>
  )
}