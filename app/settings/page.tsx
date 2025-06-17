import { MainLayout } from "@/components/main-layout"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

const currencies = [
  {
    id: 1,
    code: "EUR",
    name: "Euro",
    taxInclusive: false,
  },
  {
    id: 2,
    code: "USD",
    name: "US Dollar",
    taxInclusive: false,
  },
]

export default function SettingsPage() {
  return (
    <MainLayout>
      <div className="p-6 space-y-6">
        <div>
          <h1 className="text-xl font-semibold text-maroon">Store</h1>
          <p className="text-xs text-gray-500 mt-1">Manage store details</p>
        </div>

        <div className="space-y-4 bg-white border rounded-md p-4">
          <div className="grid grid-cols-2 gap-4 py-3 border-b">
            <div className="text-sm font-medium">Name</div>
            <div className="text-sm">Imago</div>
          </div>

          <div className="grid grid-cols-2 gap-4 py-3 border-b">
            <div className="text-sm font-medium">Default currency</div>
            <div className="text-sm">EUR · Euro</div>
          </div>

          <div className="grid grid-cols-2 gap-4 py-3 border-b">
            <div className="text-sm font-medium">Default region</div>
            <div className="text-sm">-</div>
          </div>

          <div className="grid grid-cols-2 gap-4 py-3 border-b">
            <div className="text-sm font-medium">Default sales channel</div>
            <div className="text-sm">Default</div>
          </div>

          <div className="grid grid-cols-2 gap-4 py-3">
            <div className="text-sm font-medium">Default location</div>
            <div className="text-sm">-</div>
          </div>
        </div>

        <div className="pt-2">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-medium">Currencies</h2>
            <Button variant="ghost" size="icon">
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
          </div>

          <div className="bg-white border rounded-md">
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent">
                  <TableHead className="w-[40px]">
                    <input type="checkbox" className="h-4 w-4 rounded border-gray-300" />
                  </TableHead>
                  <TableHead className="text-xs font-medium">Code</TableHead>
                  <TableHead className="text-xs font-medium">Name</TableHead>
                  <TableHead className="text-xs font-medium">Tax inclusive</TableHead>
                  <TableHead className="w-[50px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {currencies.map((currency) => (
                  <TableRow key={currency.id} className="hover:bg-gray-50">
                    <TableCell>
                      <input type="checkbox" className="h-4 w-4 rounded border-gray-300" />
                    </TableCell>
                    <TableCell className="text-sm font-medium">{currency.code}</TableCell>
                    <TableCell className="text-sm">{currency.name}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-red-500"></div>
                        <span className="text-sm text-gray-500">No</span>
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
                          <DropdownMenuItem className="text-red-600">Delete</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <div className="flex items-center justify-between border-t px-4 py-2">
              <div className="text-xs text-gray-500">1 — 2 of 2 results</div>
              <div className="flex items-center gap-2">
                <div className="text-xs text-gray-500">1 of 1 pages</div>
                <Button variant="outline" size="sm" disabled className="h-7 px-2 text-xs">
                  Prev
                </Button>
                <Button variant="outline" size="sm" disabled className="h-7 px-2 text-xs">
                  Next
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  )
}
