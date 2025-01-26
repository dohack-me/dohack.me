import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/src/components/ui/card";
import React, {Suspense} from "react";
import {Challenge} from "@/src/lib/database/challenges";
import {readChallengeSocketServices} from "@/src/lib/services/sockets";
import {Button} from "@/src/components/ui/button";
import {Loader2Icon} from "lucide-react";
import ChallengeSocketButtonView
    from "@/src/app/dashboard/challenges/[repository]/[challenge]/_components/requirements/sockets/ChallengeSocketButtonView";

export default async function ChallengeSockets({challenge}: {challenge: Challenge}) {
    const sockets = await readChallengeSocketServices(challenge.id)
    if (sockets.length <= 0) return null

    return (
        <Card className={"h-fit flex flex-col"}>
            <CardHeader>
                <CardTitle>Required Sockets</CardTitle>
                <div>
                    <CardDescription>This challenge requires you to connect to sockets.</CardDescription>
                    <CardDescription>Click to start a socket instance.</CardDescription>
                </div>
            </CardHeader>
            <CardContent className={"small-column"}>
                {sockets.map((socket) => (
                    <Suspense key={socket.id} fallback={
                        <Button disabled>
                            <Loader2Icon className={"animate-spin"} />
                            <p>Loading...</p>
                        </Button>}>
                        <ChallengeSocketButtonView socket={socket} />
                    </Suspense>
                ))}
            </CardContent>
        </Card>
    )
}