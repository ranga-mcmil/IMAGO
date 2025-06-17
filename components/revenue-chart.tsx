"use client"

import { Line, LineChart, ResponsiveContainer, XAxis, YAxis } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

const data = [
  { month: "Jan", revenue: 4000, orders: 240 },
  { month: "Feb", revenue: 3000, orders: 139 },
  { month: "Mar", revenue: 2000, orders: 980 },
  { month: "Apr", revenue: 2780, orders: 390 },
  { month: "May", revenue: 1890, orders: 480 },
  { month: "Jun", revenue: 2390, orders: 380 },
  { month: "Jul", revenue: 3490, orders: 430 },
  { month: "Aug", revenue: 4000, orders: 240 },
  { month: "Sep", revenue: 3000, orders: 139 },
  { month: "Oct", revenue: 2000, orders: 980 },
  { month: "Nov", revenue: 2780, orders: 390 },
  { month: "Dec", revenue: 3890, orders: 480 },
]

export function RevenueChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Revenue Overview</CardTitle>
        <CardDescription>Monthly revenue and order trends</CardDescription>
      </CardHeader>
      <CardContent className="p-6">
        <ChartContainer
          config={{
            revenue: {
              label: "Revenue",
              color: "hsl(var(--chart-1))",
            },
          }}
          className="h-[300px]"
        >
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <XAxis dataKey="month" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `$${value}`}
              />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Line
                type="monotone"
                dataKey="revenue"
                strokeWidth={2}
                stroke="var(--color-revenue)"
                dot={{ fill: "var(--color-revenue)" }}
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
