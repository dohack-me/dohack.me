import React, {Suspense} from "react"
import AdminRepositoriesLoading from "@/src/app/dashboard/admin/@repositories/loading"
import {getUserRole} from "@/src/lib/auth/users"
import {redirect} from "next/navigation"

export default async function Layout({repositories}: { repositories: React.ReactNode }) {
    const role = await getUserRole()
    if (!role || role !== "admin") {
        redirect("/dashboard")
    }

    return (
        <div className={"grow padding small-column"}>
            <div className={"grow-col"}>
                <Suspense fallback={<AdminRepositoriesLoading/>}>
                    {repositories}
                </Suspense>
            </div>
        </div>
    )
}