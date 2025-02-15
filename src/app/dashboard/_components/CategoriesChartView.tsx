import {readUserSolves} from "@/src/lib/database/solves";
import {readChallenge} from "@/src/lib/database/challenges";
import {Category} from "@prisma/client";
import CategoriesChart from "@/src/app/dashboard/_components/CategoriesChart";

export default async function CategoriesChartView() {
    const solves = (await Promise.all(
        (await readUserSolves())!
            .map(async(solve) => ((await readChallenge(solve.challengeId))!.category))
            // assertion is fine here as the challengeId is taken from the db
    ))

    if (solves.length === 0) return (
        <div className={"grow flex flex-col items-center justify-center"}>
            <p className={"text-3xl font-bold"}>No solves</p>
            <p className={"text-muted-foreground"}>Try a challenge!</p>
        </div>
    )

    const categoriesFrequency = new Map<Category, number>
    solves.forEach((solve) => {categoriesFrequency.set(solve, (categoriesFrequency.get(solve) || 0) + 1)})
    const chartData = Array.from(categoriesFrequency).map(([category, frequency]) => ({
        category: category,
        number: frequency,
        fill: `var(--color-${category})`,
    }))

    return (
        <CategoriesChart chartData={chartData}/>
    )
}