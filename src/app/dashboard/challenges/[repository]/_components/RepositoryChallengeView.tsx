import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/src/components/ui/card"
import {readRepositoryChallenges} from "@/src/lib/database/challenges"
import {Category, Challenge, UserRole} from "@/src/lib/prisma"
import {BookDashedIcon} from "lucide-react"
import {hasSolvedChallenge} from "@/src/lib/users"
import {Button} from "@/src/components/ui/button"
import Link from "next/link"
import {getUserRole} from "@/src/lib/auth/users"

export default async function RepositoryChallengeView({repositoryId}: { repositoryId: string }) {
    const allChallenges = await readRepositoryChallenges(repositoryId)
    let challenges: Challenge[]
    if ((await getUserRole())! !== UserRole.ADMIN) {
        challenges = allChallenges.filter((challenge) => challenge.visible)
    } else {
        challenges = allChallenges.map((challenge) => ((challenge.visible ? challenge : {
            id: challenge.id,
            name: `${challenge.name} | HIDDEN`,
            description: challenge.description,
            category: challenge.category,
            answer: challenge.answer,
            authors: challenge.authors,
            visible: challenge.visible,

            createdAt: challenge.createdAt,
            updatedAt: challenge.updatedAt,

            repositoryId: repositoryId,
        } as Challenge)))
    }

    if (challenges.length <= 0) return (
        <div className={"grow small-column"}>
            <Card className={"grow-col"}>
                <CardHeader className={"grow flex items-center justify-center"}>
                    <BookDashedIcon/>
                    <CardHeader className={"p-0"}>There&apos;s nothing here...</CardHeader>
                    <CardDescription>Come back later!</CardDescription>
                </CardHeader>
            </Card>
        </div>
    )

    const categories = Object.keys(Category)
    const categoryChallenges = (await Promise.all(
        categories.map(async (category) => ({
            category: category,
            challenges: (await Promise.all(
                challenges
                    .filter((challenge) => challenge.category === category)
                    .map(async (challenge) => ({
                        solved: (await hasSolvedChallenge(challenge.id))!,
                        challenge: challenge,
                    })),
            ))
                .sort((a, b) => {
                    if (a.solved === b.solved) {
                        return a.challenge.name.localeCompare(b.challenge.name)
                    }
                    return a.solved ? 1 : -1
                }),
        })),
    ))
        .filter(({challenges}) => challenges.length > 0)

    return (
        <div className={"small-column"}>
            {categoryChallenges.map(({category, challenges}) => (
                <Card key={category}>
                    <CardHeader>
                        <CardTitle>{category}</CardTitle>
                        <CardDescription>{`${challenges.reduce(
                            (solves, solvedChallenge) => (
                                solves + (solvedChallenge.solved ? 1 : 0)
                            ), 0,
                        )}/${challenges.length} Solved`}</CardDescription>
                    </CardHeader>
                    <CardContent className={"grid-view"}>
                        {
                            challenges
                                .map(async ({solved, challenge}) => (
                                    <Button key={challenge.id} asChild variant={solved ? "outline" : "default"}>
                                        <Link href={`/dashboard/challenges/${repositoryId}/${challenge.id}`}
                                              className={solved ? "line-through" : undefined}>{challenge.name}</Link>
                                    </Button>
                                ))
                        }
                    </CardContent>
                </Card>
            ))}
        </div>
    )
}