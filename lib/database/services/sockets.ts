'use server'

import {Challenge, readChallenge} from "@/lib/database/challenges";
import rlsExtension, {prisma} from "@/lib/prisma";

export type Socket = {
    id: string
    host: string
    port: number
    challenge: Challenge
}

export type EditableSocket = {
    host: string
    port: number
    challenge: Challenge
}

type RawSocket = {
    id: string,
    host: string
    port: number
    challengeId: string
}

async function objectToSocket(result: RawSocket) {
    return {
        id: result.id,
        host: result.host,
        port: result.port,
        challenge: await readChallenge(result.challengeId),
    } as Socket
}

async function objectsToSockets(results: RawSocket[]) {
    return await Promise.all(
        results.map(async (result) => ({
            id: result.id,
            host: result.host,
            port: result.port,
            challenge: await readChallenge(result.challengeId)
        }) as Socket)
    )
}

export async function createSocketService(data: EditableSocket) {
    const result = await prisma.$extends(rlsExtension()).sockets.create({
        data: {
            host: data.host,
            port: data.port,
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

    if (result == null) return undefined

    return await objectToSocket(result)
}