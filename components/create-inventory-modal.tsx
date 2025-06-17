"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function CreateInventoryModal({ onClose }: { onClose: () => void }) {
  const [activeTab, setActiveTab] = useState("details")

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center">
      <div className="bg-background rounded-lg shadow-lg w-full max-w-2xl max-h-[90vh] flex flex-col">
        <div className="flex items-center justify-between border-b p-4">
          <button
            onClick={onClose}
            className="rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
          >
            <svg
              width="15"
              height="15"
              viewBox="0 0 15 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
            >
              <path
                d="M11.7816 4.03157C12.0062 3.80702 12.0062 3.44295 11.7816 3.2184C11.5571 2.99385 11.193 2.99385 10.9685 3.2184L7.50005 6.68682L4.03164 3.2184C3.80708 2.99385 3.44301 2.99385 3.21846 3.2184C2.99391 3.44295 2.99391 3.80702 3.21846 4.03157L6.68688 7.49999L3.21846 10.9684C2.99391 11.193 2.99391 11.557 3.21846 11.7816C3.44301 12.0061 3.80708 12.0061 4.03164 11.7816L7.50005 8.31316L10.9685 11.7816C11.193 12.0061 11.5571 12.0061 11.7816 11.7816C12.0062 11.557 12.0062 11.193 11.7816 10.9684L8.31322 7.49999L11.7816 4.03157Z"
                fill="currentColor"
                fillRule="evenodd"
                clipRule="evenodd"
              ></path>
            </svg>
            <span className="sr-only">Close</span>
          </button>
          <div className="text-lg font-semibold text-maroon">Create Inventory Item</div>
          <div className="w-4"></div>
        </div>

        <div className="flex-1 overflow-auto">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <div className="border-b">
              <TabsList className="h-10 w-full justify-start rounded-none bg-transparent p-0">
                <TabsTrigger
                  value="details"
                  className="rounded-none border-b-2 border-transparent px-4 py-2 data-[state=active]:border-maroon data-[state=active]:text-maroon"
                >
                  Details
                </TabsTrigger>
                <TabsTrigger
                  value="availability"
                  className="rounded-none border-b-2 border-transparent px-4 py-2 data-[state=active]:border-maroon data-[state=active]:text-maroon"
                >
                  Availability
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="details" className="p-6 space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="title">Title</Label>
                  <Input id="title" placeholder="Title" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="sku">SKU</Label>
                  <Input id="sku" placeholder="sku-123" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">
                  Description <span className="text-muted-foreground">(Optional)</span>
                </Label>
                <Textarea id="description" placeholder="The item description" className="min-h-[100px]" />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="shipping-toggle">Requires shipping</Label>
                  <Switch id="shipping-toggle" />
                </div>
                <p className="text-sm text-muted-foreground">Does the inventory item require shipping?</p>
              </div>

              <div className="pt-4">
                <h3 className="text-lg font-medium mb-4">Attributes</h3>
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="width">
                      Width <span className="text-muted-foreground">(Optional)</span>
                    </Label>
                    <Input id="width" placeholder="100" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="length">
                      Length <span className="text-muted-foreground">(Optional)</span>
                    </Label>
                    <Input id="length" placeholder="100" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="height">
                      Height <span className="text-muted-foreground">(Optional)</span>
                    </Label>
                    <Input id="height" placeholder="100" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="weight">
                      Weight <span className="text-muted-foreground">(Optional)</span>
                    </Label>
                    <Input id="weight" placeholder="100" />
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="availability" className="p-6 space-y-6">
              <div className="space-y-2">
                <Label htmlFor="stock">Stock</Label>
                <Input id="stock" type="number" placeholder="0" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input id="location" placeholder="Select location" />
              </div>
            </TabsContent>
          </Tabs>
        </div>

        <div className="flex items-center justify-end gap-2 border-t p-4">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button className="bg-maroon hover:bg-maroon/90 text-white">Next</Button>
        </div>
      </div>
    </div>
  )
}
