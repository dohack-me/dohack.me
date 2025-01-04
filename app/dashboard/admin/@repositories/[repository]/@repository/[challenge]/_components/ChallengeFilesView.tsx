import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {ResizableHandle, ResizablePanel, ResizablePanelGroup} from "@/components/ui/resizable";
import React from "react";
import UploadChallengeFilesView
    from "@/app/dashboard/admin/@repositories/[repository]/@repository/[challenge]/_components/UploadChallengeFilesView";
import ReadChallengeFilesView
    from "@/app/dashboard/admin/@repositories/[repository]/@repository/[challenge]/_components/ReadChallengeFilesView";

export default async function ChallengeFilesView({challengeId}: {challengeId: string}) {
    return (
        <Card>
            <CardHeader className={"flex flex-row justify-between"}>
                <div className={"flex flex-col gap-y-1.5"}>
                    <CardTitle>{"Distributed Files"}</CardTitle>
                    <CardDescription>{"Distributed files are available to all users, used in order to solve challenges"}</CardDescription>
                </div>
            </CardHeader>
            <CardContent>
                <Card className={"min-h-96 flex flex-col"}>
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