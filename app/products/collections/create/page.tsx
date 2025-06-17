import Link from "next/link"
import { ArrowLeft } from "lucide-react"

import { MainLayout } from "@/components/main-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CollectionForm } from "@/components/collection-form"

export default function CreateCollectionPage() {
  return (
    <MainLayout>
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Link href="/products/collections">
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </Link>
            <h1 className="text-xl font-semibold text-maroon">Create Collection</h1>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              Save as draft
            </Button>
            <Button size="sm" className="bg-maroon hover:bg-maroon/90 text-white">
              Publish collection
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-6">
          <div className="col-span-2">
            <CollectionForm />
          </div>
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Collection Details</CardTitle>
                <CardDescription>Information about your collection</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm font-medium">Status</span>
                  <span className="text-sm text-muted-foreground">Draft</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm font-medium">Visibility</span>
                  <span className="text-sm text-muted-foreground">Public</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm font-medium">Created</span>
                  <span className="text-sm text-muted-foreground">-</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm font-medium">Last updated</span>
                  <span className="text-sm text-muted-foreground">-</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Thumbnail</CardTitle>
                <CardDescription>Collection thumbnail image</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="border border-dashed rounded-md p-6 flex items-center justify-center">
                  <Button variant="ghost" className="flex flex-col h-full w-full">
                    <span className="text-xs">Upload thumbnail</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </MainLayout>
  )
}
