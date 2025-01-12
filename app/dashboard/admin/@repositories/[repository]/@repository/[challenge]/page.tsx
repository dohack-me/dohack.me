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
                    <TabsList className={"tabs-list grid-cols-3"}>
                        <TabsTrigger value={"details"}>Details</TabsTrigger>
                        <TabsTrigger value={"files"}>Files</TabsTrigger>
                        <TabsTrigger value={"services"}>Services</TabsTrigger>
                    </TabsList>
                </CardContent>
            </Card>
            <Suspense fallback={<AdminChallengeOverviewLoading/>}>
                <TabsContent value={"details"} className={"flex-grow mt-0"}>
                    <EditChallengeView repositoryId={repositoryId} challengeId={challengeId}/>
                </TabsContent>
                <TabsContent value={"files"} className={"flex-grow mt-0"}>
                    <ChallengeFilesView challengeId={challengeId}/>
                </TabsContent>
                <TabsContent value={"services"} className={"flex-grow mt-0"}>
                    <ChallengeServiceView repositoryId={repositoryId} challengeId={challengeId}/>
                </TabsContent>
            </Suspense>
        </Tabs>
    )

    // instead of having one suspense for each tabscontent and component, i have one suspense for all components as
    // flex-grow respects components that take no space in dom when determining size for some reason
    // this causes the skeleton to only take up 1/3 of the available space lol
    // since this is admin/private ui, im fine taking speed loss here
}