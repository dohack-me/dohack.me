import React, {Suspense} from "react";
import ChallengeView from "@/src/app/dashboard/challenges/[repository]/[challenge]/_components/ChallengeView";
import {Skeleton} from "@/src/components/ui/skeleton";

export default async function ChallengesPage({ params }: { params: Promise<{ repository: string, challenge: string }> }) {
    const repositoryId = (await params).repository
    const challengeId = (await params).challenge

    return (
        <div className={"grow padding small-column"}>
            <Suspense fallback={<Skeleton className={"grow"}/>}>
                <ChallengeView repositoryId={repositoryId} challengeId={challengeId} />
            </Suspense>
        </div>
    )
}