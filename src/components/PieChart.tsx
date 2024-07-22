"use client"

import { TrendingUp } from "lucide-react"
import { Bar, BarChart, XAxis, YAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { Chart } from "@/app/(app)/dashboard/MyBank/[id]/page"
import { formatDateTime } from "@/lib/utils"
const chartData = [
  { month: "January", desktop: 186 },
  { month: "February", desktop: 305 },
  { month: "March", desktop: 237 },
  { month: "April", desktop: 73 },
  { month: "May", desktop: 209 },
  { month: "June", desktop: 214 },
]
interface props{
  chartData:Chart[]
}
const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig

export function Component({chartData}:props) {
  const date = new Date() ;
const newDate = formatDateTime(date)
  return (
    <Card className="w-full h-full" >
      <CardHeader>
        <CardTitle>Bank Accounts</CardTitle>
        <CardDescription>{newDate.dateOnly}</CardDescription>
      </CardHeader>
      <CardContent className="w-full h-full">
        <ChartContainer config={chartConfig}>
          <BarChart className="w-full h-full"
            accessibilityLayer
            data={chartData}
            layout="vertical"
            margin={{
              left: -20,
            }}
          >
            <XAxis type="number" dataKey="balance" hide  />
            <YAxis 
              dataKey="number"
              type="category"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="balance" fill="var(--color-desktop)" radius={5} />
          </BarChart>
        </ChartContainer>
      </CardContent>
      
    </Card>
  )
}
