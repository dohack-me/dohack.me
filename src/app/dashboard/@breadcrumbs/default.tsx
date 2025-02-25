import {Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage} from "@/src/components/ui/breadcrumb"
import React from "react"

export default async function DefaultBreadcrumbsSlot() {
    return (
        <Breadcrumb>
            <BreadcrumbList>
                <BreadcrumbItem key={"dashboard"}>
                    <BreadcrumbPage className={"capitalize"}>Dashboard</BreadcrumbPage>
                </BreadcrumbItem>
            </BreadcrumbList>
        </Breadcrumb>
    )
}