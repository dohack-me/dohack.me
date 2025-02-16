import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/src/components/ui/card";
import React, {Suspense} from "react";
import {Challenge} from "@/src/lib/database/challenges";
import {readChallengeWebsiteServices} from "@/src/lib/database/websites";
import {Button} from "@/src/components/ui/button";
import {Loader2Icon} from "lucide-react";
import ChallengeWebsiteButtonView
    from "@/src/app/dashboard/challenges/[repository]/[challenge]/_components/requirements/websites/ChallengeWebsiteButtonView";

export default async function ChallengeWebsites({challenge}: {challenge: Challenge}) {
    const websites = await readChallengeWebsiteServices(challenge.id)
    if (websites.length <= 0) return null

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
                    <Suspense key={website.id} fallback={
                        <Button disabled>
                        <Loader2Icon className={"animate-spin"} />
                        <p>Loading...</p>
                    </Button>}>
                        <ChallengeWebsiteButtonView website={website} />
                    </Suspense>
                ))}
            </CardContent>
        </Card>
    )
}