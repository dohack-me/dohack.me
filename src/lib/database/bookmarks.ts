"use server"

import {prisma} from '@/src/lib/globals'
import {getUserId} from "@/src/lib/auth/users";

export async function createBookmark(challengeId: string) {
    const userId = await getUserId()
    if (!userId) return null

    return prisma.bookmark.create({
        data: {
            userId: userId,
            challengeId: challengeId,
        }
    })
}

export async function readChallengeBookmarks(challengeId: string) {
    return prisma.bookmark.findMany({
        where: {
            challengeId: challengeId,
        }
    })
}

export async function readUserBookmarks() {
    const userId = await getUserId()
    if (!userId) return null

    return prisma.bookmark.findMany({
        where: {
            userId: userId,
        }
    })
}

export async function readUserChallengeBookmark(challengeId: string) {
    const userId = await getUserId()
    if (!userId) return null

    return prisma.bookmark.findUnique({
        where: {
            userId_challengeId: {
                userId: userId,
                challengeId: challengeId,
            }
        }
    })
}

export async function deleteBookmark(challengeId: string) {
    const userId = await getUserId()
    if (!userId) return null

    return prisma.bookmark.delete({
        where: {
            userId_challengeId: {
                userId: userId,
                challengeId: challengeId,
            }
        }
    })
}