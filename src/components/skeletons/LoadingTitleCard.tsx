import {Card, CardAction, CardHeader} from "@/src/components/ui/card"
import React from "react"
import {Button} from "@/src/components/ui/button"
import {Loader2Icon} from "lucide-react"
import TitleCardTextSkeleton from "@/src/components/skeletons/TitleCardTextSkeleton"

export default async function LoadingTitleCard() {
    return (
        <Card>
            <CardHeader>
                <TitleCardTextSkeleton/>
                <CardAction>
                    <Button disabled>
                        <Loader2Icon className={"animate-spin"}/>
                        <p>Loading...</p>
                    </Button>
                </CardAction>
            </CardHeader>
        </Card>
    )
}