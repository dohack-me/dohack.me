import {Card, CardHeader, CardTitle} from "@/src/components/ui/card";
import React, {Suspense} from "react";
import AdminRepositoriesLoading from "@/src/app/dashboard/admin/@repositories/loading";
import {requireAdmin} from "@/src/lib/auth";

export default async function Layout({repositories}: {repositories: React.ReactNode}) {
    return await requireAdmin(async() => {
        return (
            <div className={"flex-grow padding small-column"}>
                <Card className={"flex flex-col"}>
                    <CardHeader className={"text-center"}>
                        <CardTitle>Admin Panel</CardTitle>
                    </CardHeader>
                </Card>
                <div className={"grow-col"}>
                    <Suspense fallback={<AdminRepositoriesLoading/>}>
                        {repositories}
                    </Suspense>
                </div>
            </div>
        )
    })
}