import React, {Suspense} from "react";
import ChallengeView from "@/app/dashboard/challenges/[repository]/[challenge]/_components/ChallengeView";
import {Skeleton} from "@/components/ui/skeleton";

export default async function ChallengesPage({ params }: { params: Promise<{ repository: string, challenge: string }> }) {
    const repositoryId = (await params).repository
    const challengeId = (await params).challenge

    return (
        <div className={"grow-col padding gap-y-4"}>
            <Suspense fallback={<Skeleton className={"flex-grow"}/>}>
                <ChallengeView repositoryId={repositoryId} challengeId={challengeId} />
            </Suspense>
        </div>
    )
}