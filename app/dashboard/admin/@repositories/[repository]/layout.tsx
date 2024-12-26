import React, {Suspense} from "react";
import AdminRepositoryLoading from "@/app/dashboard/admin/@repositories/[repository]/loading";
import {ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import AdminSidebar from "@/app/dashboard/admin/@repositories/[repository]/_components/AdminSidebar";

export default async function AdminRepositoryLayout({ params, repository }: { params: Promise<{repository: string}>, repository: React.ReactNode }) {
    const repositoryId = (await params).repository

    return (
        <ResizablePanelGroup direction={"horizontal"}>
            <ResizablePanel defaultSize={22.5}>
                <Suspense fallback={<AdminRepositoryLoading />}>
                    <AdminSidebar repositoryId={repositoryId}/>
                </Suspense>
            </ResizablePanel>
            <ResizableHandle className={"mx-4"}/>
            <ResizablePanel defaultSize={77.5}>
                <Suspense fallback={<AdminRepositoryLoading />}>
                    {repository}
                </Suspense>
            </ResizablePanel>
        </ResizablePanelGroup>
    )
}