import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/src/components/ui/card"
import React, {Suspense} from "react"
import {Button} from "@/src/components/ui/button"
import {Loader2Icon} from "lucide-react"
import ChallengeWebsiteButtonView from "@/src/app/dashboard/challenges/[repository]/[challenge]/_components/requirements/websites/ChallengeWebsiteButtonView"
import {Website} from "@/src/lib/database/websites"

export default async function ChallengeWebsites({websites}: { websites: Website[] }) {
    return (
        <Card className={"h-fit flex flex-col"}>
            <CardHeader>
                <CardTitle>Required Websites</CardTitle>
                <div>
                    <CardDescription>This challenge requires you to launch websites.</CardDescription>
                    <CardDescription>Click to start a website instance.</CardDescription>
                </div>
            </CardHeader>
            <CardContent className={"small-column"}>
                {websites.map((website) => (
                    <Suspense key={website.id} fallback={
                        <Button disabled>
                            <Loader2Icon className={"animate-spin"}/>
                            <p>Loading...</p>
                        </Button>}>
                        <ChallengeWebsiteButtonView website={website}/>
                    </Suspense>
                ))}
            </CardContent>
        </Card>
    )
}