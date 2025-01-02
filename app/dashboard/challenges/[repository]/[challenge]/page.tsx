import React, {Suspense} from "react";
import ChallengeLoading from "@/app/dashboard/challenges/[repository]/[challenge]/loading";
import ChallengeView from "@/app/dashboard/challenges/[repository]/[challenge]/_components/ChallengeView";
import ChallengeTitleView from "@/app/dashboard/challenges/[repository]/[challenge]/_components/ChallengeTitleView";
import {ResizableHandle, ResizablePanel, ResizablePanelGroup} from "@/components/ui/resizable";

export default async function ChallengesPage({ params }: { params: Promise<{ repository: string, challenge: string }> }) {
    const repositoryId = (await params).repository
    const challengeId = (await params).challenge

    return (
        <div className={"flex-grow flex flex-col py-4 px-8 gap-y-4"}>
            <Suspense fallback={<ChallengeLoading/>}>
                <ChallengeTitleView repositoryId={repositoryId} challengeId={challengeId} />
            </Suspense>
            <Suspense fallback={<ChallengeLoading/>}>
                <ResizablePanelGroup direction={"horizontal"} className={"flex-1"}>
                    <ResizablePanel defaultSize={20}>
                        <p>test</p>
                    </ResizablePanel>
                    <ResizableHandle className={"mx-4"}/>
                    <ResizablePanel defaultSize={80}>
                        <ChallengeView challengeId={challengeId} />
                    </ResizablePanel>
                </ResizablePanelGroup>
            </Suspense>
        </div>
    )
}