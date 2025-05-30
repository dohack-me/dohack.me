import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/src/components/ui/card"
import CreateChallengeButton from "@/src/app/dashboard/admin/@repositories/[repository]/@repository/_components/CreateChallengeButton"
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/src/components/ui/tabs"
import {Button} from "@/src/components/ui/button"
import Link from "next/link"
import DeleteDialogButton from "@/src/components/dialog/DeleteDialogButton"
import {deleteChallenge, readRepositoryChallenges} from "@/src/lib/database/challenges"
import React from "react"
import {Category} from "@prisma/client"

export default async function ChallengesView({repositoryId}: { repositoryId: string }) {
    const challenges = await readRepositoryChallenges(repositoryId)
    const categories = Object.keys(Category)

    return (
        <Card>
            <CardHeader className={"flex flex-row justify-between"}>
                <div className={"flex flex-col gap-y-1.5"}>
                    <CardTitle>Challenges</CardTitle>
                    <CardDescription>
                        Challenges make up the bulk of repositories, where users must solve puzzles for an
                        answer to submit
                    </CardDescription>
                </div>
                <CreateChallengeButton repositoryId={repositoryId}/>
            </CardHeader>
            <CardContent>
                <Tabs defaultValue={categories[0]} className={"small-column"}>
                    <TabsList className={"tabs-list grid-cols-6"}>
                        {categories.map((category) => (
                            <TabsTrigger key={category} value={category}>{category}</TabsTrigger>
                        ))}
                    </TabsList>
                    {categories.map((category) => (
                        <TabsContent key={category} value={category}>
                            <div className={"grid-view"}>
                                {challenges
                                    .filter((challenge) => challenge.category === category)
                                    .sort((a, b) => a.name.localeCompare(b.name))
                                    .map((challenge) => (
                                        <Card key={challenge.id} className={"flex flex-col justify-between"}>
                                            <CardHeader>
                                                <CardTitle>{(challenge.visible ? challenge.name : `${challenge.name} | HIDDEN`)}</CardTitle>
                                                <CardDescription>{`Authored by: ${challenge.authors.join(", ")}`}</CardDescription>
                                            </CardHeader>
                                            <CardFooter className={"grid grid-cols-2 gap-x-3"}>
                                                <Button asChild>
                                                    <Link
                                                        href={`/dashboard/admin/${repositoryId}/${challenge.id}`}>Open</Link>
                                                </Button>
                                                <DeleteDialogButton
                                                    description={`This action cannot be undone. This will permanently delete "${challenge.name}".`}
                                                    confirmation={"Successfully deleted challenge."}
                                                    fail={"Could not delete challenge. Please try again later."}
                                                    callback={async () => {
                                                        "use server"
                                                        return (await deleteChallenge(challenge.id)) != null
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