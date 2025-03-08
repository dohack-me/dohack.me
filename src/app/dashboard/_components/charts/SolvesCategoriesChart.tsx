"use client"

import {Category} from "@prisma/client"
import {type ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent} from "@/src/components/ui/chart"
import {Label, Pie, PieChart} from "recharts"
import {useMemo} from "react"
import {Card} from "@/src/components/ui/card"

const chartConfig = {
    CRYPTO: {
        label: "CRYPTO",
        color: "var(--chart-1)",
    },
    FORENSICS: {
        label: "FORENSICS",
        color: "var(--chart-2)",
    },
    WEB: {
        label: "WEB",
        color: "var(--chart-3)",
    },
    REV: {
        label: "REV",
        color: "var(--chart-4)",
    },
    PWN: {
        label: "PWN",
        color: "var(--chart-5)",
    },
    MISC: {
        label: "MISC",
        color: "var(--chart-6)",
    },
} satisfies ChartConfig

export default function SolvesCategoriesChart({chartData}: {
    chartData: { category: Category, number: number, fill: string }[]
}) {
    const totalSolves = useMemo(() => {
        return chartData.reduce((acc, curr) => acc + curr.number, 0)
    }, [chartData])

    return (
        <Card className={"flex flex-col"}>
            <ChartContainer config={chartConfig} className={"grow min-h-[1rem]"}>
                <PieChart accessibilityLayer>
                    <ChartTooltip
                        content={<ChartTooltipContent/>}
                    />
                    <Pie data={chartData} dataKey={"number"} nameKey={"category"} innerRadius={"50%"}>
                        <Label
                            content={({viewBox}) => {
                                if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                                    return (
                                        <text x={viewBox.cx} y={viewBox.cy} textAnchor={"middle"}
                                              dominantBaseline={"middle"}>
                                            <tspan x={viewBox.cx} y={(viewBox.cy || 0) - 10}
                                                   className={"fill-foreground text-3xl font-bold"}>
                                                {totalSolves}
                                            </tspan>
                                            <tspan x={viewBox.cx} y={(viewBox.cy || 0) + 14}
                                                   className={"fill-muted-foreground"}>
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
        </Card>

    )
}