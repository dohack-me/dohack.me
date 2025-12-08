import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/src/components/ui/card"
import {ResizableHandle, ResizablePanel, ResizablePanelGroup} from "@/src/components/ui/resizable"
import React from "react"
import UploadChallengeFilesView
    from "@/src/app/dashboard/admin/@repositories/[repository]/@repository/[challenge]/_components/files/UploadChallengeFilesView"
import ReadChallengeFilesView
    from "@/src/app/dashboard/admin/@repositories/[repository]/@repository/[challenge]/_components/files/ReadChallengeFilesView"

export default async function ChallengeFilesView({challengeId}: { challengeId: string }) {
    return (
        <Card className={"grow-col"}>
            <CardHeader>
                <CardTitle>Distributed Files</CardTitle>
                <CardDescription>Distributed files are available to all users, used in order to solve
                    challenges</CardDescription>
            </CardHeader>
            <CardContent className={"grow-col"}>
                <Card className={"grow-col py-0"}>
                    <ResizablePanelGroup direction={"horizontal"} className={"flex-1"}>
                        <ResizablePanel defaultSize={20}>
                            <UploadChallengeFilesView challengeId={challengeId}/>
                        </ResizablePanel>
                        <ResizableHandle/>
                        <ResizablePanel defaultSize={80}>
                            <ReadChallengeFilesView challengeId={challengeId}/>
                        </ResizablePanel>
                    </ResizablePanelGroup>
                </Card>
            </CardContent>
        </Card>
    )

}