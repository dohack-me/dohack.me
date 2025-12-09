"use server"

import {auth} from "@/src/lib/auth/auth"
import {headers} from "next/headers";

export async function getUserSession() {
    return await auth.api.getSession({
        headers: await headers()
    });
}

export async function getUserRole(): Promise<null | "user" | "admin"> {
    const session = await getUserSession()
    if (!session) {
        return null
    }

    if (session.user.role === "user" || session.user.role === "admin") {
        return session.user.role;
    }
    return null;
}

export async function getUserId(): Promise<string | null> {
    const session = await getUserSession()
    if (!session) {
        return null
    }

    return session.user.id;
}