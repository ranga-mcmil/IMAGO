"use client"

import type React from "react"
import { useState } from "react"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Upload } from "lucide-react"
import Link from "next/link"

export function CategoryCreateForm() {
  const [name, setName] = useState("")

  // Auto-generate handle from name
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newName = e.target.value
    setName(newName)
  }

  return (
    <Card className="border rounded-md overflow-hidden">
      <CardContent className="p-6 space-y-6">
        <div>
          <Label htmlFor="name" className="text-base font-medium">
            Name
          </Label>
          <Input
            id="name"
            placeholder="Category name"
            className="mt-2 w-full"
            value={name}
            onChange={handleNameChange}
          />
        </div>

        <div>
          <Label htmlFor="description" className="text-base font-medium">
            Description
          </Label>
          <Textarea id="description" placeholder="Category description" className="mt-2 min-h-[120px] w-full" />
        </div>

        <div>
          <Label className="text-base font-medium">Thumbnail</Label>
          <div className="border border-dashed rounded-md p-6 flex flex-col items-center justify-center mt-2 h-[200px]">
            <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center mb-2">
              <Upload className="h-5 w-5 text-gray-400" />
            </div>
            <p className="text-sm text-center text-muted-foreground">Drag and drop an image here, or click to browse</p>
            <Button variant="outline" size="sm" className="mt-4">
              Upload image
            </Button>
          </div>
        </div>
      </CardContent>

      <CardFooter className="border-t p-6 flex justify-end gap-2">
        <Link href="/products/categories">
          <Button variant="outline" size="sm">
            Cancel
          </Button>
        </Link>
        <Button size="sm" className="bg-maroon hover:bg-maroon/90 text-white">
          Create
        </Button>
      </CardFooter>
    </Card>
  )
}
