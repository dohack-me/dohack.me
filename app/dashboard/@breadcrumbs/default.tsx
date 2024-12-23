import {BreadcrumbItem, BreadcrumbList, BreadcrumbPage} from "@/components/ui/breadcrumb";
import React from "react";

export default function Default() {
    return (
        <BreadcrumbList>
            <BreadcrumbItem key={"dashboard"}>
                <BreadcrumbPage className={"capitalize"}>Dashboard</BreadcrumbPage>
            </BreadcrumbItem>
        </BreadcrumbList>
    )
}