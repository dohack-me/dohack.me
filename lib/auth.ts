import {getServerClient} from "@/lib/supabase/server";
import {prisma} from "@/app/prisma";
import {AppRole} from "@prisma/client";

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

export async function isLoggedIn() {
    const supabase = await getServerClient()

    const { data, error } = await supabase.auth.getUser()
    if (error || !data?.user) {
        return null
    }
    return data
}