import {Card, CardHeader, CardTitle} from "@/components/ui/card";
import React, {Suspense} from "react";
import AdminRepositoriesLoading from "@/app/dashboard/admin/@repositories/loading";
import {requireAdmin} from "@/lib/auth";

export default async function Layout({repositories}: {repositories: React.ReactNode}) {
    return await requireAdmin(async() => {
        return (
            <div className={"grow-col padding gap-y-4"}>
                <Card className={"flex flex-col"}>
                    <CardHeader className={"flex flex-col gap-y-2 text-center"}>
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