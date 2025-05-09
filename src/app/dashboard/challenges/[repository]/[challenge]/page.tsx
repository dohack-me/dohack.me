import React, {Suspense} from "react"
import ChallengeView from "@/src/app/dashboard/challenges/[repository]/[challenge]/_components/ChallengeView"
import {Skeleton} from "@/src/components/ui/skeleton"
import {isUUID} from "@/src/lib/utils"
import {notFound} from "next/navigation"
import AdUnit from "@/src/components/ads/AdUnit"
import {Card, CardHeader} from "@/src/components/ui/card"
import AdPusher from "@/src/components/ads/AdPusher"

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
        <div className={"grow padding flex gap-4 flex-col lg:flex-row"}>
            <AdPusher/>
            <Suspense fallback={<Skeleton className={"grow"}/>}>
                <ChallengeView repositoryId={repositoryId} challengeId={challengeId}/>
            </Suspense>
            <Card className={"w-1/4 flex flex-col"}>
                <CardHeader className={"grow flex flex-col"}>
                    <AdUnit client={"ca-pub-1971189389097192"}
                            slot={"5679687143"}
                            format={"autorelaxed"}
                            data-matched-content-rows-num={"3,1"}
                            data-matched-content-columns-num={"1,2"}
                            data-matched-content-ui-type={"image_stacked,image_stacked"}
                    />
                </CardHeader>
            </Card>
        </div>
    )
}