import {Card, CardDescription, CardFooter, CardHeader, CardTitle} from "@/src/components/ui/card"
import {Button} from "@/src/components/ui/button"
import Link from "next/link"
import DeleteDialogButton from "@/src/components/dialog/DeleteDialogButton"
import {deleteRepository, readRepositories} from "@/src/lib/database/repositories"
import React from "react"

export default async function RepositoriesView() {
    const repositories = await readRepositories()

    if (repositories.length > 0) return (
        <div className={"grid-view"}>
            {
                repositories.map((repository) => (
                    <Card key={repository.id}>
                        <CardHeader>
                            <CardTitle><a href={repository.sourceLink}
                                          className={"underline"}>{(repository.visible ? repository.name : `${repository.name} | HIDDEN`)}</a></CardTitle>
                            <CardDescription><a href={repository.organizationLink}
                                                className={"underline"}>{`Created by: ${repository.organization}`}</a></CardDescription>
                        </CardHeader>
                        <CardFooter className={"grid grid-cols-2 gap-x-3"}>
                            <Button asChild>
                                <Link href={`/dashboard/admin/${repository.id}`}>Open</Link>
                            </Button>
                            <DeleteDialogButton
                                description={`This action cannot be undone. This will permanently delete "${repository.name}" and all associated challenges.`}
                                confirmation={"Successfully deleted repository."}
                                fail={"Could not delete repository. Please try again later"}
                                callback={async () => {
                                    "use server"
                                    try {
                                        await deleteRepository(repository.id)
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
    )
}