import {Card, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import {ChevronLeftIcon} from "lucide-react";
import React from "react";
import {readRepository} from "@/lib/database/repository";

export default async function RepositoryTitleView({repositoryId}: {repositoryId: string}) {
    const repository = await readRepository(repositoryId)

    return (
        <Card>
            <CardHeader className={"flex flex-row justify-between"}>
                <div className={"flex flex-col gap-y-1.5"}>
                    <CardTitle><Link href={repository.sourceLink} className={"underline"}>{repository.name}</Link></CardTitle>
                    <CardDescription>Created by: <Link href={repository.organizationLink} className={"underline"}>{repository.organization}</Link></CardDescription>
                </div>
                <Button asChild>
                    <Link href={`/dashboard/challenges`}>
                        <ChevronLeftIcon/>
                        <p className={"hidden lg:block"}>Back to Challenges</p>
                        <p className={"hidden sm:block lg:hidden"}>Back</p>
                    </Link>
                </Button>
            </CardHeader>
        </Card>
    )
}