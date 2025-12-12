import {SidebarProvider, SidebarTrigger} from "@/src/components/ui/sidebar"
import {cookies} from "next/headers"
import {Separator} from "@/src/components/ui/separator"
import React from "react"
import {redirect} from "next/navigation"
import {getUserSession} from "@/src/lib/auth/users"
import AppSidebar from "@/src/components/AppSidebar";
import PostHogIdentify from "@/src/app/dashboard/_components/PostHogIdentify";

export default async function DashboardLayout({children, breadcrumbs}: {
    children: React.ReactNode,
    breadcrumbs: React.ReactNode
}) {
    const session = await getUserSession()
    if (!session) {
        redirect("/login")
    }

    const cookieStore = await cookies()
    const defaultOpen = cookieStore.get("sidebar_state")?.value === "true"

    return (
        <SidebarProvider defaultOpen={defaultOpen}>
            <AppSidebar/>
            <div className={"grow-col"}>
                <header
                    className={"sticky top-0 h-12 p-2 small-row items-center bg-background border-b-2"}>
                    <SidebarTrigger/>
                    <Separator orientation={"vertical"}/>
                    {breadcrumbs}
                </header>
                <main className={"margin grow-col"}>
                    {children}
                </main>
            </div>
            <footer>
                <PostHogIdentify userId={session.user.id} email={session.user.email} name={session.user.name}/>
            </footer>
        </SidebarProvider>
    )
}