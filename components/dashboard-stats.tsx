import { TrendingUp, TrendingDown, ShoppingCart, Users, Store, Package } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const stats = [
  {
    title: "Total Revenue",
    value: "$45,231.89",
    change: "+20.1%",
    trend: "up",
    icon: TrendingUp,
    description: "from last month",
  },
  {
    title: "Orders",
    value: "2,350",
    change: "+180.1%",
    trend: "up",
    icon: ShoppingCart,
    description: "from last month",
  },
  {
    title: "Active Shops",
    value: "12",
    change: "+19%",
    trend: "up",
    icon: Store,
    description: "from last month",
  },
  {
    title: "Products",
    value: "573",
    change: "+201",
    trend: "up",
    icon: Package,
    description: "new this month",
  },
  {
    title: "Customers",
    value: "1,429",
    change: "+12.5%",
    trend: "up",
    icon: Users,
    description: "from last month",
  },
  {
    title: "Avg. Order Value",
    value: "$89.32",
    change: "-2.1%",
    trend: "down",
    icon: TrendingDown,
    description: "from last month",
  },
]

export function DashboardStats() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {stats.map((stat, index) => (
        <Card key={index} className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">{stat.title}</CardTitle>
            <stat.icon className="h-4 w-4 text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
            <div className="flex items-center text-xs">
              <span className={`flex items-center ${stat.trend === "up" ? "text-green-600" : "text-red-600"}`}>
                {stat.trend === "up" ? (
                  <TrendingUp className="h-3 w-3 mr-1" />
                ) : (
                  <TrendingDown className="h-3 w-3 mr-1" />
                )}
                {stat.change}
              </span>
              <span className="text-gray-500 ml-1">{stat.description}</span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
