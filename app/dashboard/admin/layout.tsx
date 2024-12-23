import {Card, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import React, {Suspense} from "react";
import AdminRepositoriesLoading from "@/app/dashboard/admin/@repositories/loading";
import {isAdmin} from "@/lib/auth";
import {redirect} from "next/navigation";

export default async function Layout({ repositories }: { repositories: React.ReactNode }) {
    if (!await isAdmin()) {
        redirect("/dashboard");
    }

    return (
        <div className={"h-full flex flex-col py-4 px-8 gap-y-4"}>
            <Card className={"flex flex-col"}>
                <CardHeader>
                    <CardTitle>Admin Panel</CardTitle>
                    <CardDescription>yippee</CardDescription>
                </CardHeader>
            </Card>
            <div className={"flex-1 h-full"}>
                <Suspense fallback={<AdminRepositoriesLoading/>}>
                    {repositories}
                </Suspense>
            </div>
        </div>
    )
}