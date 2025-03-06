import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/src/components/ui/card"
import {Button} from "@/src/components/ui/button"
import Link from "next/link"
import {ChevronLeftIcon} from "lucide-react"
import React, {Suspense} from "react"
import {readChallenge} from "@/src/lib/database/challenges"
import {notFound} from "next/navigation"
import ChallengeAnswerInputForm from "@/src/app/dashboard/challenges/[repository]/[challenge]/_components/ChallengeAnswerInputForm"
import {Skeleton} from "@/src/components/ui/skeleton"
import MarkdownContent from "@/src/components/MarkdownContent"
import ChallengeBookmarkView from "@/src/app/dashboard/challenges/[repository]/[challenge]/_components/ChallengeBookmarkView"
import {getUserRole} from "@/src/lib/auth/users"
import {UserRole} from "@prisma/client"
import ChallengeRequirementView from "@/src/app/dashboard/challenges/[repository]/[challenge]/_components/requirements/ChallengeRequirementView"

export default async function ChallengeView({repositoryId, challengeId}: {
    repositoryId: string,
    challengeId: string
}) {
    const challenge = await readChallenge(challengeId)
    if (!challenge || (!challenge.visible && (await getUserRole())! !== UserRole.ADMIN)) notFound()

    return (
        <Card className={"grow flex flex-col"}>
            <CardHeader className={"header-with-button"}>
                <div className={"header-with-button-description"}>
                    <CardTitle>{challenge.name}</CardTitle>
                    <CardDescription>Category: {challenge.category}</CardDescription>
                </div>
                <div className={"small-row"}>
                    <Suspense fallback={null}>
                        <ChallengeBookmarkView challengeId={challengeId}/>
                    </Suspense>
                    <Button asChild>
                        <Link href={`/dashboard/challenges/${repositoryId}`}>
                            <ChevronLeftIcon/>
                            <p className={"hidden lg:block"}>Back to Challenges</p>
                            <p className={"hidden sm:block lg:hidden"}>Back</p>
                        </Link>
                    </Button>
                </div>
            </CardHeader>
            <CardContent className={"grow-col"}>
                <div className={"grow hidden xl:small-row"}>
                    <div className={"grow"}>
                        <MarkdownContent text={challenge.description}/>
                    </div>
                    <Suspense fallback={<Skeleton className={"w-[40%]"}/>}>
                        <ChallengeRequirementView challenge={challenge}/>
                    </Suspense>
                </div>
                <div className={"grow column xl:hidden"}>
                    <div className={"grow"}>
                        <MarkdownContent text={challenge.description}/>
                    </div>
                    <Suspense fallback={<Skeleton className={"grow"}/>}>
                        <ChallengeRequirementView challenge={challenge}/>
                    </Suspense>
                </div>
            </CardContent>
            <CardFooter>
                <ChallengeAnswerInputForm challengeId={challengeId}/>
            </CardFooter>
        </Card>
    )
}