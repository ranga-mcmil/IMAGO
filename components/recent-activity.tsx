import { Clock, ShoppingCart, Package, Users, Store } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const activities = [
  {
    type: "order",
    message: "New order #1234 received",
    time: "2 minutes ago",
    icon: ShoppingCart,
    color: "text-blue-600",
  },
  {
    type: "product",
    message: "Product 'Imago Hoodie' updated",
    time: "15 minutes ago",
    icon: Package,
    color: "text-green-600",
  },
  {
    type: "customer",
    message: "New customer registered",
    time: "1 hour ago",
    icon: Users,
    color: "text-purple-600",
  },
  {
    type: "shop",
    message: "Shop 'Downtown Store' went live",
    time: "2 hours ago",
    icon: Store,
    color: "text-orange-600",
  },
  {
    type: "order",
    message: "Order #1230 completed",
    time: "3 hours ago",
    icon: ShoppingCart,
    color: "text-blue-600",
  },
]

export function RecentActivity() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
        <CardDescription>Latest updates across your platform</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {activities.map((activity, index) => (
          <div key={index} className="flex items-start gap-3">
            <div className={`p-2 rounded-lg bg-gray-100 ${activity.color}`}>
              <activity.icon className="h-4 w-4" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium">{activity.message}</p>
              <div className="flex items-center gap-1 mt-1">
                <Clock className="h-3 w-3 text-gray-400" />
                <span className="text-xs text-gray-500">{activity.time}</span>
              </div>
            </div>
          </div>
        ))}

        <div className="pt-4 border-t">
          <button className="text-sm text-maroon hover:text-maroon/80 font-medium">View all activity →</button>
        </div>
      </CardContent>
    </Card>
  )
}
