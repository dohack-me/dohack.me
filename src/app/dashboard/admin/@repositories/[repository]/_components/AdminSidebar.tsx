import {Card, CardHeader} from "@/src/components/ui/card";
import {Button} from "@/src/components/ui/button";
import Link from "next/link";
import {InfoIcon} from "lucide-react";
import {Collapsible, CollapsibleContent, CollapsibleTrigger} from "@/src/components/ui/collapsible";
import {CollapsibleButton} from "@/src/components/CollapsibleButton";
import React from "react";
import {readRepositoryChallenges} from "@/src/lib/database/challenges";
import {Category} from "@prisma/client";

export default async function AdminSidebar({repositoryId}: {repositoryId: string}) {
    const challenges = await readRepositoryChallenges(repositoryId);
    const categories = Object.keys(Category)

    return (
        <Card className={"h-full w-full flex flex-col gap-y-1"}>
            <CardHeader>
                <Button variant={"ghost"} asChild>
                    <Link href={`/dashboard/admin/${repositoryId}`} className={"flex flex-row !justify-between"}>
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
                                                    <Link href={`/dashboard/admin/${repositoryId}/${challenge.id}`} className={"flex flex-row justify-start"}>
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
    )
}