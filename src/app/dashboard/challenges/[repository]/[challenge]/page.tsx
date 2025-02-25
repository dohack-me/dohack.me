import React, {Suspense} from "react";
import ChallengeView from "@/src/app/dashboard/challenges/[repository]/[challenge]/_components/ChallengeView";
import {Skeleton} from "@/src/components/ui/skeleton";
import {isUUID} from "@/src/lib/utils";
import {notFound} from "next/navigation";

export default async function ChallengesPage({params}: { params: Promise<{ repository: string, challenge: string }> }) {
    const repositoryId = (await params).repository
    const challengeId = (await params).challenge
    if (!isUUID(repositoryId)) {
        notFound()
    }
    if (!isUUID(challengeId)) {
        notFound()
    }

    return (
        <div className={"grow padding small-column"}>
            <Suspense fallback={<Skeleton className={"grow"}/>}>
                <ChallengeView repositoryId={repositoryId} challengeId={challengeId}/>
            </Suspense>
        </div>
    )
}