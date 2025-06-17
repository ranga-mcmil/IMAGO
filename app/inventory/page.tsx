import { MainLayout } from "@/components/main-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

const inventoryItems = [
  {
    id: 1,
    title: "S / Black",
    sku: "SHIRT-S-BLACK",
    reserved: 0,
    inStock: 1000000,
  },
  {
    id: 2,
    title: "S / White",
    sku: "SHIRT-S-WHITE",
    reserved: 0,
    inStock: 1000000,
  },
  {
    id: 3,
    title: "M / White",
    sku: "SHIRT-M-WHITE",
    reserved: 0,
    inStock: 1000000,
  },
  {
    id: 4,
    title: "M / Black",
    sku: "SHIRT-M-BLACK",
    reserved: 0,
    inStock: 1000000,
  },
  {
    id: 5,
    title: "XL",
    sku: "SWEATSHIRT-XL",
    reserved: 0,
    inStock: 1000000,
  },
  {
    id: 6,
    title: "L",
    sku: "SHORTS-L",
    reserved: 0,
    inStock: 1000000,
  },
  {
    id: 7,
    title: "XL / White",
    sku: "SHIRT-XL-WHITE",
    reserved: 0,
    inStock: 1000000,
  },
  {
    id: 8,
    title: "S",
    sku: "SWEATPANTS-S",
    reserved: 0,
    inStock: 1000000,
  },
]

export default function InventoryPage() {
  return (
    <MainLayout>
      <div className="p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-semibold text-maroon">Inventory</h1>
            <p className="text-xs text-gray-500 mt-1">Manage inventory items</p>
          </div>
          <div>
            <Button size="sm" className="bg-maroon hover:bg-maroon/90 text-white">
              Create
            </Button>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <Button variant="outline" size="sm">
            Filters
          </Button>
          <div className="flex items-center gap-2">
            <Input placeholder="Search inventory" className="w-[250px] h-9" />
            <Button variant="outline" size="icon" className="h-9 w-9">
              <svg
                width="15"
                height="15"
                viewBox="0 0 15 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
              >
                <path
                  d="M5.5 3C4.67157 3 4 3.67157 4 4.5C4 5.32843 4.67157 6 5.5 6C6.32843 6 7 5.32843 7 4.5C7 3.67157 6.32843 3 5.5 3ZM3 5C3.01671 5 3.03323 4.99918 3.04952 4.99758C3.28022 6.1399 4.28967 7 5.5 7C6.71033 7 7.71978 6.1399 7.95048 4.99758C7.96677 4.99918 7.98329 5 8 5H13.5C13.7761 5 14 4.77614 14 4.5C14 4.22386 13.7761 4 13.5 4H8C7.98329 4 7.96677 4.00082 7.95048 4.00242C7.71978 2.86009 6.71033 2 5.5 2C4.28967 2 3.28022 2.86009 3.04952 4.00242C3.03323 4.00082 3.01671 4 3 4H1.5C1.22386 4 1 4.22386 1 4.5C1 4.77614 1.22386 5 1.5 5H3ZM11.9505 10.9976C11.7198 12.1399 10.7103 13 9.5 13C8.28967 13 7.28022 12.1399 7.04952 10.9976C7.03323 10.9992 7.01671 11 7 11H1.5C1.22386 11 1 10.7761 1 10.5C1 10.2239 1.22386 10 1.5 10H7C7.01671 10 7.03323 10.0008 7.04952 10.0024C7.28022 8.8601 8.28967 8 9.5 8C10.7103 8 11.7198 8.8601 11.9505 10.0024C11.9668 10.0008 11.9833 10 12 10H13.5C13.7761 10 14 10.2239 14 10.5C14 10.7761 13.7761 11 13.5 11H12C11.9833 11 11.9668 10.9992 11.9505 10.9976ZM8 10.5C8 9.67157 8.67157 9 9.5 9C10.3284 9 11 9.67157 11 10.5C11 11.3284 10.3284 12 9.5 12C8.67157 12 8 11.3284 8 10.5Z"
                  fill="currentColor"
                  fillRule="evenodd"
                  clipRule="evenodd"
                ></path>
              </svg>
            </Button>
          </div>
        </div>

        <div className="bg-white border rounded-md">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead className="w-[40px]">
                  <input type="checkbox" className="h-4 w-4 rounded border-gray-300" />
                </TableHead>
                <TableHead className="text-xs font-medium">Title</TableHead>
                <TableHead className="text-xs font-medium">SKU</TableHead>
                <TableHead className="text-xs font-medium">Reserved</TableHead>
                <TableHead className="text-xs font-medium">In stock</TableHead>
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {inventoryItems.map((item) => (
                <TableRow key={item.id} className="hover:bg-gray-50">
                  <TableCell>
                    <input type="checkbox" className="h-4 w-4 rounded border-gray-300" />
                  </TableCell>
                  <TableCell className="text-sm">{item.title}</TableCell>
                  <TableCell className="text-sm text-gray-500">{item.sku}</TableCell>
                  <TableCell className="text-sm text-gray-500">{item.reserved}</TableCell>
                  <TableCell className="text-sm text-gray-500">{item.inStock}</TableCell>
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
                        <DropdownMenuItem>Create reservation</DropdownMenuItem>
                        <DropdownMenuItem>Adjust quantity</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <div className="flex items-center justify-between border-t px-4 py-2">
            <div className="text-xs text-gray-500">1 — 8 of 21 results</div>
            <div className="flex items-center gap-2">
              <div className="text-xs text-gray-500">1 of 3 pages</div>
              <Button variant="outline" size="sm" disabled className="h-7 px-2 text-xs">
                Prev
              </Button>
              <Button variant="outline" size="sm" className="h-7 px-2 text-xs">
                Next
              </Button>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  )
}
