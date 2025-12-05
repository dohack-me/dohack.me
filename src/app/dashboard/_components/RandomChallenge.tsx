import {Card, CardDescription, CardHeader, CardTitle} from "@/src/components/ui/card"
import {readUserSolves} from "@/src/lib/database/solves"
import {readRepository} from "@/src/lib/database/repositories"
import Link from "next/link"
import {Button} from "@/src/components/ui/button"
import {SwordIcon} from "lucide-react"
import React from "react"
import {prisma} from "@/src/lib/globals"
import PostHogButton from "@/src/components/PostHogButton"
import {Challenge} from "@/src/lib/prisma"

export default async function RandomChallenge() {
    const userSolves = await readUserSolves()
    if (!userSolves) return null

    const challenges = (await prisma.challenge.findMany({
        where: {
            id: {
                notIn: (userSolves.map((solve) => (solve.challengeId))),
            },
            visible: {
                equals: true,
            },
            repository: {
                visible: {
                    equals: true,
                },
            },
        },
    })) as Challenge[]

    if (challenges.length <= 0) return (
        <Card>
            <CardHeader className={"header-with-button"}>
                <div className={"header-with-button-description"}>
                    <CardTitle>You&apos;ve completed every single challenge!</CardTitle>
                    <CardDescription>Congratulations! New challenges will be released soon.</CardDescription>
                </div>
                <Button asChild>
                    <Link href={`/dashboard/challenges`}>
                        <SwordIcon/>
                        <p className={"hidden lg:block"}>View Challenges</p>
                        <p className={"hidden sm:block lg:hidden"}>Challenges</p>
                    </Link>
                </Button>
            </CardHeader>
        </Card>
    )

    const challenge = challenges[Math.floor(Math.random() * challenges.length)]
    const repository = await readRepository(challenge.repositoryId)

    return (
        <Card>
            <CardHeader className={"header-with-button"}>
                <div className={"header-with-button-description"}>
                    <CardTitle>{challenge.name}</CardTitle>
                    <CardDescription>
                        {`${challenge.category} challenge in `}
                        <Link href={`/dashboard/challenges/${repository.id}`}
                              className={"underline"}>{repository.name}</Link>
                        {" by "}
                        <Link href={repository.organizationLink}
                              className={"underline"}>{repository.organization}</Link>
                    </CardDescription>
                </div>
                <PostHogButton eventName={"Random challenge attempted"} properties={{
                    challenge: challenge,
                }}>
                    <Link href={`/dashboard/challenges/${repository.id}/${challenge.id}`}>
                        <SwordIcon/>
                        <p className={"hidden lg:block"}>Attempt Challenge</p>
                        <p className={"hidden sm:block lg:hidden"}>Go</p>
                    </Link>
                </PostHogButton>
            </CardHeader>
        </Card>
    )
}