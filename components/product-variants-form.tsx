"use client"

import { useState } from "react"
import { Plus, Trash2 } from "lucide-react"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export function ProductVariantsForm() {
  const [options, setOptions] = useState([{ name: "Size", values: ["S", "M", "L", "XL"] }])
  const [variants, setVariants] = useState([
    { id: 1, options: { Size: "S" }, sku: "PROD-S", ean: "", barcode: "", inventory: 100, price: 29.99 },
    { id: 2, options: { Size: "M" }, sku: "PROD-M", ean: "", barcode: "", inventory: 100, price: 29.99 },
    { id: 3, options: { Size: "L" }, sku: "PROD-L", ean: "", barcode: "", inventory: 100, price: 29.99 },
    { id: 4, options: { Size: "XL" }, sku: "PROD-XL", ean: "", barcode: "", inventory: 100, price: 29.99 },
  ])

  const addOption = () => {
    setOptions([...options, { name: "", values: [""] }])
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Options</CardTitle>
          <CardDescription>Define the options for your product variants</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {options.map((option, index) => (
            <div key={index} className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="flex-1">
                  <Label htmlFor={`option-${index}`}>Option name</Label>
                  <Input id={`option-${index}`} value={option.name} placeholder="Size, Color, Material..." />
                </div>
                <Button
                  variant="outline"
                  size="icon"
                  className="mt-6"
                  onClick={() => {
                    const newOptions = [...options]
                    newOptions.splice(index, 1)
                    setOptions(newOptions)
                  }}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
              <div className="space-y-2">
                <Label>Option values</Label>
                <div className="flex flex-wrap gap-2">
                  {option.values.map((value, valueIndex) => (
                    <div key={valueIndex} className="flex items-center gap-1">
                      <Input
                        value={value}
                        className="w-24"
                        onChange={(e) => {
                          const newOptions = [...options]
                          newOptions[index].values[valueIndex] = e.target.value
                          setOptions(newOptions)
                        }}
                      />
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => {
                          const newOptions = [...options]
                          newOptions[index].values.splice(valueIndex, 1)
                          setOptions(newOptions)
                        }}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-9"
                    onClick={() => {
                      const newOptions = [...options]
                      newOptions[index].values.push("")
                      setOptions(newOptions)
                    }}
                  >
                    <Plus className="h-4 w-4 mr-1" /> Add value
                  </Button>
                </div>
              </div>
            </div>
          ))}
          <Button variant="outline" onClick={addOption}>
            <Plus className="h-4 w-4 mr-1" /> Add option
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Variants</CardTitle>
          <CardDescription>Manage your product variants</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Variant</TableHead>
                <TableHead>SKU</TableHead>
                <TableHead>EAN</TableHead>
                <TableHead>Barcode</TableHead>
                <TableHead>Inventory</TableHead>
                <TableHead>Price</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {variants.map((variant) => (
                <TableRow key={variant.id}>
                  <TableCell>
                    {Object.entries(variant.options)
                      .map(([key, value]) => `${value}`)
                      .join(" / ")}
                  </TableCell>
                  <TableCell>
                    <Input value={variant.sku} className="w-24" />
                  </TableCell>
                  <TableCell>
                    <Input value={variant.ean} className="w-24" />
                  </TableCell>
                  <TableCell>
                    <Input value={variant.barcode} className="w-24" />
                  </TableCell>
                  <TableCell>
                    <Input type="number" value={variant.inventory} className="w-20" />
                  </TableCell>
                  <TableCell>
                    <Input type="number" value={variant.price} className="w-20" />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
