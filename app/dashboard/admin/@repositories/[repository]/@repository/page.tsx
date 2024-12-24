import {readRepository} from "@/lib/database/repository";
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import React from "react";
import CreateChallengeForm from "@/app/dashboard/admin/@repositories/[repository]/@repository/form";
import {deleteChallenge, readChallenges} from "@/lib/database/challenge";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs"
import {Category} from "@prisma/client";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import {Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger} from "@/components/ui/dialog";
import {ChevronLeftIcon} from "lucide-react";
import EditRepositoryForm from "@/app/dashboard/admin/@repositories/[repository]/@repository/details-form";
import {DeleteButton} from "@/components/DeleteButton";

export default async function AdminRepositoryOverviewPage({ params }: { params: Promise<{ repository: string }>}) {
    const repositoryId = (await params).repository
    const repository = await readRepository(repositoryId)
    const challenges = (await readChallenges()).filter((challenge) => challenge.repository.id === repositoryId)
    const categories = Object.keys(Category)

    return (
        <div className={"h-full w-full flex flex-col gap-y-4"}>
            <Card>
                <CardHeader className={"flex flex-row justify-between"}>
                    <div className={"flex flex-col gap-y-1.5"}>
                        <CardTitle>Viewing Repository: <a href={repository.sourceLink} className={"underline"}>{repository.name}</a></CardTitle>
                        <CardDescription>Created by: <a href={repository.organizationLink} className={"underline"}>{repository.organization}</a></CardDescription>
                    </div>
                    <Button asChild>
                        <Link href={`/dashboard/admin`}>
                            <ChevronLeftIcon/>
                            <p className={"hidden lg:block"}>Back to Repositories</p>
                            <p className={"hidden sm:block lg:hidden"}>Back</p>
                        </Link>
                    </Button>
                </CardHeader>
            </Card>
            <EditRepositoryForm repository={repository}/>
            <Card>
                <CardHeader className={"flex flex-row justify-between"}>
                    <div className={"flex flex-col gap-y-1.5"}>
                        <CardTitle>Challenges</CardTitle>
                        <CardDescription>
                            Challenges make up the bulk of repositories, where users must solve puzzles for an
                            answer to submit.
                        </CardDescription>
                    </div>
                    <CreateChallengeForm repository={repository} />
                </CardHeader>
                <CardContent>
                    <Tabs defaultValue={categories[0]}>
                        <TabsList>
                            {categories.map((category) => (
                                <TabsTrigger key={category} value={category}>{category}</TabsTrigger>
                            ))}
                        </TabsList>
                        {categories.map((category) => (
                            <TabsContent key={category} value={category}>
                                <div className={"grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-y-8 gap-x-8"}>
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
                                                            <DeleteButton callback={async() => {
                                                                'use server'
                                                                await deleteChallenge(challenge.id)
                                                            }}/>
                                                            <DialogClose asChild>
                                                                <Button >Close</Button>
                                                            </DialogClose>
                                                        </DialogFooter>
                                                    </DialogContent>
                                                </Dialog>
                                            </CardFooter>
                                        </Card>
                                    ))}
                                </div>
                            </TabsContent>
                        ))}
                    </Tabs>
                </CardContent>
            </Card>
        </div>
    )
}