import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import {ChevronLeftIcon, DownloadIcon} from "lucide-react";
import React from "react";
import {readChallenge} from "@/lib/database/challenge";
import {notFound} from "next/navigation";
import {readChallengeFiles} from "@/lib/storage";
import {getServerClient} from "@/lib/supabase/server";
import ChallengeInputForm from "@/app/dashboard/challenges/[repository]/[challenge]/_components/ChallengeInputForm";

export default async function ChallengeView({repositoryId, challengeId}: {repositoryId: string, challengeId: string}) {
    const challenge = await readChallenge(challengeId)
    if (!challenge) notFound()
    const files = await readChallengeFiles(challenge)
    if (!files) notFound()

    const bucketObject = (await getServerClient()).storage.from('challenges')
    const getPublicUrl = (path: string) => {
        return bucketObject.getPublicUrl(path, {
            download: true
        }).data.publicUrl
    }

    return (
        <Card className={"flex-grow flex flex-col"}>
            <CardHeader className={"header-with-button"}>
                <div className={"header-with-button-description"}>
                    <CardTitle>{challenge.name}</CardTitle>
                    <CardDescription>Category: {challenge.category}</CardDescription>
                </div>
                <Button asChild>
                    <Link href={`/dashboard/challenges/${repositoryId}`}>
                        <ChevronLeftIcon/>
                        <p className={"hidden lg:block"}>Back to Challenges</p>
                        <p className={"hidden sm:block lg:hidden"}>Back</p>
                    </Link>
                </Button>
            </CardHeader>
            <CardContent className={"flex-grow"}>
                <div>
                    {challenge.description.split("\n").map((line) => (
                        <p key={line} className={"text-wrap"}>{line}</p>
                    ))}
                </div>
            </CardContent>
            <CardFooter className={"flex flex-col gap-y-4"}>
                <div className={"w-full flex"}>
                    {files.map(async(file) => {
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
                </div>
                <ChallengeInputForm challengeId={challengeId}/>
            </CardFooter>
        </Card>
    )
}