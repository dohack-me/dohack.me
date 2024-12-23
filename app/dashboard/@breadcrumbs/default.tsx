import {BreadcrumbItem, BreadcrumbPage} from "@/components/ui/breadcrumb";
import React from "react";

export default function Default() {
    return (
        <BreadcrumbItem key={"dashboard"}>
            <BreadcrumbPage className={"capitalize"}>Dashboard</BreadcrumbPage>
        </BreadcrumbItem>
    )
}