import {deleteRepository, readRepositories} from "@/lib/database/repository";
import {Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import {Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogClose} from "@/components/ui/dialog"
import CreateRepositoryForm from "@/app/dashboard/admin/@repositories/form";
import {DeleteButton} from "@/components/DeleteButton";
import React from "react";
import {isAdmin} from "@/lib/auth";
import {redirect} from "next/navigation";

export default async function AdminRepositoriesPage() {
    if (!await isAdmin()) {
        redirect("/dashboard");
    }

    const repositories = await readRepositories()

    if (!repositories) {
        redirect("/dashboard");
    }


    return (
        <Card className={"h-full"}>
            <CardHeader className={"flex flex-row justify-between"}>
                <div className={"flex flex-col gap-y-1.5"}>
                    <CardTitle>Repositories</CardTitle>
                    <CardDescription>Repositories group multiple challenges together, and are usually under one organization.</CardDescription>
                </div>
                <CreateRepositoryForm/>
            </CardHeader>
            <CardContent>
                <div className={"h-full w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-8 gap-x-8"}>
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