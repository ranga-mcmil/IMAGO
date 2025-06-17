import Link from "next/link"
import { ArrowLeft, Mail, Phone, User, Shield } from "lucide-react"
import { MainLayout } from "@/components/main-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { getUserByEmailAction } from "@/actions/users"
import { notFound } from "next/navigation"

interface PageProps {
  params: Promise<{ email: string }>
}

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

export default async function UserDetailPage({ params }: PageProps) {
  const { email } = await params
  const decodedEmail = decodeURIComponent(email)

  try {
    const response = await getUserByEmailAction(decodedEmail)
    
    if (!response.success || !response.data) {
      notFound()
    }

    const user = response.data
    const roleDisplay = getRoleDisplay(user.role)

    return (
      <MainLayout>
        <div className="p-6">
          <div className="flex items-center gap-2 mb-6">
            <Link href="/users">
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </Link>
            <h1 className="text-xl font-semibold text-maroon">User Details</h1>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* User Profile Card */}
            <div className="lg:col-span-1">
              <Card>
                <CardHeader className="text-center">
                  <div className="flex justify-center mb-4">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-maroon text-white text-xl font-bold">
                      {getUserInitials(user.firstName, user.lastName, user.email)}
                    </div>
                  </div>
                  <CardTitle className="text-lg">
                    {getUserDisplayName(user.firstName, user.lastName, user.email)}
                  </CardTitle>
                  <div className="flex justify-center mt-2">
                    <Badge variant={roleDisplay.variant}>
                      {roleDisplay.label}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-3 text-sm">
                    <Mail className="h-4 w-4 text-gray-400" />
                    <span className="text-gray-600">{user.email}</span>
                  </div>
                  {user.phoneNumber && (
                    <div className="flex items-center gap-3 text-sm">
                      <Phone className="h-4 w-4 text-gray-400" />
                      <span className="text-gray-600">{user.phoneNumber}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-3 text-sm">
                    <User className="h-4 w-4 text-gray-400" />
                    <span className="text-gray-600">ID: {user.id}</span>
                  </div>
                  {user.shopId && (
                    <div className="flex items-center gap-3 text-sm">
                      <Shield className="h-4 w-4 text-gray-400" />
                      <span className="text-gray-600">Shop ID: {user.shopId}</span>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* User Information */}
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle>Personal Information</CardTitle>
                  <Link href={`/users/${encodeURIComponent(email)}/edit`}>
                    <Button size="sm" variant="outline">
                      Edit User
                    </Button>
                  </Link>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-gray-700">First Name</label>
                      <p className="mt-1 text-sm text-gray-900">
                        {user.firstName || "—"}
                      </p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700">Last Name</label>
                      <p className="mt-1 text-sm text-gray-900">
                        {user.lastName || "—"}
                      </p>
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">Email Address</label>
                    <p className="mt-1 text-sm text-gray-900">{user.email}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">Phone Number</label>
                    <p className="mt-1 text-sm text-gray-900">
                      {user.phoneNumber || "—"}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">Role</label>
                    <div className="mt-1">
                      <Badge variant={roleDisplay.variant}>
                        {roleDisplay.label}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Account Settings */}
              <Card>
                <CardHeader>
                  <CardTitle>Account Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-medium">Account Status</h4>
                      <p className="text-sm text-gray-600">User account is currently active</p>
                    </div>
                    <Badge variant="secondary">Active</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-medium">Password</h4>
                      <p className="text-sm text-gray-600">Last updated recently</p>
                    </div>
                    <Button size="sm" variant="outline">
                      Reset Password
                    </Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-medium">Account Actions</h4>
                      <p className="text-sm text-gray-600">Manage user account status</p>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        Suspend
                      </Button>
                      <Button size="sm" variant="destructive">
                        Deactivate
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </MainLayout>
    )
  } catch (error) {
    console.error('Error loading user:', error)
    return (
      <MainLayout>
        <div className="p-6">
          <div className="flex items-center gap-2 mb-6">
            <Link href="/users">
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </Link>
            <h1 className="text-xl font-semibold text-maroon">User Details</h1>
          </div>
          <div className="text-center text-red-600">
            Error loading user details. Please try again.
          </div>
        </div>
      </MainLayout>
    )
  }
}