import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/src/components/ui/card";
import {ResizableHandle, ResizablePanel, ResizablePanelGroup} from "@/src/components/ui/resizable";
import React from "react";
import UploadChallengeFilesView
    from "@/src/app/dashboard/admin/@repositories/[repository]/@repository/[challenge]/__components/files/UploadChallengeFilesView";
import ReadChallengeFilesView
    from "@/src/app/dashboard/admin/@repositories/[repository]/@repository/[challenge]/__components/files/ReadChallengeFilesView";

export default async function ChallengeFilesView({challengeId}: {challengeId: string}) {
    return (
        <Card className={"grow-col"}>
            <CardHeader className={"flex flex-row justify-between"}>
                <div className={"flex flex-col gap-y-1.5"}>
                    <CardTitle>{"Distributed Files"}</CardTitle>
                    <CardDescription>{"Distributed files are available to all users, used in order to solve challenges"}</CardDescription>
                </div>
            </CardHeader>
            <CardContent className={"grow-col"}>
                <Card className={"grow-col"}>
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