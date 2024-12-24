import React, {Suspense} from "react";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import AdminViewLoading from "@/app/dashboard/admin/@repositories/[repository]/loading";
import {isAdmin} from "@/lib/auth";
import {redirect} from "next/navigation";
import {Collapsible, CollapsibleContent, CollapsibleTrigger,} from "@/components/ui/collapsible"
import {Category} from "@prisma/client";
import {InfoIcon} from "lucide-react";
import {Card, CardHeader} from "@/components/ui/card";
import {readChallenges} from "@/lib/database/challenge";
import {CollapsibleButton} from "@/components/CollapsibleButton";

export default async function AdminChallengeLayout({ params, repository }: { params: Promise<{repository: string}>, repository: React.ReactNode }) {
    if (!await isAdmin()) {
        redirect("/dashboard");
    }

    const repositoryId = (await params).repository
    const categories = Object.keys(Category)
    const challenges = (await readChallenges()).filter((challenge) => challenge.repository.id === repositoryId)

    return (
        <div className={"h-full flex flex-row justify-between gap-x-10"}>
            <Card className={"h-full w-[30%] hidden lg:flex flex-col gap-y-1"}>
                <CardHeader>
                    <Button variant={"ghost"} asChild>
                        <Link href={`/dashboard/admin/${repositoryId}`} className={"flex flex-row justify-between"}>
                            Overview
                            <InfoIcon/>
                        </Link>
                    </Button>
                    <Collapsible className={"group/collapsible"}>
                        <CollapsibleButton title={"Challenges"}/>
                        <CollapsibleContent>
                            <div className={"mx-3.5 px-2.5 border-l-2 border-secondary flex flex-col gap-y-1"}>
                                {categories.map((category) => (
                                    <Collapsible key={category}>
                                        <CollapsibleTrigger asChild className={"w-full"}>
                                            <CollapsibleButton title={category}/>
                                        </CollapsibleTrigger>
                                        <CollapsibleContent>
                                            <div className={"mx-3.5 px-2.5 border-l-2 border-secondary flex flex-col gap-y-1"}>
                                                {challenges.filter((challenge) => challenge.category === category).map((challenge) => (
                                                    <Button key={challenge.id} variant={"ghost"} asChild>
                                                        <Link href={`/dashboard/admin/${repositoryId}/${challenge.id}`} className={"flex flex-row justify-between"}>
                                                            {challenge.name}
                                                        </Link>
                                                    </Button>
                                                ))}
                                            </div>
                                        </CollapsibleContent>
                                    </Collapsible>
                                    ))}
                            </div>
                        </CollapsibleContent>
                    </Collapsible>
                </CardHeader>
            </Card>
            <Suspense fallback={<AdminViewLoading />}>
                {repository}
            </Suspense>
        </div>
    )
}