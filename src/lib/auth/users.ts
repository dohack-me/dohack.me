"use server"

import {auth} from "@/src/lib/auth/auth";
import {prisma} from "@/src/lib/globals";

export async function getUserId() {
    const session = await auth()
    if (!session || !(session.user) || !(session.user.id)) {
        return null
    }

    const result = await prisma.customUser.findUnique({
        where: {
            userId: session.user.id,
        },
    })
    if (!result) {
        return null
    }
    return result.id
}

export async function getUserRole() {
    const session = await auth()
    if (!session || !(session.user) || !(session.user.id)) {
        return null
    }

    const result = await prisma.customUser.findUnique({
        where: {
            userId: session.user.id,
        },
    })
    if (!result) {
        return null
    }
    return result.role
}