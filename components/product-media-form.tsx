"use client"

import { useState } from "react"
import { Upload, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export function ProductMediaForm() {
  const [images, setImages] = useState([
    { id: 1, url: "/diverse-products-still-life.png" },
    { id: 2, url: "/diverse-products-still-life.png" },
  ])

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Images</CardTitle>
          <CardDescription>Upload images of your product</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-4 gap-4">
            {images.map((image) => (
              <div key={image.id} className="relative group">
                <img
                  src={image.url || "/placeholder.svg"}
                  alt="Product"
                  className="w-full aspect-square object-cover rounded-md border"
                />
                <Button
                  variant="destructive"
                  size="icon"
                  className="absolute top-2 right-2 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={() => setImages(images.filter((img) => img.id !== image.id))}
                >
                  <X className="h-3 w-3" />
                </Button>
              </div>
            ))}
            <div className="border border-dashed rounded-md flex items-center justify-center aspect-square">
              <Button variant="ghost" className="flex flex-col h-full w-full">
                <Upload className="h-6 w-6 mb-2" />
                <span className="text-xs">Upload</span>
              </Button>
            </div>
          </div>
          <p className="text-xs text-muted-foreground">
            You can upload up to 10 images. The first image will be used as the thumbnail.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Thumbnail</CardTitle>
          <CardDescription>Select a thumbnail for your product</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-6 gap-4">
            {images.map((image) => (
              <div key={image.id} className="relative">
                <img
                  src={image.url || "/placeholder.svg"}
                  alt="Product"
                  className="w-full aspect-square object-cover rounded-md border cursor-pointer hover:border-maroon"
                />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
