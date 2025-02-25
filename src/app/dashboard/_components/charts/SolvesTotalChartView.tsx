import {readUserSolves} from "@/src/lib/database/solves"
import {readChallenges} from "@/src/lib/database/challenges"
import {Category} from "@prisma/client"
import SolvesTotalChart from "@/src/app/dashboard/_components/charts/SolvesTotalChart"
import {Card, CardHeader} from "@/src/components/ui/card"

export default async function SolvesTotalChartView() {
    const solvedChallengeIds = (await readUserSolves())!.map(({challengeId}) => challengeId)

    if (solvedChallengeIds.length === 0) return (
        <Card className={"aspect-square flex flex-col"}>
            <CardHeader className={"grow-col items-center justify-center"}>
                <p className={"text-3xl font-bold"}>No solves</p>
                <p className={"text-muted-foreground"}>Try a challenge!</p>
            </CardHeader>
        </Card>

    )

    const totalChallenges = new Map<Category, number>
    const solvedChallenges = new Map<Category, number>

    for (const challenge of (await readChallenges())) {
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