import {Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarProvider, SidebarTrigger} from "@/components/ui/sidebar";
import {cookies} from "next/headers";
import {Separator} from "@/components/ui/separator";
import {Breadcrumb, BreadcrumbList} from "@/components/ui/breadcrumb";
import React, {Suspense} from "react";
import Link from "next/link";
import {AppWindow, Home, LogOut, Settings, Swords} from "lucide-react";
import {ModeToggle} from "@/components/mode-toggle";
import {logOut} from "@/app/auth-actions";
import {getServerClient} from "@/lib/supabase/server";
import {prisma} from "@/app/prisma";
import {AppRole} from "@prisma/client";
import {Skeleton} from "@/components/ui/skeleton";

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

export default async function DashboardLayout({children, breadcrumbs}: { children: React.ReactNode, breadcrumbs: React.ReactNode }) {
    const cookieStore = cookies()
    const defaultOpen = cookieStore.get("sidebar:state")?.value === "true"

    const supabase = await getServerClient()

    let admin = false

    const { data, error } = await supabase.auth.getUser()
    if (!error && data?.user) {
        const userRole = (await prisma.user_Role.findFirst({
            where: {id: data.user.id},
        }))

        if (userRole != null && userRole.role == AppRole.ADMIN) {
            admin = true
        }
    }

    return (
        <SidebarProvider defaultOpen={defaultOpen} className={"h-full w-full"}>
            <Sidebar>
                <SidebarContent>
                    <SidebarGroup>
                        <SidebarGroupLabel>
                            <Link href="/">dohack.me</Link>
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
            <main className={"h-full w-full flex flex-col"}>
                <div className={"sticky top-0 bg-background w-full h-12 border-b-2 p-2 flex flex-row gap-x-4 items-center"}>
                    <SidebarTrigger/>
                    <Separator orientation={"vertical"}/>
                    <Suspense fallback={<Skeleton className={"h-full w-full"}/>}>
                        <Breadcrumb className={"h-full w-full"}>
                            <BreadcrumbList className={"h-full w-full"}>
                                {breadcrumbs}
                            </BreadcrumbList>
                        </Breadcrumb>
                    </Suspense>
                </div>
                <div className={"flex-1 h-full w-full"}>
                    {children}
                </div>
            </main>
        </SidebarProvider>
    )
}