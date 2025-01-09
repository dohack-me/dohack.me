import {readUserSolves} from "@/lib/database/solves";
import {readChallenge} from "@/lib/database/challenge";
import {Category} from "@prisma/client";
import CategoriesChart from "@/app/dashboard/_components/CategoriesChart";

export default async function CategoriesChartView() {
    const solves = (await Promise.all(
        (await readUserSolves())!
            .map(async(solve) => ((await readChallenge(solve.challengeId))!.category))
    ))
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