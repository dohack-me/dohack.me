import {Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarProvider, SidebarTrigger} from "@/src/components/ui/sidebar";
import {cookies} from "next/headers";
import {Separator} from "@/src/components/ui/separator";
import React, {Suspense} from "react";
import Link from "next/link";
import {AppWindow, Home, LogOut, Settings, Swords} from "lucide-react";
import {ModeToggle} from "@/src/components/ModeToggle";
import DashboardLoadingPage from "@/src/app/dashboard/loading";
import BreadcrumbsLoading from "@/src/app/dashboard/@breadcrumbs/loading";
import {auth, signOut} from "@/src/lib/auth/auth"
import {redirect} from "next/navigation";
import {getUserRole} from "@/src/lib/auth/users";
import {UserRole} from "@prisma/client";

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
    const session = await auth()
    if (!session) {
        redirect("/login")
    }

    const cookieStore = await cookies()
    const defaultOpen = cookieStore.get("sidebar:state")?.value === "true"

    const admin = (await getUserRole()) == UserRole.ADMIN

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
                                    <form action={async () => {
                                        "use server"
                                        await signOut()
                                    }}>
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