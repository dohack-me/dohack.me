import RepositoryTitleView from "@/app/dashboard/challenges/[repository]/_components/RepositoryTitleView";
import {Suspense} from "react";
import RepositoryLoading from "@/app/dashboard/challenges/[repository]/loading";
import RepositoryChallengeView from "@/app/dashboard/challenges/[repository]/_components/RepositoryChallengeView";

export default async function RepositoryPage({ params }: { params: Promise<{ repository: string }> }) {
    const repositoryId = (await params).repository

    return (
        <div className={"flex-grow flex flex-col py-4 px-8 gap-y-4"}>
            <Suspense fallback={<RepositoryLoading/>}>
                <RepositoryTitleView repositoryId={repositoryId} />
            </Suspense>
            <Suspense fallback={<RepositoryLoading/>}>
                <RepositoryChallengeView repositoryId={repositoryId} />
            </Suspense>
        </div>
    )
}