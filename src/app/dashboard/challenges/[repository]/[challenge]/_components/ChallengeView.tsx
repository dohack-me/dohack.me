import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/src/components/ui/card";
import {Button} from "@/src/components/ui/button";
import Link from "next/link";
import {ChevronLeftIcon} from "lucide-react";
import React, {Suspense} from "react";
import {readChallenge} from "@/src/lib/database/challenges";
import {notFound} from "next/navigation";
import ChallengeAnswerInputForm from "@/src/app/dashboard/challenges/[repository]/[challenge]/_components/ChallengeAnswerInputForm";
import ChallengeFiles from "@/src/app/dashboard/challenges/[repository]/[challenge]/_components/requirements/files/ChallengeFiles";
import {Skeleton} from "@/src/components/ui/skeleton";
import {ResizableHandle, ResizablePanel, ResizablePanelGroup} from "@/src/components/ui/resizable";
import ChallengeWebsites
    from "@/src/app/dashboard/challenges/[repository]/[challenge]/_components/requirements/websites/ChallengeWebsites";
import ChallengeSockets
    from "@/src/app/dashboard/challenges/[repository]/[challenge]/_components/requirements/sockets/ChallengeSockets";
import MarkdownContent from "@/src/components/MarkdownContent";

export default async function ChallengeView({repositoryId, challengeId}: {repositoryId: string, challengeId: string}) {
    const challenge = await readChallenge(challengeId)
    if (!challenge) notFound()

    return (
        <Card className={"grow flex flex-col"}>
            <CardHeader className={"header-with-button"}>
                <div className={"header-with-button-description"}>
                    <CardTitle>{challenge.name}</CardTitle>
                    <CardDescription>Category: {challenge.category}</CardDescription>
                </div>
                <Button asChild>
                    <Link href={`/dashboard/challenges/${repositoryId}`}>
                        <ChevronLeftIcon/>
                        <p className={"hidden lg:block"}>Back to Challenges</p>
                        <p className={"hidden sm:block lg:hidden"}>Back</p>
                    </Link>
                </Button>
            </CardHeader>
            <CardContent className={"grow"}>
                <ResizablePanelGroup direction={"horizontal"}>
                    <ResizablePanel defaultSize={70}>
                        <MarkdownContent text={challenge.description}/>
                    </ResizablePanel>
                    <ResizableHandle className={"mx-4"}/>
                    <ResizablePanel defaultSize={30} className={"small-column"}>
                        <Suspense fallback={<Skeleton className={"grow"}/>}>
                            <ChallengeFiles challenge={challenge}/>
                        </Suspense>
                        <Suspense fallback={<Skeleton className={"grow"}/>}>
                            <ChallengeWebsites challenge={challenge}/>
                        </Suspense>
                        <Suspense fallback={<Skeleton className={"grow"}/>}>
                            <ChallengeSockets challenge={challenge}/>
                        </Suspense>
                    </ResizablePanel>
                </ResizablePanelGroup>
            </CardContent>
            <CardFooter>
                <ChallengeAnswerInputForm challengeId={challengeId}/>
            </CardFooter>
        </Card>
    )
}