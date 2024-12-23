import React, {Suspense} from "react";
import {Card, CardContent} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import AdminChallengeLoading from "@/app/dashboard/admin/@repositories/[repository]/loading";
import {isAdmin} from "@/lib/auth";
import {redirect} from "next/navigation";

export default async function AdminChallengeLayout({ params, repository }: { params: Promise<{repository: string}>, repository: React.ReactNode }) {
    if (!await isAdmin()) {
        redirect("/dashboard");
    }

    const repositoryId = (await params).repository
    const pathPrefix = `/dashboard/admin/${repositoryId}`

    return (
        <div className={"h-full flex flex-row justify-between gap-x-10"}>
            <Card className={"w-[15%]"}>
                <CardContent className={"flex flex-col p-0"}>
                    <Button asChild variant={"outline"}>
                        <Link href={pathPrefix}>Overview</Link>
                    </Button>
                    <Button asChild variant={"outline"}>
                        <Link href={`${pathPrefix}/challenges`}>Challenges</Link>
                    </Button>
                </CardContent>
            </Card>
            <Suspense fallback={<AdminChallengeLoading />}>
                {repository}
            </Suspense>
        </div>
    )
}