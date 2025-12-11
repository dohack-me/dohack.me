import React from "react"
import {getUserRole} from "@/src/lib/auth/users"
import {redirect} from "next/navigation"

export default async function Layout({repositories}: { repositories: React.ReactNode }) {
    const role = await getUserRole()
    if (!role || role !== "admin") {
        redirect("/dashboard")
    }

    return (
        <div className={"grow small-column"}>
            <div className={"grow-col"}>
                {repositories}
            </div>
        </div>
    )
}