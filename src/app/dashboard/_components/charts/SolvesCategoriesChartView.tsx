import {readUserSolves} from "@/src/lib/database/solves"
import {readChallenge} from "@/src/lib/database/challenges"
import {Category} from "@prisma/client"
import SolvesCategoriesChart from "@/src/app/dashboard/_components/charts/SolvesCategoriesChart"
import {Card, CardHeader} from "@/src/components/ui/card"

export default async function SolvesCategoriesChartView() {
    const solves = (await Promise.all(
        (await readUserSolves())!
            .map(async (solve) => ((await readChallenge(solve.challengeId))!.category)),
    ))

    if (solves.length === 0) return (
        <Card className={"aspect-square flex flex-col"}>
            <CardHeader className={"grow-col items-center justify-center"}>
                <p className={"text-3xl font-bold"}>No solves</p>
                <p className={"text-muted-foreground"}>Try a challenge!</p>
            </CardHeader>
        </Card>
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