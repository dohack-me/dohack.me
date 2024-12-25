import {Card, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import React from "react";
import {readChallenge} from "@/lib/database/challenge";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import {ChevronLeftIcon, PlusIcon} from "lucide-react";
import {redirect} from "next/navigation";
import EditChallengeForm from "@/app/dashboard/admin/@repositories/[repository]/@repository/[challenge]/details-form";
import { readRepository } from "@/lib/database/repository";

export default async function AdminChallengeOverviewPage({ params }: { params: Promise<{ repository: string, challenge: string }>}) {
    const paramsObj = await params
    const repositoryId = paramsObj.repository
    const challengeId = paramsObj.challenge
    const repository = await readRepository(repositoryId)
    const challenge = await readChallenge(challengeId)
    if (!repository) {
        redirect("/dashboard")
    }
    if (!challenge) {
        redirect("/dashboard")
    }

    return (
        <div className={"h-full w-full flex flex-col gap-y-4"}>
            <Card>
                <CardHeader className={"flex flex-row justify-between"}>
                    <div className={"flex flex-col gap-y-1.5"}>
                        <CardTitle>{`Viewing Challenge: ${challenge.name}`}</CardTitle>
                        <CardDescription>{`Authored by: ${challenge.authors.join(", ")}`}</CardDescription>
                    </div>
                    <Button asChild>
                        <Link href={`/dashboard/admin/${repositoryId}`}>
                            <ChevronLeftIcon/>
                            <p className={"hidden lg:block"}>Back to Repository</p>
                            <p className={"hidden sm:block lg:hidden"}>Back</p>
                        </Link>
                    </Button>
                </CardHeader>
            </Card>
            <EditChallengeForm repository={repository} challenge={challenge}/>
            <Card>
                <CardHeader className={"flex flex-row justify-between"}>
                    <div className={"flex flex-col gap-y-1.5"}>
                        <CardTitle>{"Distributed Files"}</CardTitle>
                        <CardDescription>{"Distributed files are available to all users, used in order to solve challenges"}</CardDescription>
                    </div>
                    <Button asChild>
                        <Link href={`/dashboard/admin/${repositoryId}`}>
                            <PlusIcon/>
                            <p className={"hidden lg:block"}>Add files</p>
                            <p className={"hidden sm:block lg:hidden"}>Add</p>
                        </Link>
                    </Button>
                </CardHeader>
            </Card>
        </div>
    )
}