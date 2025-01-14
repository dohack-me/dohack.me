import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import React from "react";
import {Challenge} from "@/lib/database/challenges";
import {readChallengeSocketServices} from "@/lib/database/services/sockets";
import ChallengeSocketsButton
    from "@/app/dashboard/challenges/[repository]/[challenge]/_components/ChallengeSocketsButton";

export default async function ChallengeSockets({challenge}: {challenge: Challenge}) {
    const sockets = await readChallengeSocketServices(challenge.id)

    return (
        <Card className={"h-fit flex flex-col"}>
            <CardHeader>
                <CardTitle>Required Sockets</CardTitle>
                <CardDescription>Connect to these sockets to solve the challenge</CardDescription>
            </CardHeader>
            <CardContent className={"small-column"}>
                {sockets.map(async (socket) => {
                        return (
                            <ChallengeSocketsButton key={socket.id} socket={socket}/>
                        )
                    }
                )}
            </CardContent>
        </Card>
    )
}