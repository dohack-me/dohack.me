import {Card, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import {ChevronLeftIcon} from "lucide-react";
import React from "react";
import {readChallenge} from "@/lib/database/challenge";
import {redirect} from "next/navigation";

export default async function ChallengeTitleView({repositoryId, challengeId}: {repositoryId: string, challengeId: string}) {
    const challenge = await readChallenge(challengeId)

    if (!challenge) {
        redirect("/error")
    }

    return (
        <Card>
            <CardHeader className={"flex flex-row justify-between"}>
                <div className={"flex flex-col gap-y-1.5"}>
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
        </Card>
    )
}