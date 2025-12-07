import React, {Suspense} from "react"
import RepositoriesView from "@/src/app/dashboard/admin/@repositories/_components/RepositoriesView"
import AdminRepositoriesLoading from "@/src/app/dashboard/admin/@repositories/loading"
import {Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle} from "@/src/components/ui/card"
import CreateRepositoryButton from "@/src/app/dashboard/admin/@repositories/_components/CreateRepositoryButton"

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
                <Suspense fallback={<AdminRepositoriesLoading/>}>
                    <RepositoriesView/>
                </Suspense>
            </CardContent>
        </Card>
    )
}