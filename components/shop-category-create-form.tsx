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
import { createCategoryAction } from "@/actions/shops"
import { APIResponse } from "@/lib/http-service/apiClient"
import { CreateCategoryPayload, CreateCategoryResponse } from "@/lib/http-service/shops/types"

// Form state type that matches our API response
type ShopCategoryFormState = APIResponse<CreateCategoryResponse, CreateCategoryPayload> & {
  success?: boolean
  message?: string
}

// This component is used to get the pending state of the form submission
function SubmitButton() {
  const { pending } = useFormStatus()

  return (
    <Button size="sm" className="bg-maroon hover:bg-maroon/90 text-white" type="submit" disabled={pending}>
      {pending ? "Creating..." : "Create"}
    </Button>
  )
}

// Wrapper function to handle the real API call and return compatible state
async function handleCreateCategory(
  prevState: ShopCategoryFormState,
  formData: FormData
): Promise<ShopCategoryFormState> {
  try {
    const result = await createCategoryAction(null, formData)
    
    if (result.success) {
      return {
        ...result,
        success: true,
        message: "Shop category created successfully",
      }
    } else {
      return {
        ...result,
        success: false,
        message: result.error || "Failed to create shop category",
        errors: result.fieldErrors ? {
          name: result.fieldErrors.name || [],
          description: result.fieldErrors.description || [],
          icon: result.fieldErrors.icon || [],
        } : undefined,
      }
    }
  } catch (error) {
    console.error('Error creating category:', error)
    return {
      success: false,
      error: "An unexpected error occurred",
      message: "Failed to create shop category. Please try again.",
    }
  }
}

export function ShopCategoryCreateForm() {
  const router = useRouter()
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [iconFile, setIconFile] = useState<File | null>(null)
  const [iconPreview, setIconPreview] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const initialState: ShopCategoryFormState = { success: false }
  const [state, formAction] = useActionState(handleCreateCategory, initialState)

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value)
  }

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(e.target.value)
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      // Validate file type
      const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp']
      if (!validTypes.includes(file.type)) {
        alert('Please select a valid image file (JPEG, PNG, GIF, or WebP)')
        return
      }

      // Validate file size (5MB limit)
      if (file.size > 5 * 1024 * 1024) {
        alert('File size must be less than 5MB')
        return
      }

      setIconFile(file)
      const reader = new FileReader()
      reader.onload = () => {
        setIconPreview(reader.result as string)
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
                className={`mt-2 w-full ${state?.fieldErrors?.name ? "border-red-500" : ""}`}
                value={name}
                onChange={handleNameChange}
              />
              {state?.fieldErrors?.name && <p className="text-sm text-red-500 mt-1">{state.fieldErrors.name[0]}</p>}
            </div>

            <div>
              <Label htmlFor="description" className="text-base font-medium">
                Description
              </Label>
              <Textarea
                id="description"
                name="description"
                placeholder="Category description"
                className={`mt-2 min-h-[120px] w-full ${state?.fieldErrors?.description ? "border-red-500" : ""}`}
                value={description}
                onChange={handleDescriptionChange}
              />
              {state?.fieldErrors?.description && <p className="text-sm text-red-500 mt-1">{state.fieldErrors.description[0]}</p>}
            </div>

            <div>
              <Label className="text-base font-medium">Icon</Label>
              <input
                ref={fileInputRef}
                type="file"
                name="icon"
                accept="image/jpeg,image/png,image/gif,image/webp"
                className="hidden"
                onChange={handleFileChange}
              />
              {iconPreview ? (
                <div className="mt-2 border rounded-md p-4 flex items-center">
                  <div className="flex-shrink-0 mr-4">
                    <img
                      src={iconPreview}
                      alt="Icon preview"
                      className="w-24 h-24 object-cover rounded-md"
                    />
                  </div>
                  <div className="flex flex-col flex-grow">
                    <p className="text-sm text-gray-600 mb-2">Icon uploaded successfully</p>
                    <div className="text-xs text-gray-500 mb-2">
                      <p>{iconFile?.name}</p>
                      <p>{iconFile && (iconFile.size / 1024).toFixed(1)} KB</p>
                    </div>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      className="self-start"
                      onClick={handleUploadClick}
                    >
                      Change icon
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="border border-dashed rounded-md p-6 flex flex-col items-center justify-center mt-2 h-[150px]">
                  <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center mb-2">
                    <Upload className="h-5 w-5 text-gray-400" />
                  </div>
                  <p className="text-sm text-center text-muted-foreground">
                    Drag and drop an icon here, or click to browse
                  </p>
                  <p className="text-xs text-center text-muted-foreground mt-1">
                    JPEG, PNG, GIF, WebP - Max 5MB
                  </p>
                  <Button type="button" variant="outline" size="sm" className="mt-4" onClick={handleUploadClick}>
                    Upload icon
                  </Button>
                </div>
              )}
              {state?.fieldErrors?.icon && <p className="text-sm text-red-500 mt-1">{state.fieldErrors.icon[0]}</p>}
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