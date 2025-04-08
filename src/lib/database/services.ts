"use server"

import {prisma} from "@/src/lib/globals"
import {Challenge, readChallenge} from "@/src/lib/database/challenges"
import {$Enums, ServiceType} from "@prisma/client"

export type Service = {
    id: string
    image: string
    tag: string
    type: ServiceType
    challenge: Challenge
}

export type EditableService = {
    image: string
    tag: string
    type: ServiceType
    challenge: Challenge
}

type RawService = {
    id: string,
    image: string
    tag: string
    type: $Enums.ServiceType
    challengeId: string
}

async function objectToService(result: RawService) {
    return {
        id: result.id,
        image: result.image,
        tag: result.tag,
        type: result.type,
        challenge: await readChallenge(result.challengeId),
    } as Service
}

async function objectsToServices(results: RawService[]) {
    return await Promise.all(
        results.map(async (result) => ({
            id: result.id,
            image: result.image,
            tag: result.tag,
            type: result.type,
            challenge: await readChallenge(result.challengeId),
        }) as Service),
    )
}

export async function createService(data: EditableService) {
    const result = await prisma.service.create({
        data: {
            image: data.image,
            tag: data.tag,
            type: data.type,
            challengeId: data.challenge.id,
        },
    })

    return await objectToService(result)
}

export async function readServices() {
    const results = await prisma.service.findMany()

    return await objectsToServices(results)
}

export async function readChallengeServices(challengeId: string) {
    const results = await prisma.service.findMany({
        where: {
            challengeId: challengeId,
        },
    })

    return await objectsToServices(results)
}

export async function readService(serviceId: string) {
    const result = await prisma.service.findUnique({
        where: {
            id: serviceId,
        },
    })

    if (result == null) return null

    return await objectToService(result)
}

export async function deleteService(serviceId: string) {
    const result = await prisma.service.delete({
        where: {
            id: serviceId,
        },
    })

    return await objectToService(result)
}