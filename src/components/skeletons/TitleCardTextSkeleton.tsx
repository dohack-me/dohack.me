import {Skeleton} from "@/src/components/ui/skeleton"
import React from "react"

export default async function TitleCardTextSkeleton() {
    return (
        <>
            <Skeleton className={"h-4 w-48"}/>
            <Skeleton className={"h-5 w-72"}/>
        </>
    )
}