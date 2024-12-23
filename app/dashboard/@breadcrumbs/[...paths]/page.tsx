import {BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator} from "@/components/ui/breadcrumb";
import React from "react";

export default async function BreadcrumbsSlot({ params }: { params: Promise<{ paths: string[] }>}) {
    const paths = (await params).paths

    function getBreadcrumbItem(path: string, index: number) {
        if (index === paths.length - 1) {
            return (
                <BreadcrumbItem key={path}>
                    <BreadcrumbPage className={"capitalize"}>{path}</BreadcrumbPage>
                </BreadcrumbItem>
            )
        }

        let href = ""
        paths.slice(0, index + 1).forEach((item) => {
            href += "/" + item
        })

        return (
            <>
                <BreadcrumbItem key={path}>
                    <BreadcrumbLink href={href} className={"capitalize"}>{path}</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator key={path + "-separator"} />
            </>
        )
    }

    return (
        <BreadcrumbList>
            { paths.map((path, i) => getBreadcrumbItem(path, i))}
        </BreadcrumbList>
    )
}