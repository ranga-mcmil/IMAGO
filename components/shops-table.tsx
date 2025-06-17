import Link from "next/link"
import { Store } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

// Generate a larger shop list for pagination
const generateShops = () => {
  const locations = [
    "123 Main Street, Downtown",
    "Central Mall, 2nd Floor",
    "Fashion District, 45 Park Avenue",
    "Web-based",
    "Airport Terminal 3",
    "Westfield Shopping Center",
    "5th Avenue, Suite 200",
    "Outlet Mall, Building C",
    "Harbor View Plaza",
    "University Campus",
    "Train Station Concourse",
    "Business District Tower",
    "Suburban Mall, East Wing",
    "Arts District, Gallery Row",
    "Tech Hub, Innovation Center",
    "Waterfront Shopping Center",
    "Historic District, Old Town",
    "Medical Center Plaza",
    "Sports Arena Concourse",
    "Mountain View Resort",
  ]

  const owners = [
    "John Smith",
    "Sarah Johnson",
    "Michael Brown",
    "Emily Davis",
    "David Wilson",
    "Jessica Martinez",
    "Robert Taylor",
    "Jennifer Anderson",
    "Christopher Thomas",
    "Amanda White",
    "Daniel Harris",
    "Lisa Jackson",
    "Matthew Clark",
    "Elizabeth Lewis",
    "James Walker",
    "Olivia Hall",
    "Andrew Young",
    "Sophia King",
    "Joseph Wright",
    "Emma Scott",
  ]

  return Array.from({ length: 25 }, (_, i) => {
    const id = i + 1
    const locationIndex = i % locations.length
    const ownerIndex = i % owners.length

    return {
      id,
      name: `Imago ${id <= 4 ? ["Flagship Store", "Online", "Mall Outlet", "Pop-up Shop"][i] : `Store ${id}`}`,
      location: locations[locationIndex],
      owner: owners[ownerIndex],
    }
  })
}

const allShops = generateShops()

// Function to truncate text
const truncateText = (text: string, maxLength = 20) => {
  if (text.length <= maxLength) return text
  return text.substring(0, maxLength) + "..."
}

export function ShopsTable({ page = 1, perPage = 10 }: { page: number; perPage: number }) {
  // Calculate pagination
  const totalShops = allShops.length
  const totalPages = Math.ceil(totalShops / perPage)
  const startIndex = (page - 1) * perPage
  const endIndex = startIndex + perPage
  const shops = allShops.slice(startIndex, endIndex)

  // Calculate pagination display
  const startItem = startIndex + 1
  const endItem = Math.min(endIndex, totalShops)

  return (
    <>
      {/* Desktop Table */}
      <div className="hidden md:block">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead className="text-xs font-medium">Name</TableHead>
              <TableHead className="text-xs font-medium">Location</TableHead>
              <TableHead className="text-xs font-medium">Owner</TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {shops.map((shop) => (
              <TableRow key={shop.id} className="hover:bg-gray-50">
                <TableCell className="font-medium text-sm">
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded bg-gray-100">
                      <Store className="h-4 w-4 text-gray-400" />
                    </div>
                    <span>{shop.name}</span>
                  </div>
                </TableCell>
                <TableCell className="text-sm text-gray-500">{truncateText(shop.location)}</TableCell>
                <TableCell className="text-sm text-gray-500">{shop.owner}</TableCell>
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
                      <DropdownMenuItem>View details</DropdownMenuItem>
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
        {shops.map((shop) => (
          <div key={shop.id} className="bg-white border rounded-lg p-4 space-y-3">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3 flex-1">
                <div className="flex h-10 w-10 items-center justify-center rounded bg-gray-100 flex-shrink-0">
                  <Store className="h-5 w-5 text-gray-400" />
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="font-medium text-sm">{shop.name}</h3>
                  <p className="text-xs text-gray-500 truncate">{shop.location}</p>
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
                  <DropdownMenuItem>View details</DropdownMenuItem>
                  <DropdownMenuItem className="text-red-600">Delete</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            <div>
              <span className="text-xs text-gray-500">Owner:</span>
              <p className="font-medium text-sm">{shop.owner}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-t px-4 py-3 gap-3">
        <div className="text-xs text-gray-500 text-center sm:text-left">
          {startItem} — {endItem} of {totalShops} results
        </div>
        <div className="flex items-center justify-center sm:justify-end gap-2">
          <div className="text-xs text-gray-500">
            {page} of {totalPages} pages
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
