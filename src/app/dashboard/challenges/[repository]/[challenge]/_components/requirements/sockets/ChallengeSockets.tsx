import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/src/components/ui/card"
import React, {Suspense} from "react"
import {Button} from "@/src/components/ui/button"
import {Loader2Icon} from "lucide-react"
import ChallengeSocketButtonView from "@/src/app/dashboard/challenges/[repository]/[challenge]/_components/requirements/sockets/ChallengeSocketButtonView"
import {Socket} from "@/src/lib/database/sockets"

export default async function ChallengeSockets({sockets}: { sockets: Socket[] }) {
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
                            <Loader2Icon className={"animate-spin"}/>
                            <p>Loading...</p>
                        </Button>}>
                        <ChallengeSocketButtonView socket={socket}/>
                    </Suspense>
                ))}
            </CardContent>
        </Card>
    )
}