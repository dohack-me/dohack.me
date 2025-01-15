'use server'

import rlsExtension, {prisma} from "@/src/lib/prisma";
import {getUserId} from "@/src/lib/users";

export async function createSolve(challengeId: string) {
    const userId = await getUserId()
    if (!userId) return null

    return await prisma.$extends(rlsExtension()).solves.create({
        data: {
            userId: userId,
            challengeId: challengeId,
        }
    })
}

export async function readChallengeSolves(challengeId: string) {
    return await prisma.$extends(rlsExtension()).solves.findMany({
        where: {
            challengeId: challengeId,
        }
    })
}

export async function readUserSolves() {
    const userId = await getUserId()
    if (!userId) return null

    return await prisma.$extends(rlsExtension()).solves.findMany({
        where: {
            userId: userId,
        }
    })
}

export async function readUserChallengeSolve(challengeId: string) {
    const userId = await getUserId()
    if (!userId) return null

    return await prisma.$extends(rlsExtension()).solves.findUnique({
        where: {
            userId_challengeId: {
                userId: userId,
                challengeId: challengeId,
            }
        }
    })
}

export async function deleteSolve(challengeId: string) {
    const userId = await getUserId()
    if (!userId) return null

    return await prisma.$extends(rlsExtension()).solves.delete({
        where: {
            userId_challengeId: {
                userId: userId,
                challengeId: challengeId,
            }
        }
    })
}