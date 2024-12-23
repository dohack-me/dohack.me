import {readRepository} from "@/lib/database/repository";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import React from "react";

export default async function AdminRepositoryOverviewPage({ params }: { params: Promise<{ repository: string }>}) {
    const repositoryId = (await params).repository
    const repository = await readRepository(repositoryId)

    return (
        <Card className={"h-full w-full"}>
            <CardHeader>
                <CardTitle><a href={repository.sourceLink} className={"underline"}>{repository.name}</a></CardTitle>
                <CardDescription><a href={repository.organizationLink} className={"underline"}>{`Created by ${repository.organization}`}</a></CardDescription>
            </CardHeader>
            <CardContent>
                <p>Opened repository id {repositoryId}</p>
            </CardContent>
        </Card>
    )
}