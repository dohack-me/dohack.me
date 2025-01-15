import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/src/components/ui/card";
import {Button} from "@/src/components/ui/button";
import Link from "next/link";
import React from "react";
import {Challenge} from "@/src/lib/database/challenges";
import {readChallengeWebsiteServices} from "@/src/lib/database/services/websites";
import {ExternalLinkIcon} from "lucide-react";

export default async function ChallengeWebsites({challenge}: {challenge: Challenge}) {
    const websites = await readChallengeWebsiteServices(challenge.id)

    return (
        <Card className={"h-fit flex flex-col"}>
            <CardHeader>
                <CardTitle>Required Websites</CardTitle>
                <CardDescription>Visit these websites to solve the challenge</CardDescription>
            </CardHeader>
            <CardContent className={"small-column"}>
                {websites.map(async (website) => {
                        return (
                            <Button key={website.id} asChild>
                                <Link href={website.url}>
                                    <ExternalLinkIcon/>
                                    {website.url}
                                </Link>
                            </Button>
                        )
                    }
                )}
            </CardContent>
        </Card>
    )
}