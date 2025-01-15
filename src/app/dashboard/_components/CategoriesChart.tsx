'use client'

import {Category} from "@prisma/client";
import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent
} from "@/src/components/ui/chart";

import { type ChartConfig } from "@/src/components/ui/chart"
import {Label, Pie, PieChart} from "recharts";
import {useMemo} from "react";

const chartConfig = {
    CRYPTO: {
        label: "CRYPTO",
        color: "hsl(var(--chart-1))",
    },
    FORENSICS: {
        label: "FORENSICS",
        color: "hsl(var(--chart-2))",
    },
    WEB: {
        label: "WEB",
        color: "hsl(var(--chart-3))",
    },
    REV: {
        label: "REV",
        color: "hsl(var(--chart-4))",
    },
    PWN: {
        label: "PWN",
        color: "hsl(var(--chart-5))",
    },
    MISC: {
        label: "MISC",
        color: "hsl(var(--chart-1))",
    }
} satisfies ChartConfig


export default function CategoriesChart({chartData}: { chartData: {category: Category, number: number, fill: string}[] }) {
    const totalSolves = useMemo(() => {
        return chartData.reduce((acc, curr) => acc + curr.number, 0)
    }, [chartData])
    
    return (
        <ChartContainer config={chartConfig} className={"flex-grow min-h-[1rem]"}>
            <PieChart accessibilityLayer>
                <ChartTooltip
                    content={<ChartTooltipContent/>}
                />
                <Pie data={chartData} dataKey={"number"} nameKey={"category"} innerRadius={"50%"}>
                    <Label
                        content={({ viewBox }) => {
                            if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                                return (
                                    <text x={viewBox.cx} y={viewBox.cy} textAnchor={"middle"} dominantBaseline={"middle"}>
                                        <tspan x={viewBox.cx} y={(viewBox.cy || 0) - 10} className={"fill-foreground text-3xl font-bold"}>
                                            {totalSolves}
                                        </tspan>
                                        <tspan x={viewBox.cx} y={(viewBox.cy || 0) + 14} className={"fill-muted-foreground"}>
                                            Total Solves
                                        </tspan>
                                    </text>
                                )
                            }
                        }}
                    />
                </Pie>
            </PieChart>
        </ChartContainer>
    )
}