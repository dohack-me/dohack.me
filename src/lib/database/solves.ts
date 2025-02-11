"use server"

import {prisma} from '@/src/lib/globals'
import {getUserId} from "@/src/lib/auth/users";

export async function createSolve(challengeId: string) {
    const userId = await getUserId()
    if (!userId) return null

    return prisma.solve.create({
        data: {
            userId: userId,
            challengeId: challengeId,
        }
    })
}

export async function readChallengeSolves(challengeId: string) {
    return prisma.solve.findMany({
        where: {
            challengeId: challengeId,
        }
    })
}

export async function readUserSolves() {
    const userId = await getUserId()
    if (!userId) return null

    return prisma.solve.findMany({
        where: {
            userId: userId,
        }
    })
}

export async function readUserChallengeSolve(challengeId: string) {
    const userId = await getUserId()
    if (!userId) return null

    return prisma.solve.findUnique({
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

    return prisma.solve.delete({
        where: {
            userId_challengeId: {
                userId: userId,
                challengeId: challengeId,
            }
        }
    })
}