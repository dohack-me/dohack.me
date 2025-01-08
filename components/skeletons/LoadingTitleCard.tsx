import {Card, CardHeader} from "@/components/ui/card";
import React from "react";
import {Button} from "@/components/ui/button";
import {Loader2Icon} from "lucide-react";
import TitleCardTextSkeleton from "@/components/skeletons/TitleCardTextSkeleton";

export default async function LoadingTitleCard() {
    return (
        <Card>
            <CardHeader className={"header-with-button"}>
                <div className={"flex-grow header-with-button-description"}>
                    <TitleCardTextSkeleton/>
                </div>
                <Button disabled>
                    <Loader2Icon className={"animate-spin"} />
                    <p>Loading...</p>
                </Button>
            </CardHeader>
        </Card>
    )
}