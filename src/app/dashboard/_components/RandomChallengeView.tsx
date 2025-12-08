import {Card, CardAction, CardDescription, CardHeader, CardTitle} from "@/src/components/ui/card"
import {readUserSolves} from "@/src/lib/database/solves"
import Link from "next/link"
import {Button} from "@/src/components/ui/button"
import {SwordIcon} from "lucide-react"
import React from "react"
import {prisma} from "@/src/lib/globals"
import {Challenge} from "@/src/lib/prisma"
import RandomChallenge from "@/src/app/dashboard/_components/RandomChallenge";

export default async function RandomChallengeView() {
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
            <CardHeader>
                <CardTitle>You&apos;ve completed every single challenge!</CardTitle>
                <CardDescription>Congratulations! New challenges will be released soon.</CardDescription>
                <CardAction>
                    <Button asChild>
                        <Link href={`/dashboard/challenges`}>
                            <SwordIcon/>
                            <p className={"hidden lg:block"}>View Challenges</p>
                            <p className={"hidden sm:block lg:hidden"}>Challenges</p>
                        </Link>
                    </Button>
                </CardAction>
            </CardHeader>
        </Card>
    )

    return (
        <RandomChallenge challenges={challenges}/>
    )
}