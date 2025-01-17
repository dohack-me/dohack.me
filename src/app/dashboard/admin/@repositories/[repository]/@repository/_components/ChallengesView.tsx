import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/src/components/ui/card";
import CreateChallengeButton from "@/src/app/dashboard/admin/@repositories/[repository]/@repository/_components/CreateChallengeButton";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/src/components/ui/tabs";
import {Button} from "@/src/components/ui/button";
import Link from "next/link";
import {DeleteDialogButton} from "@/src/components/DeleteDialogButton";
import {deleteChallenge, readChallenges} from "@/src/lib/database/challenges";
import React from "react";
import {readRepository} from "@/src/lib/database/repositories";
import {Category} from "@prisma/client";

export default async function ChallengesView({repositoryId}: {repositoryId: string}) {
    const repository = await readRepository(repositoryId)
    const allChallenges = await readChallenges()
    const challenges = allChallenges.filter((challenge) => challenge.repository.id === repositoryId)
    const categories = Object.keys(Category)

    return (
        <Card>
            <CardHeader className={"flex flex-row justify-between"}>
                <div className={"flex flex-col gap-y-1.5"}>
                    <CardTitle>Challenges</CardTitle>
                    <CardDescription>
                        Challenges make up the bulk of repositories, where users must solve puzzles for an
                        answer to submit.
                    </CardDescription>
                </div>
                <CreateChallengeButton repository={repository} />
            </CardHeader>
            <CardContent>
                <Tabs defaultValue={categories[0]}>
                    <TabsList className={"tabs-list grid-cols-6"}>
                        {categories.map((category) => (
                            <TabsTrigger key={category} value={category}>{category}</TabsTrigger>
                        ))}
                    </TabsList>
                    {categories.map((category) => (
                        <TabsContent key={category} value={category}>
                            <div className={"grid-view"}>
                                {challenges.filter((challenge) => challenge.category === category).map((challenge) => (
                                    <Card key={challenge.id}>
                                        <CardHeader>
                                            <CardTitle>{challenge.name}</CardTitle>
                                            <CardDescription>{`Authored by: ${challenge.authors.join(", ")}`}</CardDescription>
                                        </CardHeader>
                                        <CardContent>
                                            <CardDescription>{`Last Updated: ${challenge.updatedAt}`}</CardDescription>
                                            <CardDescription>{`Created At: ${challenge.createdAt}`}</CardDescription>
                                        </CardContent>
                                        <CardFooter className={"grid grid-cols-2 gap-x-3"}>
                                            <Button asChild>
                                                <Link href={`/dashboard/admin/${repository.id}/${challenge.id}`}>Open</Link>
                                            </Button>
                                            <DeleteDialogButton
                                                description={`This action cannot be undone. This will permanently delete "${challenge.name}".`}
                                                confirmation={"Successfully deleted challenge."}
                                                fail={"Could not delete challenge. Please try again later."}
                                                callback={async() => {
                                                    'use server'
                                                    try {
                                                        await deleteChallenge(challenge.id)
                                                        return true
                                                    } catch {
                                                        return false
                                                    }
                                                }}>
                                                <Button variant={"destructive"}>Delete</Button>
                                            </DeleteDialogButton>
                                        </CardFooter>
                                    </Card>
                                ))}
                            </div>
                        </TabsContent>
                    ))}
                </Tabs>
            </CardContent>
        </Card>
    )
}