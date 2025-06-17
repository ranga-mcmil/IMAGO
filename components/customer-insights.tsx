import { UserPlus, UserCheck, TrendingUp } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const insights = [
  {
    title: "New Customers",
    value: "234",
    change: "+12%",
    icon: UserPlus,
    color: "text-blue-600",
  },
  {
    title: "Returning Customers",
    value: "1,195",
    change: "+8%",
    icon: UserCheck,
    color: "text-green-600",
  },
  {
    title: "Customer Retention",
    value: "84%",
    change: "+2%",
    icon: TrendingUp,
    color: "text-purple-600",
  },
]

export function CustomerInsights() {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Customer Insights</CardTitle>
        <CardDescription>Customer metrics and trends</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4 h-[300px] flex flex-col justify-between h-[300px] p-6">
        <div className="space-y-4">
          {insights.map((insight, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg bg-white ${insight.color}`}>
                  <insight.icon className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-sm font-medium">{insight.title}</p>
                  <p className="text-xs text-gray-500">{insight.change} from last month</p>
                </div>
              </div>
              <div className="text-lg font-bold">{insight.value}</div>
            </div>
          ))}
        </div>

        <div className="pt-4 border-t mt-auto">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">Total Customers</span>
            <span className="font-semibold">1,429</span>
          </div>
          <div className="flex items-center justify-between text-sm mt-2">
            <span className="text-gray-600">Avg. Lifetime Value</span>
            <span className="font-semibold">$342.50</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
