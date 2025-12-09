"use client"

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarRail
} from "@/src/components/ui/sidebar";
import Link from "next/link";
import {Home, LogOut, Moon, Sun, Swords} from "lucide-react";
import {authClient} from "@/src/lib/auth/client";
import React from "react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from "@/src/components/ui/dropdown-menu";
import {useTheme} from "next-themes";

const topItems = [
    {
        title: "Home",
        url: "/dashboard",
        icon: Home,
    },
    {
        title: "Challenges",
        url: "/dashboard/challenges",
        icon: Swords,
    },
]

export default function AppSidebar() {
    const {setTheme} = useTheme()

    return (
        <Sidebar>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>
                        <Link href={"/"}>dohack.me ALPHA</Link>
                    </SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {topItems.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild>
                                        <a href={item.url}>
                                            <item.icon/>
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
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <SidebarMenuItem key={"theme"}>
                                        <SidebarMenuButton>
                                            <Sun className="scale-100 dark:scale-0"/>
                                            <Moon className="absolute scale-0 dark:scale-100"/>
                                            <span>Toggle theme</span>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent>
                                    <DropdownMenuItem onClick={() => setTheme("light")}>
                                        Light
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => setTheme("dark")}>
                                        Dark
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => setTheme("system")}>
                                        System
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                            <SidebarMenuItem>
                                <SidebarMenuButton onClick={async () => await authClient.signOut()}>
                                    <LogOut/>
                                    <span>Log Out</span>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
                <SidebarRail/>
            </SidebarFooter>
        </Sidebar>
    )
}