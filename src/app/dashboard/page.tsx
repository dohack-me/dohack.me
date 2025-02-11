import {Card, CardHeader, CardTitle, CardContent, CardDescription} from '@/src/components/ui/card'
import RandomChallenge from "@/src/app/dashboard/_components/RandomChallenge";
import React, {Suspense} from "react";
import LoadingTitleCard from "@/src/components/skeletons/LoadingTitleCard";
import CategoriesChartView from "@/src/app/dashboard/_components/CategoriesChartView";
import {Skeleton} from "@/src/components/ui/skeleton";
import {auth} from "@/src/lib/auth/auth";
import {redirect} from "next/navigation";

export default async function DashboardPage() {
    const session = await auth()
    if (!session) {
        redirect("/")
    }

    return (
        <div className={"flex-grow padding column"}>
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
            <Card>
                <CardHeader>
                    <CardTitle>Statistics</CardTitle>
                    <CardDescription>View your overall progress.</CardDescription>
                </CardHeader>
                <CardContent className={"grid-view"}>
                    <Card className={"aspect-square flex flex-col"}>
                        <Suspense fallback={<Skeleton className={"flex-grow"}/>}>
                            <CategoriesChartView/>
                        </Suspense>
                    </Card>
                </CardContent>
            </Card>
        </div>
    )
}