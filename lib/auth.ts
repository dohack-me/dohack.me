import {getServerClient} from "@/lib/supabase/server";
import {AppRole} from "@prisma/client";
import {redirect} from "next/navigation";
import {User} from "@supabase/supabase-js";
import React from "react";
import {prisma} from "@/lib/prisma";

export async function isLoggedIn() {
    const supabase = await getServerClient()

    const { data, error } = await supabase.auth.getUser()
    if (error || !data?.user) {
        return null
    }
    return data
}

export async function isAdmin() {
    const supabase = await getServerClient()

    const { data, error } = await supabase.auth.getUser()
    if (error || !data?.user) {
        return null
    }

    const userRole = (await prisma.user_Role.findFirst({
        where: {id: data.user.id},
    }))

    if (userRole == null || userRole.role != AppRole.ADMIN) {
        return null
    }
    return data
}

export async function requireUser(component: (data: User) => Promise<React.ReactElement>) {
    const data = await isLoggedIn()
    if (!data) {
        redirect("/login")
    }
    return await component(data.user)
}

export async function requireAdmin(component: (data: User) => Promise<React.ReactElement>) {
    const data = await isAdmin()
    if (!data) {
        redirect("/login")
    }
    return await component(data.user)
}
