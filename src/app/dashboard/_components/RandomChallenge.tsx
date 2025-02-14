import {Card, CardDescription, CardHeader, CardTitle} from "@/src/components/ui/card";
import {readUserSolves} from "@/src/lib/database/solves";
import {readRepository} from "@/src/lib/database/repositories";
import {Challenge} from "@/src/lib/database/challenges";
import Link from "next/link";
import {Button} from "@/src/components/ui/button";
import {SwordIcon} from "lucide-react";
import React from "react";
import {prisma} from "@/src/lib/globals";

export default async function RandomChallenge() {
    const userSolves = await readUserSolves()
    if (!userSolves) return null

    const challenges = await Promise.all((await prisma.challenge.findMany({
        where: {
            id: {
                notIn: (userSolves.map((solve) => (solve.challengeId)))
            }
        }
    })).map(async (result) => {
        return {
            id: result.id,
            name: result.name,
            description: result.description,
            category: result.category,
            answer: result.answer,
            authors: result.authors,

            createdAt: result.createdAt,
            updatedAt: result.updatedAt,

            repository: await readRepository(result.repositoryId),
        } as Challenge
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

    const challenge = challenges[Math.floor(Math.random() * challenges.length)];

    return (
        <Card>
            <CardHeader className={"header-with-button"}>
                <div className={"header-with-button-description"}>
                    <CardTitle>{challenge.name}</CardTitle>
                    <CardDescription>
                        {`${challenge.category} challenge in `}
                        <Link href={`/dashboard/challenges/${challenge.repository.id}`}
                              className={"underline"}>{challenge.repository.name}</Link>
                        {" by "}
                        <Link href={challenge.repository.organizationLink}
                              className={"underline"}>{challenge.repository.organization}</Link>
                    </CardDescription>
                </div>
                <Button asChild>
                    <Link href={`/dashboard/challenges/${challenge.repository.id}/${challenge.id}`}>
                        <SwordIcon/>
                        <p className={"hidden lg:block"}>Attempt Challenge</p>
                        <p className={"hidden sm:block lg:hidden"}>Go</p>
                    </Link>
                </Button>
            </CardHeader>
        </Card>
    )
}