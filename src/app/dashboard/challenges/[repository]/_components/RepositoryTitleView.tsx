import {CardDescription, CardTitle} from "@/src/components/ui/card"
import Link from "next/link"
import React from "react"
import {readRepository} from "@/src/lib/database/repositories"

export default async function RepositoryTitleView({repositoryId}: { repositoryId: string }) {
    const repository = await readRepository(repositoryId)

    return (
        <>
            <CardTitle><Link href={repository.sourceLink} target={"_blank"}
                             className={"underline"}>{repository.name}</Link></CardTitle>
            <CardDescription>Created by: <Link href={repository.organizationLink} target={"_blank"}
                                               className={"underline"}>{repository.organization}</Link></CardDescription>
        </>
    )
}