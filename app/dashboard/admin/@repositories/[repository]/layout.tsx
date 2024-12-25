import React, {Suspense} from "react";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import AdminViewLoading from "@/app/dashboard/admin/@repositories/[repository]/loading";
import {redirect} from "next/navigation";
import {Collapsible, CollapsibleContent, CollapsibleTrigger,} from "@/components/ui/collapsible"
import {Category} from "@prisma/client";
import {InfoIcon} from "lucide-react";
import {Card, CardHeader} from "@/components/ui/card";
import {readChallenges} from "@/lib/database/challenge";
import {CollapsibleButton} from "@/components/CollapsibleButton";
import {ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";

export default async function AdminChallengeLayout({ params, repository }: { params: Promise<{repository: string}>, repository: React.ReactNode }) {
    const repositoryId = (await params).repository
    const categories = Object.keys(Category)
    const allChallenges = await readChallenges()
    if (!allChallenges) {
        redirect("/dashboard");
    }
    const challenges = allChallenges.filter((challenge) => challenge.repository.id === repositoryId)

    return (
        <ResizablePanelGroup direction={"horizontal"}>
            <ResizablePanel defaultSize={22.5}>
                <Card className={"h-full w-full flex flex-col gap-y-1"}>
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
            </ResizablePanel>
            <ResizableHandle className={"mx-4"}/>
            <ResizablePanel defaultSize={77.5}>
                <Suspense fallback={<AdminViewLoading />}>
                    {repository}
                </Suspense>
            </ResizablePanel>
        </ResizablePanelGroup>
    )
}