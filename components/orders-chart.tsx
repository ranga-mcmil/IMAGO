"use client"

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

const data = [
  { day: "Mon", orders: 45, completed: 40 },
  { day: "Tue", orders: 52, completed: 48 },
  { day: "Wed", orders: 38, completed: 35 },
  { day: "Thu", orders: 61, completed: 58 },
  { day: "Fri", orders: 73, completed: 70 },
  { day: "Sat", orders: 89, completed: 85 },
  { day: "Sun", orders: 67, completed: 62 },
]

export function OrdersChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Weekly Orders</CardTitle>
        <CardDescription>Orders received vs completed this week</CardDescription>
      </CardHeader>
      <CardContent className="p-6">
        <ChartContainer
          config={{
            orders: {
              label: "Orders",
              color: "hsl(var(--chart-1))",
            },
            completed: {
              label: "Completed",
              color: "hsl(var(--chart-2))",
            },
          }}
          className="h-[300px]"
        >
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <XAxis dataKey="day" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar dataKey="orders" fill="var(--color-orders)" radius={[4, 4, 0, 0]} />
              <Bar dataKey="completed" fill="var(--color-completed)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
