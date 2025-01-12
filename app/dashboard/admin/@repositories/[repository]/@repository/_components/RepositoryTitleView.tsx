import {CardDescription, CardTitle} from "@/components/ui/card";
import Link from "next/link";
import React from "react";
import {readRepository} from "@/lib/database/repositories";

export default async function RepositoryTitleView({repositoryId}: {repositoryId: string}) {
    const repository = await readRepository(repositoryId)

    return (
        <div className={"header-with-button-description"}>
            <CardTitle>Viewing Repository: <Link href={repository.sourceLink}
                                                 className={"underline"}>{repository.name}</Link></CardTitle>
            <CardDescription>Created by: <Link href={repository.organizationLink}
                                               className={"underline"}>{repository.organization}</Link></CardDescription>
        </div>
    )
}