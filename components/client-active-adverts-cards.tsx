"use client"

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, DollarSign, ShoppingBag, ExternalLink } from "lucide-react"
import { ActiveAdvert } from "@/lib/http-service/adverts/types"
import Image from "next/image"

interface ClientActiveAdvertsCardsProps {
  activeAdverts: ActiveAdvert[]
}

export function ClientActiveAdvertsCards({ activeAdverts }: ClientActiveAdvertsCardsProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString()
  }

  const calculateDiscountedPrice = (price: number, discount: number) => {
    return price - (price * discount / 100)
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {activeAdverts.map((advert) => (
        <Card key={advert.id} className="overflow-hidden hover:shadow-md transition-shadow">
          <CardHeader className="p-4">
            <div className="aspect-square relative bg-gray-100 rounded-md overflow-hidden">
              {advert.productImageUrl ? (
                <Image
                  src={`${advert.baseUrl}${advert.productImageUrl}`}
                  alt={advert.productName}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                />
              ) : (
                <div className="flex items-center justify-center h-full">
                  <ShoppingBag className="h-8 w-8 text-gray-400" />
                </div>
              )}
              <Badge className="absolute top-2 right-2 bg-green-500 text-white">
                Active
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="p-4 pt-0 space-y-3">
            <div>
              <h3 className="font-medium text-sm line-clamp-2">{advert.productName}</h3>
              <p className="text-xs text-gray-500 mt-1">{advert.shopName}</p>
            </div>
            
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-1">
                <DollarSign className="h-3 w-3 text-gray-400" />
                <div className="text-sm">
                  {advert.productDiscount > 0 ? (
                    <div className="flex flex-col">
                      <span className="font-medium">
                        {formatPrice(calculateDiscountedPrice(advert.productPrice, advert.productDiscount))}
                      </span>
                      <span className="text-xs text-gray-500 line-through">
                        {formatPrice(advert.productPrice)}
                      </span>
                    </div>
                  ) : (
                    <span className="font-medium">{formatPrice(advert.productPrice)}</span>
                  )}
                </div>
              </div>
              {advert.productDiscount > 0 && (
                <Badge variant="secondary" className="bg-red-100 text-red-800">
                  -{advert.productDiscount}%
                </Badge>
              )}
            </div>

            <div className="flex items-center gap-1 text-xs text-gray-500">
              <Calendar className="h-3 w-3" />
              <span>Active since {formatDate(advert.createdAt)}</span>
            </div>

            <Button
              size="sm"
              variant="outline"
              className="w-full text-xs"
              onClick={() => {
                // Navigate to product detail page or external link
                window.open(`/products/${advert.productId}`, '_blank')
              }}
            >
              <ExternalLink className="h-3 w-3 mr-1" />
              View Product
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}