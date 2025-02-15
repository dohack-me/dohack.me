import {Skeleton} from "@/src/components/ui/skeleton";
import React from "react";

export default async function TitleCardTextSkeleton() {
    return (
        <div className={"grow flex flex-col gap-y-2.5"}>
            <Skeleton className={"h-[1rem] w-[35%]"}/>
            <Skeleton className={"h-[1rem] w-[30%]"}/>
        </div>
    )
}