"use client"

import * as React from "react"
import {Moon, Sun} from "lucide-react"
import {useTheme} from "next-themes"
import {SidebarMenuButton, SidebarMenuItem} from "@/src/components/ui/sidebar";
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from "@/src/components/ui/dropdown-menu"

export function ModeToggle() {
    const {setTheme} = useTheme()

    return (
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
            <DropdownMenuContent align="end">
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

    )
}
