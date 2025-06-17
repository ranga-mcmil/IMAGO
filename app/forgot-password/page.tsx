import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ForgotPasswordForm } from "@/components/forgot-password-form"
import Link from "next/link"

export default function ForgotPasswordPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md">
        <div className="flex justify-center mb-8">
          <img src="/images/imago-full-logo.jpg" alt="Imago Logo" className="h-12 object-contain" />
        </div>

        <Card className="border shadow-sm">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-semibold text-center">Reset password</CardTitle>
            <CardDescription className="text-center">
              Enter your email address and we'll send you a link to reset your password
            </CardDescription>
          </CardHeader>

          <ForgotPasswordForm />
        </Card>

        <div className="mt-4 text-center text-sm text-gray-500">
          Remember your password?{" "}
          <Link href="/sign-in" className="text-maroon hover:underline">
            Back to sign in
          </Link>
        </div>
      </div>
    </div>
  )
}
