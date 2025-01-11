import React, {Suspense} from "react";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import CreateRepositoryButton from "@/app/dashboard/admin/@repositories/_components/CreateRepositoryButton";
import AdminImagesLoading from "@/app/dashboard/admin/@images/loading";
import ImagesView from "@/app/dashboard/admin/@images/_components/ImagesView";

export default async function AdminImagesPage() {
    return (
        <div className={"grow-col"}>
            <Card className={"grow-col"}>
                <CardHeader className={"flex flex-row justify-between"}>
                    <div className={"flex flex-col gap-y-1.5"}>
                        <CardTitle>Images</CardTitle>
                        <CardDescription>Images are used to run apps like websites and servers that are required by some challenges</CardDescription>
                    </div>
                    <CreateRepositoryButton/>
                </CardHeader>
                <CardContent className={"grow-col"}>
                    <Suspense fallback={<AdminImagesLoading/>}>
                        <ImagesView/>
                    </Suspense>
                </CardContent>
            </Card>
        </div>
    )
}