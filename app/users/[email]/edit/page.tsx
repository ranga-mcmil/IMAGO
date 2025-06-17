import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { MainLayout } from "@/components/main-layout"
import { Button } from "@/components/ui/button"
import { UserEditForm } from "@/components/user-edit-form"
import { getUserByEmailAction } from "@/actions/users"
import { notFound } from "next/navigation"

interface PageProps {
  params: Promise<{ email: string }>
}

export default async function EditUserPage({ params }: PageProps) {
  const { email } = await params
  const decodedEmail = decodeURIComponent(email)

  try {
    const response = await getUserByEmailAction(decodedEmail)
    
    if (!response.success || !response.data) {
      notFound()
    }

    const user = response.data

    return (
      <MainLayout>
        <div className="p-6">
          <div className="flex items-center gap-2 mb-6">
            <Link href={`/users/${encodeURIComponent(email)}`}>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </Link>
            <h1 className="text-xl font-semibold text-maroon">Edit User</h1>
          </div>

          <UserEditForm user={user} />
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
            <h1 className="text-xl font-semibold text-maroon">Edit User</h1>
          </div>
          <div className="text-center text-red-600">
            Error loading user details. Please try again.
          </div>
        </div>
      </MainLayout>
    )
  }
}