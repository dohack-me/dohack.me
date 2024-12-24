import {BreadcrumbItem, BreadcrumbLink, BreadcrumbPage, BreadcrumbSeparator} from "@/components/ui/breadcrumb";
import React from "react";
import {readRepository} from "@/lib/database/repository";
import {readChallenge} from "@/lib/database/challenge";

function isUUID(text: string): boolean {
    return text.match(new RegExp("^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12})$")) != null;
}

export default async function BreadcrumbsSlot({ params }: { params: Promise<{ paths: string[] }>}) {
    const paths = (await params).paths

    async function getBreadcrumbItem(path: string, index: number) {
        let name
        if (isUUID(path)) {
            const repository = await readRepository(path)
            if (repository != null) {
                name = repository.name
            } else {
                name = (await readChallenge(path))!.name // scuffed, will make it less scuffed later
            }
        } else {
            name = path
        }

        if (index === paths.length - 1) {
            return (
                <BreadcrumbItem key={path}>
                    <BreadcrumbPage className={"capitalize"}>{name}</BreadcrumbPage>
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
                    <BreadcrumbLink href={href} className={"capitalize"}>{name}</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator key={path + "-separator"} />
            </>
        )
    }

    return (
        <>
            { paths.map((path, i) => getBreadcrumbItem(path, i))}
        </>
    )
}