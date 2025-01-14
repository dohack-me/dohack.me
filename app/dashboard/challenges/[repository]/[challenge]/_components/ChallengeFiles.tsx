import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import {DownloadIcon} from "lucide-react";
import React from "react";
import {readChallengeFiles} from "@/lib/storage";
import {notFound} from "next/navigation";
import {getServerClient} from "@/lib/supabase/server";
import {Challenge} from "@/lib/database/challenges";

export default async function ChallengeFiles({challenge}: {challenge: Challenge}) {
    const files = await readChallengeFiles(challenge)
    if (!files) notFound()
    const bucketObject = (await getServerClient()).storage.from('challenges')
    const getPublicUrl = (path: string) => {
        return bucketObject.getPublicUrl(path, {
            download: true
        }).data.publicUrl
    }

    return (
        <Card className={"h-fit flex flex-col"}>
            <CardHeader>
                <CardTitle>Required Files</CardTitle>
                <CardDescription>Download these files to solve the challenge</CardDescription>
            </CardHeader>
            <CardContent className={"small-column"}>
                {files.map(async (file) => {
                        const url = getPublicUrl(`${challenge.repository.id}/${challenge.id}/${file.name}`)
                        return (
                            <Button key={file.id} asChild>
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