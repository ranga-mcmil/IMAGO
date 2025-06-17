"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "sonner"

// Mock products data - replace with actual API call
const mockProducts = [
  { id: "1", name: "Sample Product 1" },
  { id: "2", name: "Sample Product 2" },
  { id: "3", name: "Sample Product 3" },
]

export function AdvertCreateForm() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    productId: "",
    durationDays: "",
    notes: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // TODO: Implement createAdvertAction when the API endpoint is available
      // const response = await createAdvertAction({
      //   productId: formData.productId,
      //   durationDays: parseInt(formData.durationDays),
      //   notes: formData.notes || undefined,
      // })

      // For now, simulate success
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      toast.success('Advert request created successfully')
      router.push('/adverts')
    } catch (error) {
      toast.error('Failed to create advert request')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  return (
    <form onSubmit={handleSubmit}>
      <Card className="max-w-2xl">
        <CardHeader>
          <CardTitle>Advert Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="productId">Product *</Label>
            <Select 
              value={formData.productId} 
              onValueChange={(value) => handleInputChange('productId', value)}
              required
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a product to advertise" />
              </SelectTrigger>
              <SelectContent>
                {mockProducts.map((product) => (
                  <SelectItem key={product.id} value={product.id}>
                    {product.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="durationDays">Duration (Days) *</Label>
            <Input
              id="durationDays"
              type="number"
              min="1"
              max="365"
              placeholder="Enter number of days (1-365)"
              value={formData.durationDays}
              onChange={(e) => handleInputChange('durationDays', e.target.value)}
              required
            />
            <p className="text-xs text-gray-500">
              Minimum 1 day, maximum 365 days
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Notes (Optional)</Label>
            <Textarea
              id="notes"
              placeholder="Additional notes or special requests for your advertisement..."
              value={formData.notes}
              onChange={(e) => handleInputChange('notes', e.target.value)}
              maxLength={500}
              rows={4}
            />
            <p className="text-xs text-gray-500">
              {formData.notes.length}/500 characters
            </p>
          </div>

          <div className="p-4 bg-blue-50 rounded-md">
            <h4 className="text-sm font-medium text-blue-900 mb-2">
              Advertising Process
            </h4>
            <ul className="text-xs text-blue-800 space-y-1">
              <li>• Your request will be reviewed by our team</li>
              <li>• Approval typically takes 1-2 business days</li>
              <li>• You'll be notified once your advert is approved and goes live</li>
              <li>• Active adverts will be displayed prominently on our platform</li>
            </ul>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between border-t px-6 py-4">
          <Button 
            type="button" 
            variant="outline" 
            onClick={() => router.back()}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button 
            type="submit" 
            className="bg-maroon hover:bg-maroon/90 text-white"
            disabled={isSubmitting || !formData.productId || !formData.durationDays}
          >
            {isSubmitting ? 'Creating...' : 'Create Advert Request'}
          </Button>
        </CardFooter>
      </Card>
    </form>
  )
}