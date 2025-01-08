import {Card, CardHeader, CardTitle, CardContent, CardDescription} from '@/components/ui/card'
import {requireUser} from "@/lib/auth";
import RandomChallenge from "@/app/dashboard/_components/RandomChallenge";
import React, {Suspense} from "react";
import LoadingTitleCard from "@/components/skeletons/LoadingTitleCard";

export default async function DashboardPage() {
    return await requireUser(async(data) => {
        return (
            <div className={"flex-grow flex flex-col py-4 px-8 gap-y-8"}>
                <Card>
                    <CardHeader>
                        <CardTitle className={"text-center"}>Welcome, {data.user_metadata["preferred_username"]}!</CardTitle>
                        <CardDescription className={"text-center"}>Here&apos;s a random challenge for you to try.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Suspense fallback={<LoadingTitleCard/>}>
                            <RandomChallenge/>
                        </Suspense>
                    </CardContent>
                </Card>
            </div>
        )
    })
}