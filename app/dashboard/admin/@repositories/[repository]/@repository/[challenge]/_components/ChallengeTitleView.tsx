import {CardDescription, CardTitle} from "@/components/ui/card";
import React from "react";
import {readChallenge} from "@/lib/database/challenges";
import {notFound} from "next/navigation";

export default async function ChallengeTitleView({challengeId}: {challengeId: string}) {
    const challenge = (await readChallenge(challengeId))
    if (!challenge) notFound()

    return (
        <div className={"header-with-button-description"}>
            <CardTitle>{`Viewing Challenge: ${challenge.name}`}</CardTitle>
            <CardDescription>{`Authored by: ${challenge.authors.join(", ")}`}</CardDescription>
        </div>
    )
}
