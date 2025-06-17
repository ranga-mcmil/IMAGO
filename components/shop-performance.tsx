import { Store, TrendingUp, TrendingDown } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const shops = [
  {
    name: "Imago Flagship Store",
    revenue: "$12,450",
    orders: 156,
    trend: "up",
    change: "+15%",
  },
  {
    name: "Imago Online",
    revenue: "$18,230",
    orders: 234,
    trend: "up",
    change: "+22%",
  },
  {
    name: "Imago Mall Outlet",
    revenue: "$8,920",
    orders: 98,
    trend: "down",
    change: "-5%",
  },
  {
    name: "Imago Pop-up Shop",
    revenue: "$5,631",
    orders: 67,
    trend: "up",
    change: "+8%",
  },
]

export function ShopPerformance() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Shop Performance</CardTitle>
        <CardDescription>Revenue and orders by shop location</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {shops.map((shop, index) => (
          <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-maroon/10 rounded-lg">
                <Store className="h-4 w-4 text-maroon" />
              </div>
              <div>
                <p className="font-medium text-sm">{shop.name}</p>
                <p className="text-xs text-gray-500">{shop.orders} orders</p>
              </div>
            </div>
            <div className="text-right">
              <p className="font-semibold">{shop.revenue}</p>
              <div className="flex items-center gap-1">
                {shop.trend === "up" ? (
                  <TrendingUp className="h-3 w-3 text-green-600" />
                ) : (
                  <TrendingDown className="h-3 w-3 text-red-600" />
                )}
                <span className={`text-xs ${shop.trend === "up" ? "text-green-600" : "text-red-600"}`}>
                  {shop.change}
                </span>
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
