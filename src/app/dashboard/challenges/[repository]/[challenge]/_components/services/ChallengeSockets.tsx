import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/src/components/ui/card";
import React from "react";
import {Challenge} from "@/src/lib/database/challenges";
import {readChallengeSocketServices} from "@/src/lib/services/sockets";
import ChallengeSocketsButton
    from "@/src/app/dashboard/challenges/[repository]/[challenge]/_components/services/ChallengeSocketsButton";

export default async function ChallengeSockets({challenge}: {challenge: Challenge}) {
    const sockets = await readChallengeSocketServices(challenge.id)

    return (
        <Card className={"h-fit flex flex-col"}>
            <CardHeader>
                <CardTitle>Required Sockets</CardTitle>
                <CardDescription>Connect to these sockets to solve the challenge</CardDescription>
            </CardHeader>
            <CardContent className={"small-column"}>
                {sockets.map(async (socket) => (
                    <ChallengeSocketsButton key={socket.id} socket={socket}/>
                ))}
            </CardContent>
        </Card>
    )
}