'use server'

import {prisma} from '@/src/lib/globals'
import {Challenge, readChallenge} from "@/src/lib/database/challenges";
import rlsExtension from "@/src/lib/prisma";

export type Socket = {
    id: string
    image: string
    tag: string
    challenge: Challenge
}

export type EditableSocket = {
    image: string
    tag: string
    challenge: Challenge
}

type RawSocket = {
    id: string,
    image: string
    tag: string
    challengeId: string
}

async function objectToSocket(result: RawSocket) {
    return {
        id: result.id,
        image: result.image,
        tag: result.tag,
        challenge: await readChallenge(result.challengeId),
    } as Socket
}

async function objectsToSockets(results: RawSocket[]) {
    return await Promise.all(
        results.map(async (result) => ({
            id: result.id,
            image: result.image,
            tag: result.tag,
            challenge: await readChallenge(result.challengeId)
        }) as Socket)
    )
}

export async function createSocketService(data: EditableSocket) {
    const result = await prisma.$extends(rlsExtension()).sockets.create({
        data: {
            image: data.image,
            tag: data.tag,
            challengeId: data.challenge.id,
        }
    })

    return await objectToSocket(result)
}

export async function readSocketServices() {
    const results = await prisma.$extends(rlsExtension()).sockets.findMany()

    return await objectsToSockets(results)
}

export async function readChallengeSocketServices(challengeId: string) {
    const results = await prisma.$extends(rlsExtension()).sockets.findMany({
        where: {
            challengeId: challengeId,
        }
    })

    return await objectsToSockets(results)
}

export async function readSocketService(socketId: string) {
    const result = await prisma.$extends(rlsExtension()).sockets.findUnique({
        where: {
            id: socketId,
        }
    })

    if (result == null) return null

    return await objectToSocket(result)
}