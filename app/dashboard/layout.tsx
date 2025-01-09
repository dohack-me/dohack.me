import {Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarProvider, SidebarTrigger} from "@/components/ui/sidebar";
import {cookies} from "next/headers";
import {Separator} from "@/components/ui/separator";
import React, {Suspense} from "react";
import Link from "next/link";
import {AppWindow, Home, LogOut, Settings, Swords} from "lucide-react";
import {ModeToggle} from "@/components/ModeToggle";
import {logOut} from "@/app/auth-actions";
import {isAdmin, requireUser} from "@/lib/auth";
import DashboardLoadingPage from "@/app/dashboard/loading";
import BreadcrumbsLoading from "@/app/dashboard/@breadcrumbs/loading";

const topitems = [
    {
        title: "Home",
        url: "/dashboard",
        icon: Home,
    },
    {
        title: "Challenges",
        url: "/dashboard/challenges",
        icon: Swords,
    }
]

export default async function DashboardLayout({children, breadcrumbs}: { children: React.ReactNode, breadcrumbs: React.ReactNode}) {
    return await requireUser(async() => {
        const cookieStore = cookies()
        const defaultOpen = cookieStore.get("sidebar:state")?.value === "true"

        const admin = await isAdmin()

        return (
            <SidebarProvider defaultOpen={defaultOpen} className={"flex-grow"}>
                <Sidebar>
                    <SidebarContent>
                        <SidebarGroup>
                            <SidebarGroupLabel>
                                <Link href="/">dohack.me ALPHA</Link>
                            </SidebarGroupLabel>
                            <SidebarGroupContent>
                                <SidebarMenu>
                                    {topitems.map((item) => (
                                        <SidebarMenuItem key={item.title}>
                                            <SidebarMenuButton asChild>
                                                <a href={item.url}>
                                                    <item.icon />
                                                    <span>{item.title}</span>
                                                </a>
                                            </SidebarMenuButton>
                                        </SidebarMenuItem>
                                    ))}
                                </SidebarMenu>
                            </SidebarGroupContent>
                        </SidebarGroup>
                    </SidebarContent>
                    <SidebarFooter>
                        <SidebarGroup>
                            <SidebarGroupContent>
                                <SidebarMenu>
                                    { admin &&
                                        <SidebarMenuItem key={"Admin Panel"}>
                                            <SidebarMenuButton asChild>
                                                <a href={"/dashboard/admin"}>
                                                    <AppWindow />
                                                    <span>Admin</span>
                                                </a>
                                            </SidebarMenuButton>
                                        </SidebarMenuItem>
                                    }
                                    <SidebarMenuItem key={"Log Out"}>
                                        <form action={logOut}>
                                            <SidebarMenuButton type={"submit"}>
                                                <LogOut />
                                                <span>Log Out</span>
                                            </SidebarMenuButton>
                                        </form>
                                    </SidebarMenuItem>
                                    <SidebarMenuItem key={"Settings"}>
                                        <SidebarMenuButton asChild>
                                            <a href={"/dashboard/settings"}>
                                                <Settings />
                                                <span>Settings</span>
                                            </a>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                    <ModeToggle />
                                </SidebarMenu>
                            </SidebarGroupContent>
                        </SidebarGroup>
                    </SidebarFooter>
                </Sidebar>
                <main className={"flex-grow flex flex-col"}>
                    <div className={"sticky top-0 bg-background w-full h-12 border-b-2 p-2 flex flex-row gap-x-4 items-center z-10"}>
                        <SidebarTrigger/>
                        <Separator orientation={"vertical"}/>
                        <Suspense fallback={<BreadcrumbsLoading/>}>
                            {breadcrumbs}
                        </Suspense>
                    </div>
                    <div className={"flex-grow flex flex-col"}>
                        <Suspense fallback={<DashboardLoadingPage/>}>
                            {children}
                        </Suspense>
                    </div>
                </main>
            </SidebarProvider>
        )
    }
)}