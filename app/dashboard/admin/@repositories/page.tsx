import React, {Suspense} from "react";
import RepositoriesView from "@/app/dashboard/admin/@repositories/_components/RepositoriesView";
import AdminRepositoriesLoading from "@/app/dashboard/admin/@repositories/loading";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import CreateRepositoryButton from "@/app/dashboard/admin/@repositories/_components/CreateRepositoryButton";

export default async function AdminRepositoriesPage() {
    return (
        <div className={"grow-col"}>
            <Card className={"grow-col"}>
                <CardHeader className={"flex flex-row justify-between"}>
                    <div className={"flex flex-col gap-y-1.5"}>
                        <CardTitle>Repositories</CardTitle>
                        <CardDescription>Repositories group multiple challenges together, and are usually under one organization.</CardDescription>
                    </div>
                    <CreateRepositoryButton/>
                </CardHeader>
                <CardContent className={"grow-col"}>
                    <Suspense fallback={<AdminRepositoriesLoading/>}>
                        <RepositoriesView/>
                    </Suspense>
                </CardContent>
            </Card>
        </div>
    )
}