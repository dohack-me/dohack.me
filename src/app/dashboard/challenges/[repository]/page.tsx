import RepositoryTitleView from "@/src/app/dashboard/challenges/[repository]/_components/RepositoryTitleView";
import React, {Suspense} from "react";
import RepositoryChallengeView from "@/src/app/dashboard/challenges/[repository]/_components/RepositoryChallengeView";
import {ChevronLeftIcon} from "lucide-react";
import {Card, CardHeader} from "@/src/components/ui/card";
import TitleCardTextSkeleton from "@/src/components/skeletons/TitleCardTextSkeleton";
import {Button} from "@/src/components/ui/button";
import Link from "next/link";
import {Skeleton} from "@/src/components/ui/skeleton";

export default async function RepositoryPage({ params }: { params: Promise<{ repository: string }> }) {
    const repositoryId = (await params).repository

    return (
        <div className={"flex-grow padding small-column"}>
            <Card>
                <CardHeader className={"header-with-button"}>
                    <Suspense fallback={<TitleCardTextSkeleton/>}>
                        <RepositoryTitleView repositoryId={repositoryId}/>
                    </Suspense>
                    <Button asChild>
                        <Link href={`/dashboard/challenges`}>
                            <ChevronLeftIcon/>
                            <p className={"hidden lg:block"}>Back to Repositories</p>
                            <p className={"hidden sm:block lg:hidden"}>Back</p>
                        </Link>
                    </Button>
                </CardHeader>
            </Card>
            <Suspense fallback={<Skeleton className={"flex-grow"}/>}>
                <RepositoryChallengeView repositoryId={repositoryId} />
            </Suspense>
        </div>
    )
}