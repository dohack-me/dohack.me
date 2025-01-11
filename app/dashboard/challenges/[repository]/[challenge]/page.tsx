import React, {Suspense} from "react";
import ChallengeLoading from "@/app/dashboard/challenges/[repository]/[challenge]/loading";
import ChallengeView from "@/app/dashboard/challenges/[repository]/[challenge]/_components/ChallengeView";

export default async function ChallengesPage({ params }: { params: Promise<{ repository: string, challenge: string }> }) {
    const repositoryId = (await params).repository
    const challengeId = (await params).challenge

    return (
        <div className={"grow-col padding gap-y-4"}>
            <Suspense fallback={<ChallengeLoading/>}>
                <ChallengeView repositoryId={repositoryId} challengeId={challengeId} />
            </Suspense>
        </div>
    )
}