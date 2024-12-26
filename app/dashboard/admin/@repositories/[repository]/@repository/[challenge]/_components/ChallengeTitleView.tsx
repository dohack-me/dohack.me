import {Card, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import {ChevronLeftIcon} from "lucide-react";
import React from "react";
import {readChallenge} from "@/lib/database/challenge";

export default async function ChallengeTitleView({repositoryId, challengeId}: {repositoryId: string, challengeId: string}) {
    const challenge = (await readChallenge(challengeId))!

    return (
        <Card>
            <CardHeader className={"flex flex-row justify-between"}>
                <div className={"flex flex-col gap-y-1.5"}>
                    <CardTitle>{`Viewing Challenge: ${challenge.name}`}</CardTitle>
                    <CardDescription>{`Authored by: ${challenge.authors.join(", ")}`}</CardDescription>
                </div>
                <Button asChild>
                    <Link href={`/dashboard/admin/${repositoryId}`}>
                        <ChevronLeftIcon/>
                        <p className={"hidden lg:block"}>Back to Repository</p>
                        <p className={"hidden sm:block lg:hidden"}>Back</p>
                    </Link>
                </Button>
            </CardHeader>
        </Card>
    )
}
