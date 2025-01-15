import React, {Suspense} from "react";
import ChallengeTitleView
    from "@/src/app/dashboard/admin/@repositories/[repository]/@repository/[challenge]/__components/ChallengeTitleView";
import EditChallengeView
    from "@/src/app/dashboard/admin/@repositories/[repository]/@repository/[challenge]/__components/details/EditChallengeView";
import ChallengeFilesView
    from "@/src/app/dashboard/admin/@repositories/[repository]/@repository/[challenge]/__components/files/ChallengeFilesView";
import AdminChallengeOverviewLoading
    from "@/src/app/dashboard/admin/@repositories/[repository]/@repository/[challenge]/loading";
import {Card, CardContent, CardHeader} from "@/src/components/ui/card";
import TitleCardTextSkeleton from "@/src/components/skeletons/TitleCardTextSkeleton";
import {Button} from "@/src/components/ui/button";
import Link from "next/link";
import {ChevronLeftIcon} from "lucide-react";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/src/components/ui/tabs";
import ChallegeServicesView
    from "@/src/app/dashboard/admin/@repositories/[repository]/@repository/[challenge]/__components/services/ChallegeServicesView";

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
            <TabsContent value={"details"} className={"flex-grow mt-0"}>
                <div className={"h-full w-full flex flex-col"}>
                    <Suspense fallback={<AdminChallengeOverviewLoading/>}>
                        <EditChallengeView repositoryId={repositoryId} challengeId={challengeId}/>
                    </Suspense>
                </div>
            </TabsContent>
            <TabsContent value={"files"} className={"flex-grow mt-0"}>
                <div className={"h-full w-full flex flex-col"}>
                    <Suspense fallback={<AdminChallengeOverviewLoading/>}>
                        <ChallengeFilesView challengeId={challengeId}/>
                    </Suspense>
                </div>
            </TabsContent>
            <TabsContent value={"services"} className={"flex-grow mt-0"}>
                <div className={"h-full w-full small-column"}>
                    <Suspense fallback={<AdminChallengeOverviewLoading/>}>
                        <ChallegeServicesView challengeId={challengeId}/>
                    </Suspense>
                </div>
            </TabsContent>
        </Tabs>
)
}