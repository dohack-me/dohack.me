"use server"

import {prisma} from "@/src/lib/globals"
import {Challenge, readChallenge} from "@/src/lib/database/challenges"

export type Website = {
    id: string
    image: string
    tag: string
    challenge: Challenge
}

export type EditableWebsite = {
    image: string
    tag: string
    challenge: Challenge
}

type RawWebsite = {
    id: string,
    image: string
    tag: string
    challengeId: string
}

async function objectToWebsite(result: RawWebsite) {
    return {
        id: result.id,
        image: result.image,
        tag: result.tag,
        challenge: await readChallenge(result.challengeId),
    } as Website
}

async function objectsToWebsites(results: RawWebsite[]) {
    return await Promise.all(
        results.map(async (result) => ({
            id: result.id,
            image: result.image,
            tag: result.tag,
            challenge: await readChallenge(result.challengeId),
        }) as Website),
    )
}

export async function createWebsiteService(data: EditableWebsite) {
    const result = await prisma.website.create({
        data: {
            image: data.image,
            tag: data.tag,
            challengeId: data.challenge.id,
        },
    })

    return await objectToWebsite(result)
}

export async function readWebsiteServices() {
    const results = await prisma.website.findMany()

    return await objectsToWebsites(results)
}

export async function readChallengeWebsiteServices(challengeId: string) {
    const results = await prisma.website.findMany({
        where: {
            challengeId: challengeId,
        },
    })

    return await objectsToWebsites(results)
}

export async function readWebsiteService(websiteId: string) {
    const result = await prisma.website.findUnique({
        where: {
            id: websiteId,
        },
    })

    if (result == null) return null

    return await objectToWebsite(result)
}

export async function deleteWebsiteService(websiteId: string) {
    const result = await prisma.website.delete({
        where: {
            id: websiteId,
        },
    })

    return await objectToWebsite(result)
}