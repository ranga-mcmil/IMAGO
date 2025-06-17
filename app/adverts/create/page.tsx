import Link from "next/link"
import { ArrowLeft } from "lucide-react"

import { MainLayout } from "@/components/main-layout"
import { Button } from "@/components/ui/button"
import { AdvertCreateForm } from "@/components/advert-create-form"

export default function CreateAdvertPage() {
  return (
    <MainLayout>
      <div className="p-6">
        <div className="flex items-center gap-2 mb-6">
          <Link href="/adverts">
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h1 className="text-xl font-semibold text-maroon">Create Advert</h1>
        </div>

        <AdvertCreateForm />
      </div>
    </MainLayout>
  )
}