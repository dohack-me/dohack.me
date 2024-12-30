import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import CreateRepositoryButton from "@/app/dashboard/admin/@repositories/_components/CreateRepositoryButton";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import {Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger} from "@/components/ui/dialog";
import {DeleteButton} from "@/components/DeleteButton";
import {deleteRepository, readRepositories} from "@/lib/database/repository";
import React from "react";

export default async function RepositoriesView() {
    const repositories = await readRepositories()

    return (
        <Card>
            <CardHeader className={"flex flex-row justify-between"}>
                <div className={"flex flex-col gap-y-1.5"}>
                    <CardTitle>Repositories</CardTitle>
                    <CardDescription>Repositories group multiple challenges together, and are usually under one organization.</CardDescription>
                </div>
                <CreateRepositoryButton/>
            </CardHeader>
            <CardContent>
                <div className={"grid-view"}>
                    {repositories.map((repository) => (
                        <Card key={repository.id}>
                            <CardHeader>
                                <CardTitle><a href={repository.sourceLink} className={"underline"}>{repository.name}</a></CardTitle>
                                <CardDescription><a href={repository.organizationLink} className={"underline"}>{`Created by: ${repository.organization}`}</a></CardDescription>
                            </CardHeader>
                            <CardContent>
                                <CardDescription>{`Last Updated: ${repository.updatedAt}`}</CardDescription>
                                <CardDescription>{`Created At: ${repository.createdAt}`}</CardDescription>
                            </CardContent>
                            <CardFooter className={"grid grid-cols-2 gap-x-3"}>
                                <Button asChild>
                                    <Link href={`/dashboard/admin/${repository.id}`}>Open</Link>
                                </Button>
                                <Dialog>
                                    <DialogTrigger asChild>
                                        <Button variant={"destructive"}>Delete</Button>
                                    </DialogTrigger>
                                    <DialogContent>
                                        <DialogHeader>
                                            <DialogTitle>Are you absolutely sure?</DialogTitle>
                                            <DialogDescription>{`This action cannot be undone. This will permanently delete "${repository.name}" and all associated challenges.`}</DialogDescription>
                                        </DialogHeader>
                                        <DialogFooter>
                                            <DeleteButton callback={async() => {
                                                'use server'
                                                await deleteRepository(repository.id)
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
            </CardContent>
        </Card>
    )
}