import React, {Suspense} from "react";
import ChallengeTitleView
    from "@/app/dashboard/admin/@repositories/[repository]/@repository/[challenge]/_components/ChallengeTitleView";
import EditChallengeView
    from "@/app/dashboard/admin/@repositories/[repository]/@repository/[challenge]/_components/details/EditChallengeView";
import ChallengeFilesView
    from "@/app/dashboard/admin/@repositories/[repository]/@repository/[challenge]/_components/files/ChallengeFilesView";
import AdminChallengeOverviewLoading
    from "@/app/dashboard/admin/@repositories/[repository]/@repository/[challenge]/loading";
import {Card, CardContent, CardHeader} from "@/components/ui/card";
import TitleCardTextSkeleton from "@/components/skeletons/TitleCardTextSkeleton";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import {ChevronLeftIcon} from "lucide-react";
import ChallengeServiceView
    from "@/app/dashboard/admin/@repositories/[repository]/@repository/[challenge]/_components/services/ChallengeServiceView";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";

export default async function AdminChallengeOverviewPage({ params }: { params: Promise<{ repository: string, challenge: string }>}) {
    const paramsObj = await params
    const repositoryId = paramsObj.repository
    const challengeId = paramsObj.challenge

    return (
        <Tabs className={"h-full w-full flex flex-col gap-y-4"} defaultValue={"details"}>
            <Card>
                <CardHeader className={"header-with-button"}>
                    <Suspense fallback={<TitleCardTextSkeleton/>}>
                        <ChallengeTitleView challengeId={challengeId}/>
                    </Suspense>
                    <Button asChild>
                        <Link href={`/dashboard/admin/${repositoryId}`}>
                            <ChevronLeftIcon/>
                            <p className={"hidden lg:block"}>Back to Repository</p>
                            <p className={"hidden sm:block lg:hidden"}>Back</p>
                        </Link>
                    </Button>
                </CardHeader>
                <CardContent>
                    <TabsList className={"w-full"}>
                        <TabsTrigger value={"details"}>Details</TabsTrigger>
                        <TabsTrigger value={"files"}>Files</TabsTrigger>
                        <TabsTrigger value={"services"}>Services</TabsTrigger>
                    </TabsList>
                </CardContent>
            </Card>
            <div className={"grow-col *:grow-col"}>
                <TabsContent value={"details"}>
                    <Suspense fallback={<AdminChallengeOverviewLoading/>}>
                        <EditChallengeView repositoryId={repositoryId} challengeId={challengeId}/>
                    </Suspense>
                </TabsContent>
                <TabsContent value={"files"}>
                    <Suspense fallback={<AdminChallengeOverviewLoading/>}>
                        <ChallengeFilesView challengeId={challengeId}/>
                    </Suspense>
                </TabsContent>
                <TabsContent value={"services"}>
                    <Suspense fallback={<AdminChallengeOverviewLoading/>}>
                        <ChallengeServiceView repositoryId={repositoryId} challengeId={challengeId}/>
                    </Suspense>
                </TabsContent>
            </div>
        </Tabs>
    )
}