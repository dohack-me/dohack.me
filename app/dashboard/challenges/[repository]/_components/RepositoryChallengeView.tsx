import { Button } from "@/components/ui/button";
import {Card, CardContent, CardDescription, CardHeader} from "@/components/ui/card";
import {readChallenges} from "@/lib/database/challenge";
import {Category} from "@prisma/client";
import Link from "next/link";
import {BookDashedIcon} from "lucide-react";

export default async function RepositoryChallengeView({repositoryId}: {repositoryId: string}) {
    const challenges = (await readChallenges()).filter((challenge) => challenge.repository.id === repositoryId);

    if (challenges.length <= 0) return (
        <div className={"flex-grow flex flex-col gap-y-4"}>
            <Card className={"flex-grow flex flex-col"}>
                <CardHeader className={"flex-grow flex items-center justify-center"}>
                    <BookDashedIcon/>
                    <CardHeader className={"p-0"}>There&apos;s nothing here...</CardHeader>
                    <CardDescription>Come back later!</CardDescription>
                </CardHeader>
            </Card>
        </div>
    )

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