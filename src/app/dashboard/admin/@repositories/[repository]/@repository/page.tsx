import React, {Suspense} from "react"
import RepositoryTitleView from "@/src/app/dashboard/admin/@repositories/[repository]/@repository/_components/RepositoryTitleView"
import EditRepositoriesView from "@/src/app/dashboard/admin/@repositories/[repository]/@repository/_components/EditRepositoriesView"
import ChallengesView from "@/src/app/dashboard/admin/@repositories/[repository]/@repository/_components/ChallengesView"
import AdminRepositoryOverviewLoading from "@/src/app/dashboard/admin/@repositories/[repository]/@repository/loading"
import {Card, CardHeader} from "@/src/components/ui/card"
import {Button} from "@/src/components/ui/button"
import Link from "next/link"
import {ChevronLeftIcon} from "lucide-react"
import TitleCardTextSkeleton from "@/src/components/skeletons/TitleCardTextSkeleton"

export default async function AdminRepositoryOverviewPage({params}: { params: Promise<{ repository: string }> }) {
    const repositoryId = (await params).repository

    return (
        <div className={"h-full w-full small-column"}>
            <Card>
                <CardHeader className={"header-with-button"}>
                    <Suspense fallback={<TitleCardTextSkeleton/>}>
                        <RepositoryTitleView repositoryId={repositoryId}/>
                    </Suspense>
                    <Button asChild>
                        <Link href={`/dashboard/admin`}>
                            <ChevronLeftIcon/>
                            <p className={"hidden lg:block"}>Back to Repositories</p>
                            <p className={"hidden sm:block lg:hidden"}>Back</p>
                        </Link>
                    </Button>
                </CardHeader>
            </Card>
            <Suspense fallback={<AdminRepositoryOverviewLoading/>}>
                <ChallengesView repositoryId={repositoryId}/>
            </Suspense>
            <Suspense fallback={<AdminRepositoryOverviewLoading/>}>
                <EditRepositoriesView repositoryId={repositoryId}/>
            </Suspense>
        </div>
    )
}