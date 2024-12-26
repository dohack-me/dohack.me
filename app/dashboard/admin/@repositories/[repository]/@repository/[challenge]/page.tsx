import React, {Suspense} from "react";
import ChallengeTitleView
    from "@/app/dashboard/admin/@repositories/[repository]/@repository/[challenge]/_components/ChallengeTitleView";
import EditChallengeView
    from "@/app/dashboard/admin/@repositories/[repository]/@repository/[challenge]/_components/EditChallengeView";
import ChallengeFilesView
    from "@/app/dashboard/admin/@repositories/[repository]/@repository/[challenge]/_components/ChallengeFilesView";
import AdminChallengeOverviewLoading
    from "@/app/dashboard/admin/@repositories/[repository]/@repository/[challenge]/loading";

export default async function AdminChallengeOverviewPage({ params }: { params: Promise<{ repository: string, challenge: string }>}) {
    const paramsObj = await params
    const repositoryId = paramsObj.repository
    const challengeId = paramsObj.challenge

    return (
        <div className={"h-full w-full flex flex-col gap-y-4"}>
            <Suspense fallback={<AdminChallengeOverviewLoading/>}>
                <ChallengeTitleView repositoryId={repositoryId} challengeId={challengeId}/>
            </Suspense>
            <Suspense fallback={<AdminChallengeOverviewLoading/>}>
                <EditChallengeView repositoryId={repositoryId} challengeId={challengeId}/>
            </Suspense>
            <Suspense fallback={<AdminChallengeOverviewLoading/>}>
                <ChallengeFilesView repositoryId={repositoryId} challengeId={challengeId}/>
            </Suspense>
        </div>
    )
}