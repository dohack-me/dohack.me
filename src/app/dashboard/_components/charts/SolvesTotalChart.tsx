"use client"

import {type ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent} from "@/src/components/ui/chart";
import React, {useMemo} from "react";
import {Category} from "@prisma/client";
import {PolarAngleAxis, PolarGrid, PolarRadiusAxis, Radar, RadarChart} from "recharts";
import {Card, CardFooter, CardHeader} from "@/src/components/ui/card";

const chartConfig = {
    challenge: {
        color: "var(--chart-1)",
    },
    percentage: {
        label: "Percentage",
    }
} satisfies ChartConfig

export default function SolvesCategoriesChart({chartData}: { chartData: {category: Category, percentage: number}[] }) {
    const totalPercentage = useMemo(() => {
        return (chartData.reduce((acc, curr) => acc + curr.percentage, 0) / Object.values(Category).length).toFixed(1)
    }, [chartData])

    return (
        <Card className={"aspect-square flex flex-col"}>
            <CardHeader className={"grow-col"}>
                <ChartContainer config={chartConfig} className={"grow min-h-[1rem]"}>
                    <RadarChart data={chartData}>
                        <ChartTooltip cursor={false} content={<ChartTooltipContent/>} />
                        <PolarAngleAxis dataKey={"category"} />
                        <PolarRadiusAxis domain={[0, 100]} tick={false} axisLine={false}/>
                        <PolarGrid />
                        <Radar
                            dataKey={"percentage"}
                            fill={"var(--color-challenge)"}
                            fillOpacity={0.6}
                        />
                    </RadarChart>
                </ChartContainer>
            </CardHeader>
            <CardFooter className={"flex flex-col"}>
                <p className={"text-foreground text-3xl font-bold"}>{`${totalPercentage}%`}</p>
                <p className={"text-muted-foreground text-xs"}>Challenges Completed</p>
            </CardFooter>
        </Card>

    )
}