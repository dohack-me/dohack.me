import {readUserSolves} from "@/src/lib/database/solves"
import {readChallenge} from "@/src/lib/database/challenges"
import {Category} from "@/src/lib/prisma"
import SolvesCategoriesChart from "@/src/app/dashboard/_components/charts/SolvesCategoriesChart"
import {Empty, EmptyDescription, EmptyHeader, EmptyTitle} from "@/src/components/ui/empty";
import React from "react";

export default async function SolvesCategoriesChartView() {
    const solves = (await Promise.all(
        (await readUserSolves())!
            .map(async (solve) => ((await readChallenge(solve.challengeId))!.category)),
    ))

    if (solves.length === 0) return (
        <Empty className={"border border-solid aspect-square"}>
            <EmptyHeader>
                <EmptyTitle>No solves</EmptyTitle>
                <EmptyDescription>Try a challenge!</EmptyDescription>
            </EmptyHeader>
        </Empty>
    )

    const categoriesFrequency = new Map<Category, number>
    solves.forEach((solve) => {
        categoriesFrequency.set(solve, (categoriesFrequency.get(solve) || 0) + 1)
    })
    const chartData = Array.from(categoriesFrequency).map(([category, frequency]) => ({
        category: category,
        number: frequency,
        fill: `var(--color-${category})`,
    }))

    return (
        <SolvesCategoriesChart chartData={chartData}/>
    )
}