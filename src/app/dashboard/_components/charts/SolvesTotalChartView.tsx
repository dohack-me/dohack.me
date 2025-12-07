import {readUserSolves} from "@/src/lib/database/solves"
import {readChallenges} from "@/src/lib/database/challenges"
import {Category} from "@/src/lib/prisma"
import SolvesTotalChart from "@/src/app/dashboard/_components/charts/SolvesTotalChart"
import {Empty, EmptyDescription, EmptyHeader, EmptyTitle} from "@/src/components/ui/empty";
import React from "react";

export default async function SolvesTotalChartView() {
    const solvedChallengeIds = (await readUserSolves())!.map(({challengeId}) => challengeId)

    if (solvedChallengeIds.length === 0) return (
        <Empty className={"border border-solid aspect-square"}>
            <EmptyHeader>
                <EmptyTitle>No solves</EmptyTitle>
                <EmptyDescription>Try a challenge!</EmptyDescription>
            </EmptyHeader>
        </Empty>
    )

    const totalChallenges = new Map<Category, number>
    const solvedChallenges = new Map<Category, number>

    for (const challenge of (await readChallenges()).filter((challenge) => challenge.visible)) {
        totalChallenges.set(challenge.category, (totalChallenges.get(challenge.category) || 0) + 1)
        if (solvedChallengeIds.includes(challenge.id)) {
            solvedChallenges.set(challenge.category, (solvedChallenges.get(challenge.category) || 0) + 1)
        }
    }

    const chartData = Array.from(totalChallenges).map(([category, count]) => ({
        category: category,
        percentage: Math.round(((solvedChallenges.get(category) || 0) / count) * 100),
    }))
    return (
        <SolvesTotalChart chartData={chartData}/>
    )
}