"use client"

import { useState } from "react"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export function CollectionForm() {
  const [visible, setVisible] = useState(true)

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>General Information</CardTitle>
          <CardDescription>Basic information about your collection</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input id="title" placeholder="Collection title" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="handle">Handle</Label>
            <Input id="handle" placeholder="collection-handle" />
            <p className="text-xs text-muted-foreground">
              The handle is used to create the collection URL. If not specified, it will be generated from the title.
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea id="description" placeholder="Collection description" className="min-h-[120px]" />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Visibility</CardTitle>
          <CardDescription>Control who can see your collection</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="visible-toggle">Visible</Label>
              <Switch id="visible-toggle" checked={visible} onCheckedChange={setVisible} />
            </div>
            <p className="text-sm text-muted-foreground">When checked, this collection will be visible to customers.</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="status">Status</Label>
            <Select defaultValue="draft">
              <SelectTrigger id="status">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="draft">Draft</SelectItem>
                <SelectItem value="published">Published</SelectItem>
                <SelectItem value="archived">Archived</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Products</CardTitle>
          <CardDescription>Add products to your collection</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="border border-dashed rounded-md p-6 flex flex-col items-center justify-center">
            <p className="text-sm text-muted-foreground mb-2">No products added yet</p>
            <p className="text-xs text-muted-foreground mb-4">Add products to your collection</p>
            <Select>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Add products" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="product1">Imago T-Shirt</SelectItem>
                <SelectItem value="product2">Imago Sweatshirt</SelectItem>
                <SelectItem value="product3">Imago Pants</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
