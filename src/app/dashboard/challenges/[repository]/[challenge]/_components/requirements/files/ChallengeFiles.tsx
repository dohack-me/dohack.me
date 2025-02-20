import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/src/components/ui/card";
import {Button} from "@/src/components/ui/button";
import Link from "next/link";
import {DownloadIcon} from "lucide-react";
import React from "react";
import {getFileDownloadUrl, readFolderFiles} from "@/src/lib/storage";
import {Challenge} from "@/src/lib/database/challenges";

export default async function ChallengeFiles({challenge}: {challenge: Challenge}) {
    const files = await readFolderFiles(`${challenge.repository.id}/${challenge.id}`)
    if (files.length <= 0) return null

    return (
        <Card className={"h-fit flex flex-col"}>
            <CardHeader>
                <CardTitle>Required Files</CardTitle>
                <div>
                    <CardDescription>This challenge requires additional files.</CardDescription>
                    <CardDescription>Download these files to solve the challenge.</CardDescription>
                </div>
            </CardHeader>
            <CardContent className={"small-column"}>
                {files.map(async (file) => {
                        const url = await getFileDownloadUrl(file.path)
                        return (
                            <Button key={file.etag} asChild>
                                <Link href={url}>
                                    <DownloadIcon/>
                                    {file.name}
                                </Link>
                            </Button>
                        )
                    }
                )}
            </CardContent>
        </Card>
    )
}