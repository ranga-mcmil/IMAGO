"use client"

import type React from "react"
import { useState, useRef } from "react"
import { useActionState } from "react"
import { useFormStatus } from "react-dom"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Upload, CheckCircle2, AlertCircle } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { createShopCategory, type ShopCategoryFormState } from "@/app/actions/shop-categories"

// This component is used to get the pending state of the form submission
function SubmitButton() {
  const { pending } = useFormStatus()

  return (
    <Button size="sm" className="bg-maroon hover:bg-maroon/90 text-white" type="submit" disabled={pending}>
      {pending ? "Creating..." : "Create"}
    </Button>
  )
}

export function ShopCategoryCreateForm() {
  const router = useRouter()
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null)
  const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const initialState: ShopCategoryFormState = {}
  const [state, formAction] = useActionState(createShopCategory, initialState)

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value)
  }

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(e.target.value)
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setThumbnailFile(file)
      const reader = new FileReader()
      reader.onload = () => {
        setThumbnailPreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleUploadClick = (e: React.MouseEvent) => {
    e.preventDefault() // Prevent any form submission
    fileInputRef.current?.click()
  }

  // Redirect to categories page after successful creation
  if (state?.success) {
    setTimeout(() => {
      router.push("/shops/categories")
    }, 2000)
  }

  return (
    <Card className="border rounded-md overflow-hidden">
      {state?.success ? (
        <div className="p-6 flex flex-col items-center justify-center text-center">
          <div className="rounded-full bg-green-50 p-3 mb-4">
            <CheckCircle2 className="h-6 w-6 text-green-600" />
          </div>
          <h3 className="text-lg font-medium mb-2">Shop Category Created</h3>
          <p className="text-sm text-gray-500 mb-4">Your shop category has been created successfully.</p>
          <p className="text-xs text-gray-500">Redirecting to categories page...</p>
        </div>
      ) : (
        <form action={formAction}>
          <CardContent className="p-6 space-y-6">
            <div>
              <Label htmlFor="name" className="text-base font-medium">
                Name
              </Label>
              <Input
                id="name"
                name="name"
                placeholder="Category name"
                className={`mt-2 w-full ${state?.errors?.name ? "border-red-500" : ""}`}
                value={name}
                onChange={handleNameChange}
              />
              {state?.errors?.name && <p className="text-sm text-red-500 mt-1">{state.errors.name[0]}</p>}
            </div>

            <div>
              <Label htmlFor="description" className="text-base font-medium">
                Description
              </Label>
              <Textarea
                id="description"
                name="description"
                placeholder="Category description"
                className={`mt-2 min-h-[120px] w-full ${state?.errors?.description ? "border-red-500" : ""}`}
                value={description}
                onChange={handleDescriptionChange}
              />
              {state?.errors?.description && <p className="text-sm text-red-500 mt-1">{state.errors.description[0]}</p>}
            </div>

            <div>
              <Label className="text-base font-medium">Thumbnail</Label>
              <input
                ref={fileInputRef}
                type="file"
                name="thumbnail"
                accept="image/*"
                className="hidden"
                onChange={handleFileChange}
              />
              {thumbnailPreview ? (
                <div className="mt-2 border rounded-md p-4 flex items-center">
                  <div className="flex-shrink-0 mr-4">
                    <img
                      src={thumbnailPreview || "/placeholder.svg"}
                      alt="Thumbnail preview"
                      className="w-24 h-24 object-cover rounded-md"
                    />
                  </div>
                  <div className="flex flex-col flex-grow">
                    <p className="text-sm text-gray-600 mb-2">Image uploaded successfully</p>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      className="self-start"
                      onClick={handleUploadClick}
                    >
                      Change image
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="border border-dashed rounded-md p-6 flex flex-col items-center justify-center mt-2 h-[150px]">
                  <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center mb-2">
                    <Upload className="h-5 w-5 text-gray-400" />
                  </div>
                  <p className="text-sm text-center text-muted-foreground">
                    Drag and drop an image here, or click to browse
                  </p>
                  <Button type="button" variant="outline" size="sm" className="mt-4" onClick={handleUploadClick}>
                    Upload image
                  </Button>
                </div>
              )}
            </div>

            {state?.message && !state.success && (
              <div className="flex items-center gap-2 p-3 bg-red-50 text-red-700 rounded-md">
                <AlertCircle className="h-4 w-4" />
                <p className="text-sm">{state.message}</p>
              </div>
            )}
          </CardContent>

          <CardFooter className="border-t p-6 flex justify-end gap-2">
            <Link href="/shops/categories">
              <Button variant="outline" size="sm" type="button">
                Cancel
              </Button>
            </Link>
            <SubmitButton />
          </CardFooter>
        </form>
      )}
    </Card>
  )
}
