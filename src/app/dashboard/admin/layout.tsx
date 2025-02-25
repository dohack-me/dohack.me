import {Card, CardHeader, CardTitle} from "@/src/components/ui/card";
import React, {Suspense} from "react";
import AdminRepositoriesLoading from "@/src/app/dashboard/admin/@repositories/loading";
import {getUserRole} from "@/src/lib/auth/users";
import {UserRole} from "@prisma/client";
import {redirect} from "next/navigation";

export default async function Layout({repositories}: { repositories: React.ReactNode }) {
    const role = await getUserRole()
    if (!role || role != UserRole.ADMIN) {
        redirect("/dashboard")
    }

    return (
        <div className={"grow padding small-column"}>
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
}