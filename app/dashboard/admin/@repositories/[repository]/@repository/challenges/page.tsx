import {readRepository} from "@/lib/database/repository";
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import React from "react";
import {deleteChallenge, readChallenges} from "@/lib/database/challenge";
import {Button} from "@/components/ui/button";
import CreateChallengeForm from "@/app/dashboard/admin/@repositories/[repository]/@repository/challenges/form";
import {Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger} from "@/components/ui/dialog";

export default async function AdminRepositoryChallengesPage({ params }: { params: Promise<{ repository: string }>}) {
    const repositoryId = (await params).repository
    const repository = await readRepository(repositoryId)
    const challenges = (await readChallenges()).filter((challenge) => challenge.repository.id === repositoryId)

    return (
        <Card className={"h-full w-full"}>
            <CardHeader className={"flex flex-row justify-between"}>
                <div className={"flex flex-col gap-y-1.5"}>
                    <CardTitle>Challenges</CardTitle>
                    <CardDescription>Challenges make up the bulk of repositories, where users must solve puzzles for an
                        answer to submit.</CardDescription>
                </div>
                <CreateChallengeForm repository={repository} />
            </CardHeader>
            <CardContent>
                {challenges.map((challenge) => (
                    <Card key={challenge.id}>
                        <CardHeader>
                            <CardTitle>{challenge.name}</CardTitle>
                            <CardDescription>{`Authored by: ${challenge.authors.join(", ")}`}</CardDescription>
                        </CardHeader>
                        <CardFooter className={"grid grid-cols-2 gap-x-3"}>
                            <Button variant={"secondary"}>Edit</Button>
                            <Dialog>
                                <DialogTrigger asChild>
                                    <Button variant={"destructive"}>Delete</Button>
                                </DialogTrigger>
                                <DialogContent>
                                    <DialogHeader>
                                        <DialogTitle>Are you absolutely sure?</DialogTitle>
                                        <DialogDescription>{`This action cannot be undone. This will permanently delete "${challenge.name}".`}</DialogDescription>
                                    </DialogHeader>
                                    <DialogFooter>
                                        <form action={async () => {
                                            'use server' // required for nextjs to not throw an error bruh
                                            await deleteChallenge(challenge.id)
                                        }}>
                                            <DialogClose asChild>
                                                <Button variant={"destructive"} type={"submit"}>Delete</Button>
                                            </DialogClose>
                                        </form>
                                        <DialogClose asChild>
                                            <Button >Close</Button>
                                        </DialogClose>
                                    </DialogFooter>
                                </DialogContent>
                            </Dialog>
                        </CardFooter>
                    </Card>
                ))}
            </CardContent>
        </Card>
    )
}