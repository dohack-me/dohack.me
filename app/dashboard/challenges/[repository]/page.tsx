import RepositoryTitleView from "@/app/dashboard/challenges/[repository]/_components/RepositoryTitleView";
import React, {Suspense} from "react";
import RepositoryLoading from "@/app/dashboard/challenges/[repository]/loading";
import RepositoryChallengeView from "@/app/dashboard/challenges/[repository]/_components/RepositoryChallengeView";
import {ChevronLeftIcon} from "lucide-react";
import {Card, CardHeader} from "@/components/ui/card";
import TitleCardTextSkeleton from "@/components/skeletons/TitleCardTextSkeleton";
import {Button} from "@/components/ui/button";
import Link from "next/link";

export default async function RepositoryPage({ params }: { params: Promise<{ repository: string }> }) {
    const repositoryId = (await params).repository

    return (
        <div className={"flex-grow flex flex-col py-4 px-8 gap-y-4"}>
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
            <Suspense fallback={<RepositoryLoading/>}>
                <RepositoryChallengeView repositoryId={repositoryId} />
            </Suspense>
        </div>
    )
}