import {Card, CardHeader, CardTitle} from "@/components/ui/card";
import React, {Suspense} from "react";
import AdminRepositoriesLoading from "@/app/dashboard/admin/@repositories/loading";
import {requireAdmin} from "@/lib/auth";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import AdminImagesLoading from "@/app/dashboard/admin/@images/loading";

export default async function Layout({repositories, images}: {repositories: React.ReactNode, images: React.ReactNode}) {
    return await requireAdmin(async() => {
        return (
            <Tabs className={"grow-col padding gap-y-4"} defaultValue={"repositories"}>
                <Card className={"flex flex-col"}>
                    <CardHeader className={"flex flex-col gap-y-2 text-center"}>
                        <CardTitle>Admin Panel</CardTitle>
                        <TabsList>
                            <TabsTrigger value={"repositories"}>Repositories</TabsTrigger>
                            <TabsTrigger value={"images"}>Images</TabsTrigger>
                        </TabsList>
                    </CardHeader>
                </Card>
                <div className={"grow-col"}>
                    <TabsContent value={"repositories"}>
                        <Suspense fallback={<AdminRepositoriesLoading/>}>
                            {repositories}
                        </Suspense>
                    </TabsContent>
                    <TabsContent value={"images"}>
                        <Suspense fallback={<AdminImagesLoading/>}>
                            {images}
                        </Suspense>
                    </TabsContent>
                </div>
            </Tabs>
        )
    })
}