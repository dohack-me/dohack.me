import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator
} from "@/src/components/ui/breadcrumb"
import React from "react"
import {readRepository} from "@/src/lib/database/repositories"
import {readChallenge} from "@/src/lib/database/challenges"
import {notFound} from "next/navigation"
import {isUUID} from "@/src/lib/utils"

export default async function BreadcrumbsSlot({params}: { params: Promise<{ paths: string[] }> }) {
    const paths = (await params).paths

    async function getBreadcrumbItem(path: string, index: number) {
        let name
        if (isUUID(path)) {
            const repository = await readRepository(path)
            if (repository != null) {
                name = repository.name
            } else {
                const challenge = await readChallenge(path)
                if (!challenge) notFound()
                name = challenge.name
            }
        } else {
            name = path.charAt(0).toUpperCase() + path.slice(1).toLowerCase()
        }

        if (index === paths.length - 1) {
            return (
                <BreadcrumbItem key={path}>
                    <BreadcrumbPage>{name}</BreadcrumbPage>
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
                    <BreadcrumbLink href={href}>{name}</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator key={path + "-separator"}/>
            </>
        )
    }

    return (
        <Breadcrumb>
            <BreadcrumbList>
                {paths.map((path, i) => getBreadcrumbItem(path, i))}
            </BreadcrumbList>
        </Breadcrumb>
    )
}