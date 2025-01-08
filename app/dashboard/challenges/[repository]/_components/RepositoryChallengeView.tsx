import { Button } from "@/components/ui/button";
import {Card, CardContent, CardTitle, CardDescription, CardHeader} from "@/components/ui/card";
import {readChallenges} from "@/lib/database/challenge";
import {Category} from "@prisma/client";
import Link from "next/link";
import {BookDashedIcon} from "lucide-react";
import {hasSolvedChallenge} from "@/lib/users";

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
    const categoryChallenges = (await Promise.all(
        categories.map(async(category) =>
            ({
                category: category,
                challenges: await Promise.all(
                    challenges.filter((challenge) => challenge.category === category)
                        .map(async(challenge) => ({
                            solved: (await hasSolvedChallenge(challenge.id))!,
                            challenge: challenge,
                        }))
                )
            }))))
        .filter(({challenges}) => challenges.length > 0)

    return (
        <div className={"flex flex-col gap-y-4"}>
            {categoryChallenges.map(({category, challenges}) => (
                <Card key={category}>
                    <CardHeader>
                        <CardTitle>{category}</CardTitle>
                        <CardDescription>{`${challenges.filter((challenge) => challenge.solved).length}/${challenges.length} Solved`}</CardDescription>
                    </CardHeader>
                    <CardContent className={"grid-view"}>
                        {
                            challenges.map(async (challenge) => {
                                return (
                                    <Button key={challenge.challenge.id} asChild variant={challenge.solved ? "outline" : "default"}>
                                        <Link href={`/dashboard/challenges/${repositoryId}/${challenge.challenge.id}`} className={challenge.solved ? "line-through" : undefined}>{challenge.challenge.name}</Link>
                                    </Button>
                                )
                            })
                        }
                    </CardContent>
                </Card>
            ))}
        </div>
    )
}