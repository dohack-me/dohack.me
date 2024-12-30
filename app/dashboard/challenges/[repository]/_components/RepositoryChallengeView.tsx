import { Button } from "@/components/ui/button";
import {Card, CardContent, CardHeader} from "@/components/ui/card";
import {readChallenges} from "@/lib/database/challenge";
import {Category} from "@prisma/client";
import Link from "next/link";

export default async function RepositoryChallengeView({repositoryId}: {repositoryId: string}) {
    const challenges = (await readChallenges()).filter((challenge) => challenge.repository.id === repositoryId);
    const categories = Object.keys(Category)
    const categoryChallenges = categories.map((category) =>
            ({category: category, challenges: challenges.filter((challenge) => challenge.category === category)}))
        .filter(({challenges}) => challenges.length > 0)

    return (
        <div className={"flex flex-col gap-y-4"}>
            {categoryChallenges.map(({category, challenges}) => (
                <Card key={category}>
                    <CardHeader>{category}</CardHeader>
                    <CardContent className={"grid-view"}>
                        {
                            challenges.map((challenge) => (
                                <Button key={challenge.id} asChild variant={"outline"}>
                                    <Link href={`/dashboard/challenges/${repositoryId}/${challenge.id}`}>{challenge.name}</Link>
                                </Button>
                            ))
                        }
                    </CardContent>
                </Card>
            ))}
        </div>
    )
}