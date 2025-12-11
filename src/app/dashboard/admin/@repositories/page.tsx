import React, {Suspense} from "react"
import RepositoriesView from "@/src/app/dashboard/admin/@repositories/_components/RepositoriesView"
import {Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle} from "@/src/components/ui/card"
import CreateRepositoryButton from "@/src/app/dashboard/admin/@repositories/_components/CreateRepositoryButton"
import {Skeleton} from "@/src/components/ui/skeleton";

export default async function AdminRepositoriesPage() {
    return (
        <Card className={"grow-col"}>
            <CardHeader>
                <CardTitle>Repositories</CardTitle>
                <CardDescription>Repositories group multiple challenges together, and are usually under one
                    organization</CardDescription>
                <CardAction>
                    <CreateRepositoryButton/>
                </CardAction>
            </CardHeader>
            <CardContent className={"grow-col"}>
                <Suspense fallback={<Skeleton className={"grow"}/>}>
                    <RepositoriesView/>
                </Suspense>
            </CardContent>
        </Card>
    )
}