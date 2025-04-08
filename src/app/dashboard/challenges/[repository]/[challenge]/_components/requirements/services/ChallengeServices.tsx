import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/src/components/ui/card"
import React, {Suspense} from "react"
import {Button} from "@/src/components/ui/button"
import {Loader2Icon} from "lucide-react"
import ChallengeInstanceButtonView from "@/src/app/dashboard/challenges/[repository]/[challenge]/_components/requirements/services/ChallengeInstanceButtonView"
import {Service} from "@/src/lib/database/services"

export default async function ChallengeServices({services}: { services: Service[] }) {
    return (
        <Card className={"h-fit flex flex-col"}>
            <CardHeader>
                <CardTitle>Required Services</CardTitle>
                <div>
                    <CardDescription>This challenge requires you to connect to an external service.</CardDescription>
                    <CardDescription>Click to start a service instance.</CardDescription>
                </div>
            </CardHeader>
            <CardContent className={"small-column"}>
                {services.map((service) => (
                    <Suspense key={service.id} fallback={
                        <Button disabled>
                            <Loader2Icon className={"animate-spin"}/>
                            <p>Loading...</p>
                        </Button>}>
                        <ChallengeInstanceButtonView service={service}/>
                    </Suspense>
                ))}
            </CardContent>
        </Card>
    )
}