"use client"

import { Plus } from "lucide-react"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"

export function ProductAttributesForm() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Dimensions</CardTitle>
          <CardDescription>Specify the physical dimensions of your product</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-4 gap-4">
            <div className="space-y-2">
              <Label htmlFor="height">Height</Label>
              <Input id="height" type="number" placeholder="0" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="width">Width</Label>
              <Input id="width" type="number" placeholder="0" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="length">Length</Label>
              <Input id="length" type="number" placeholder="0" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="weight">Weight</Label>
              <Input id="weight" type="number" placeholder="0" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Custom Attributes</CardTitle>
          <CardDescription>Add custom attributes to your product</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="attr-key-1">Key</Label>
                <Input id="attr-key-1" placeholder="Material" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="attr-value-1">Value</Label>
                <Input id="attr-value-1" placeholder="Cotton" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="attr-key-2">Key</Label>
                <Input id="attr-key-2" placeholder="Origin" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="attr-value-2">Value</Label>
                <Input id="attr-value-2" placeholder="Italy" />
              </div>
            </div>
          </div>
          <Button variant="outline">
            <Plus className="h-4 w-4 mr-1" /> Add attribute
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Shipping</CardTitle>
          <CardDescription>Configure shipping options</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="shipping-toggle">Requires shipping</Label>
              <Switch id="shipping-toggle" defaultChecked />
            </div>
            <p className="text-sm text-muted-foreground">When checked, shipping will be calculated for this product.</p>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="hs-code-toggle">HS Code</Label>
              <Input id="hs-code" placeholder="HS Code" className="w-1/2" />
            </div>
            <p className="text-sm text-muted-foreground">
              Harmonized System code used by customs to classify this product.
            </p>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="country-of-origin">Country of origin</Label>
              <Input id="country-of-origin" placeholder="Country" className="w-1/2" />
            </div>
            <p className="text-sm text-muted-foreground">
              The country where this product was manufactured or produced.
            </p>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="mid-code">MID Code</Label>
              <Input id="mid-code" placeholder="MID Code" className="w-1/2" />
            </div>
            <p className="text-sm text-muted-foreground">Manufacturer Identification Code used for customs purposes.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
