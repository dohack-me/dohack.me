import {Card, CardHeader, CardTitle, CardContent, CardDescription} from '@/src/components/ui/card'
import RandomChallenge from "@/src/app/dashboard/_components/RandomChallenge";
import React, {Suspense} from "react";
import LoadingTitleCard from "@/src/components/skeletons/LoadingTitleCard";
import SolvesCategoriesChartView from "@/src/app/dashboard/_components/charts/SolvesCategoriesChartView";
import {Skeleton} from "@/src/components/ui/skeleton";
import {auth} from "@/src/lib/auth/auth";
import {redirect} from "next/navigation";
import Link from "next/link";
import ImportantChallengesView from "@/src/app/dashboard/_components/ImportantChallengesView";
import SolvesTotalChartView from "@/src/app/dashboard/_components/charts/SolvesTotalChartView";

export default async function DashboardPage() {
    const session = await auth()
    if (!session) redirect("/")

    return (
        <div className={"grow padding column"}>
            <Card>
                <CardHeader>
                    <CardTitle className={"text-center"}>Welcome, {(session.user && session.user.name) ? session.user.name : "User"}!</CardTitle>
                    <CardDescription className={"text-center"}>Here&apos;s a random challenge for you to try.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Suspense fallback={<LoadingTitleCard/>}>
                        <RandomChallenge/>
                    </Suspense>
                </CardContent>
            </Card>
            <div className={"grid grid-cols-2 gap-x-8"}>
                <Card>
                    <CardHeader>
                        <CardTitle>Statistics</CardTitle>
                        <CardDescription>View your overall progress.</CardDescription>
                    </CardHeader>
                    <CardContent className={"grid grid-flow-col auto-cols-fr gap-x-8"}>
                        <Suspense fallback={<Skeleton className={"aspect-square"}/>}>
                            <SolvesCategoriesChartView/>
                        </Suspense>
                        <Suspense fallback={<Skeleton className={"aspect-square"}/>}>
                            <SolvesTotalChartView/>
                        </Suspense>
                    </CardContent>
                </Card>
                <Card className={"flex flex-col"}>
                    <CardHeader>
                        <CardTitle>Previous Challenges</CardTitle>
                        <CardDescription>Return to bookmarked challenges and challenges with active instances.</CardDescription>
                    </CardHeader>
                    <CardContent className={"grow-col"}>
                        <Suspense fallback={<Skeleton className={"grow"}/>}>
                            <ImportantChallengesView/>
                        </Suspense>
                    </CardContent>
                </Card>
            </div>
            <Card>
                <CardHeader>
                    <CardTitle>dohack.me is in Alpha!</CardTitle>
                    <div>
                        <CardDescription>Features, UI and challenges are subject to change.</CardDescription>
                        <CardDescription>Any problems or suggestions? Contact me on <Link href={"https://discord.com/users/301279262994857987"} className={"underline"} rel={"noopener noreferrer"} target={"_blank"}>Discord</Link>.</CardDescription>
                    </div>
                </CardHeader>
            </Card>
        </div>
    )
}