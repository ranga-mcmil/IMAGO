import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { SignInForm } from "@/components/sign-in-form"

export default function SignInPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md">
        <div className="flex justify-center mb-8">
          <img src="/images/imago-full-logo.jpg" alt="Imago Logo" className="h-12 object-contain" />
        </div>

        <Card className="border shadow-sm">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-semibold text-center">Sign in</CardTitle>
            <CardDescription className="text-center">Enter your credentials to access your account</CardDescription>
          </CardHeader>

          <SignInForm />
        </Card>

        <div className="mt-4 text-center text-sm text-gray-500">
          Don't have an account?{" "}
          <a href="/sign-up" className="text-maroon hover:underline">
            Contact your administrator
          </a>
        </div>
      </div>
    </div>
  )
}
