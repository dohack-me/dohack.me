import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/src/components/ui/card";
import {Button} from "@/src/components/ui/button";
import Link from "next/link";
import {DeleteDialogButton} from "@/src/components/DeleteDialogButton";
import {deleteRepository, readRepositories} from "@/src/lib/database/repositories";
import React from "react";

export default async function RepositoriesView() {
    const repositories = await readRepositories()

    if (repositories.length > 0) return (
        <div className={"grid-view"}>
            {
                repositories.map((repository) => (
                    <Card key={repository.id}>
                        <CardHeader>
                            <CardTitle><a href={repository.sourceLink}
                                          className={"underline"}>{repository.name}</a></CardTitle>
                            <CardDescription><a href={repository.organizationLink}
                                                className={"underline"}>{`Created by: ${repository.organization}`}</a></CardDescription>
                        </CardHeader>
                        <CardContent>
                            <CardDescription>{`Last Updated: ${repository.updatedAt}`}</CardDescription>
                            <CardDescription>{`Created At: ${repository.createdAt}`}</CardDescription>
                        </CardContent>
                        <CardFooter className={"grid grid-cols-2 gap-x-3"}>
                            <Button asChild>
                                <Link href={`/dashboard/admin/${repository.id}`}>Open</Link>
                            </Button>
                            <DeleteDialogButton
                                description={`This action cannot be undone. This will permanently delete "${repository.name}" and all associated challenges.`}
                                confirmation={"Successfully deleted repository."}
                                callback={async () => {
                                    'use server'
                                    await deleteRepository(repository.id)
                                }}/>
                        </CardFooter>
                    </Card>
                ))}
        </div>
    )
}