import Link from "next/link"
import { ArrowLeft } from "lucide-react"

import { MainLayout } from "@/components/main-layout"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ProductGeneralForm } from "@/components/product-general-form"
import { ProductVariantsForm } from "@/components/product-variants-form"
import { ProductMediaForm } from "@/components/product-media-form"
import { ProductAttributesForm } from "@/components/product-attributes-form"

export default function CreateProductPage() {
  return (
    <MainLayout>
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Link href="/products">
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </Link>
            <h1 className="text-xl font-semibold text-maroon">Create Product</h1>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              Save as draft
            </Button>
            <Button size="sm" className="bg-maroon hover:bg-maroon/90 text-white">
              Publish product
            </Button>
          </div>
        </div>

        <Tabs defaultValue="general" className="w-full">
          <TabsList className="w-full bg-white border-b rounded-none h-auto p-0 mb-6">
            <div className="flex overflow-x-auto">
              <TabsTrigger
                value="general"
                className="rounded-none border-b-2 border-transparent px-4 py-2 data-[state=active]:border-maroon data-[state=active]:text-maroon"
              >
                General
              </TabsTrigger>
              <TabsTrigger
                value="variants"
                className="rounded-none border-b-2 border-transparent px-4 py-2 data-[state=active]:border-maroon data-[state=active]:text-maroon"
              >
                Variants
              </TabsTrigger>
              <TabsTrigger
                value="attributes"
                className="rounded-none border-b-2 border-transparent px-4 py-2 data-[state=active]:border-maroon data-[state=active]:text-maroon"
              >
                Attributes
              </TabsTrigger>
              <TabsTrigger
                value="media"
                className="rounded-none border-b-2 border-transparent px-4 py-2 data-[state=active]:border-maroon data-[state=active]:text-maroon"
              >
                Media
              </TabsTrigger>
            </div>
          </TabsList>

          <TabsContent value="general" className="mt-0">
            <ProductGeneralForm />
          </TabsContent>

          <TabsContent value="variants" className="mt-0">
            <ProductVariantsForm />
          </TabsContent>

          <TabsContent value="attributes" className="mt-0">
            <ProductAttributesForm />
          </TabsContent>

          <TabsContent value="media" className="mt-0">
            <ProductMediaForm />
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  )
}
