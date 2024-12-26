import React, {Suspense} from "react";
import RepositoryTitleView
    from "@/app/dashboard/admin/@repositories/[repository]/@repository/_components/RepositoryTitleView";
import EditRepositoriesView
    from "@/app/dashboard/admin/@repositories/[repository]/@repository/_components/EditRepositoriesView";
import ChallengesView from "@/app/dashboard/admin/@repositories/[repository]/@repository/_components/ChallengesView";
import AdminRepositoryOverviewLoading from "@/app/dashboard/admin/@repositories/[repository]/@repository/loading";

export default async function AdminRepositoryOverviewPage({ params }: { params: Promise<{ repository: string }>}) {
    const repositoryId = (await params).repository

    return (
        <div className={"h-full w-full flex flex-col gap-y-4"}>
            <Suspense fallback={<AdminRepositoryOverviewLoading/>}>
                <RepositoryTitleView repositoryId={repositoryId} />
            </Suspense>
            <Suspense fallback={<AdminRepositoryOverviewLoading/>}>
                <EditRepositoriesView repositoryId={repositoryId}/>
            </Suspense>
            <Suspense fallback={<AdminRepositoryOverviewLoading/>}>
                <ChallengesView repositoryId={repositoryId}/>
            </Suspense>
        </div>
    )
}