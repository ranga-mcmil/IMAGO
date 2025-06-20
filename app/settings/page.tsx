import { Suspense } from "react"
import { MainLayout } from "@/components/main-layout"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { CompanyInfoSection } from "@/components/company-info-section"
import { Bell, FileText, Activity } from "lucide-react"
import Link from "next/link"

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

function CompanyInfoSkeleton() {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Company Information</CardTitle>
          <Skeleton className="h-9 w-16" />
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4 py-3 border-b">
          <div className="text-sm font-medium">Company Name</div>
          <Skeleton className="h-5 w-32" />
        </div>
        <div className="grid grid-cols-2 gap-4 py-3 border-b">
          <div className="text-sm font-medium">Email</div>
          <Skeleton className="h-5 w-48" />
        </div>
        <div className="grid grid-cols-2 gap-4 py-3">
          <div className="text-sm font-medium">Phone Number</div>
          <Skeleton className="h-5 w-40" />
        </div>
      </CardContent>
    </Card>
  )
}

export default function SettingsPage() {
  return (
    <MainLayout>
      <div className="p-6 space-y-6">
        <div>
          <h1 className="text-xl font-semibold text-maroon">Settings</h1>
          <p className="text-xs text-gray-500 mt-1">Manage your store settings and company information</p>
        </div>

        {/* Company Information Section */}
        <Suspense fallback={<CompanyInfoSkeleton />}>
          <CompanyInfoSection />
        </Suspense>

        {/* Store Configuration */}
        <Card>
          <CardHeader>
            <CardTitle>Store Configuration</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4 py-3 border-b">
              <div className="text-sm font-medium">Default currency</div>
              <div className="text-sm">EUR · Euro</div>
            </div>

            <div className="grid grid-cols-2 gap-4 py-3 border-b">
              <div className="text-sm font-medium">Default region</div>
              <div className="text-sm text-gray-500">Not configured</div>
            </div>

            <div className="grid grid-cols-2 gap-4 py-3 border-b">
              <div className="text-sm font-medium">Default sales channel</div>
              <div className="text-sm">Default</div>
            </div>

            <div className="grid grid-cols-2 gap-4 py-3">
              <div className="text-sm font-medium">Default location</div>
              <div className="text-sm text-gray-500">Not configured</div>
            </div>
          </CardContent>
        </Card>

        {/* System Administration Section - NEW */}
        <Card>
          <CardHeader>
            <CardTitle>System Administration</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {/* Notification Logs */}
              <Link href="/notification-logs">
                <div className="p-4 border rounded-lg hover:bg-gray-50 transition-colors cursor-pointer group">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="flex h-10 w-10 items-center justify-center rounded bg-blue-100 group-hover:bg-blue-200 transition-colors">
                      <Bell className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-sm font-medium">Notification Logs</h3>
                      <p className="text-xs text-gray-500">Monitor delivery status</p>
                    </div>
                  </div>
                  <p className="text-xs text-gray-600">
                    View and manage notification delivery logs, troubleshoot failed notifications.
                  </p>
                </div>
              </Link>

              {/* System Logs - Placeholder for future */}
              <div className="p-4 border rounded-lg bg-gray-50 opacity-50">
                <div className="flex items-center gap-3 mb-2">
                  <div className="flex h-10 w-10 items-center justify-center rounded bg-gray-100">
                    <FileText className="h-5 w-5 text-gray-400" />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">System Logs</h3>
                    <p className="text-xs text-gray-400">Coming soon</p>
                  </div>
                </div>
                <p className="text-xs text-gray-500">
                  Application logs and system monitoring.
                </p>
              </div>

              {/* Performance Monitoring - Placeholder for future */}
              <div className="p-4 border rounded-lg bg-gray-50 opacity-50">
                <div className="flex items-center gap-3 mb-2">
                  <div className="flex h-10 w-10 items-center justify-center rounded bg-gray-100">
                    <Activity className="h-5 w-5 text-gray-400" />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Performance</h3>
                    <p className="text-xs text-gray-400">Coming soon</p>
                  </div>
                </div>
                <p className="text-xs text-gray-500">
                  System performance and health monitoring.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Currencies Section */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Currencies</CardTitle>
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
          </CardHeader>
          <CardContent>
            <div className="border rounded-md">
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
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  )
}