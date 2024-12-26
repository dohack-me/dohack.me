import React, { Suspense } from "react";
import RepositoriesView from "@/app/dashboard/admin/@repositories/_components/RepositoriesView";
import AdminRepositoriesLoading from "@/app/dashboard/admin/@repositories/loading";

export default async function AdminRepositoriesPage() {
    return (
        <div className={"flex-grow flex flex-col"}>
            <Suspense fallback={<AdminRepositoriesLoading/>}>
                <RepositoriesView/>
            </Suspense>
        </div>
    )
}