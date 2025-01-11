import {readUserSolves} from "@/lib/database/solves";
import {readChallenge} from "@/lib/database/challenge";
import {Category} from "@prisma/client";
import CategoriesChart from "@/app/dashboard/_components/CategoriesChart";

export default async function CategoriesChartView() {
    const solves = (await Promise.all(
        (await readUserSolves())!
            .map(async(solve) => ((await readChallenge(solve.challengeId))!.category))
            // assertion is fine here as the challengeId is taken from the db
    ))

    if (solves.length === 0) return (
        <div className={"flex-grow flex flex-col items-center justify-center"}>
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