import RepositoryTitleView from "@/src/app/dashboard/challenges/[repository]/_components/RepositoryTitleView"
import React, {Suspense} from "react"
import RepositoryChallengeView from "@/src/app/dashboard/challenges/[repository]/_components/RepositoryChallengeView"
import {ChevronLeftIcon} from "lucide-react"
import {Card, CardAction, CardHeader} from "@/src/components/ui/card"
import TitleCardTextSkeleton from "@/src/components/skeletons/TitleCardTextSkeleton"
import {Button} from "@/src/components/ui/button"
import Link from "next/link"
import {Skeleton} from "@/src/components/ui/skeleton"
import {prisma} from "@/src/lib/globals"
import {notFound} from "next/navigation"
import {isUUID} from "@/src/lib/utils"

export default async function RepositoryPage({params}: { params: Promise<{ repository: string }> }) {
    const repositoryId = (await params).repository
    if (!isUUID(repositoryId)) {
        notFound()
    }
    const visible = await prisma.repository.findUnique({
        where: {
            id: repositoryId,
        },
        select: {
            visible: true,
        },
    })
    if (!visible) {
        notFound()
    }

    return (
        <div className={"grow padding small-column"}>
            <Card>
                <CardHeader>
                    <Suspense fallback={<TitleCardTextSkeleton/>}>
                        <RepositoryTitleView repositoryId={repositoryId}/>
                    </Suspense>
                    <CardAction>
                        <Button asChild>
                            <Link href={`/dashboard/challenges`}>
                                <ChevronLeftIcon/>
                                <p className={"hidden lg:block"}>Back to Repositories</p>
                                <p className={"hidden sm:block lg:hidden"}>Back</p>
                            </Link>
                        </Button>
                    </CardAction>
                </CardHeader>
            </Card>
            <Suspense fallback={<Skeleton className={"grow"}/>}>
                <RepositoryChallengeView repositoryId={repositoryId}/>
            </Suspense>
        </div>
    )
}