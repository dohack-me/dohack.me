import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/src/components/ui/card";
import {Button} from "@/src/components/ui/button";
import Link from "next/link";
import {ChevronLeftIcon} from "lucide-react";
import React from "react";
import {readChallenge} from "@/src/lib/database/challenges";
import {notFound} from "next/navigation";
import ChallengeInputForm from "@/src/app/dashboard/challenges/[repository]/[challenge]/_components/ChallengeInputForm";
import {Separator} from "@/src/components/ui/separator";
import ChallengeFiles from "@/src/app/dashboard/challenges/[repository]/[challenge]/_components/ChallengeFiles";
import ChallengeWebsites from "@/src/app/dashboard/challenges/[repository]/[challenge]/_components/ChallengeWebsites";
import ChallengeSockets from "@/src/app/dashboard/challenges/[repository]/[challenge]/_components/ChallengeSockets";

export default async function ChallengeView({repositoryId, challengeId}: {repositoryId: string, challengeId: string}) {
    const challenge = await readChallenge(challengeId)
    if (!challenge) notFound()


    return (
        <Card className={"flex-grow flex flex-col"}>
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
            <CardContent className={"flex-grow small-row"}>
                <div className={"grow-col"}>
                    {challenge.description.split("\n").map((line) => (
                        <p key={line} className={"text-wrap"}>{line}</p>
                    ))}
                    <Separator className={"mt-3"} orientation={"horizontal"}/>
                </div>
                <Separator orientation={"vertical"}/>
                <div className={"small-column"}>
                    <ChallengeFiles challenge={challenge}/>
                    <ChallengeWebsites challenge={challenge}/>
                    <ChallengeSockets challenge={challenge}/>
                </div>
            </CardContent>
            <CardFooter>
                <ChallengeInputForm challengeId={challengeId}/>
            </CardFooter>
        </Card>
    )
}