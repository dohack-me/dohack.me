import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/src/components/ui/card";
import React from "react";
import {Challenge} from "@/src/lib/database/challenges";
import {readChallengeWebsiteServices} from "@/src/lib/services/websites";
import ChallengeWebsiteButton
    from "@/src/app/dashboard/challenges/[repository]/[challenge]/_components/services/ChallengeWebsiteButton";

export default async function ChallengeWebsites({challenge}: {challenge: Challenge}) {
    const websites = await readChallengeWebsiteServices(challenge.id)

    return (
        <Card className={"h-fit flex flex-col"}>
            <CardHeader>
                <CardTitle>Required Websites</CardTitle>
                <div>
                    <CardDescription>This challenge requires you to launch websites.</CardDescription>
                    <CardDescription>Click to start a website instance.</CardDescription>
                </div>
            </CardHeader>
            <CardContent className={"small-column"}>
                {websites.map((website) => (
                    <ChallengeWebsiteButton key={website.id} website={website} />
                ))}
            </CardContent>
        </Card>
    )
}