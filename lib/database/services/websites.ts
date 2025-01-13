'use server'

import {Challenge, readChallenge} from "@/lib/database/challenges";
import rlsExtension, {prisma} from "@/lib/prisma";

export type Website = {
    id: string
    url: string
    challenge: Challenge
}

export type EditableWebsite = {
    url: string
    challenge: Challenge
}

type RawWebsite = {
    id: string,
    url: string,
    challengeId: string
}

async function objectToWebsite(result: RawWebsite) {
    return {
        id: result.id,
        url: result.url,
        challenge: await readChallenge(result.challengeId),
    } as Website
}

async function objectsToWebsites(results: RawWebsite[]) {
    return await Promise.all(
        results.map(async (result) => ({
            id: result.id,
            url: result.url,
            challenge: await readChallenge(result.challengeId)
        }) as Website)
    )
}

export async function createWebsiteService(data: EditableWebsite) {
    const result = await prisma.$extends(rlsExtension()).websites.create({
        data: {
            url: data.url,
            challengeId: data.challenge.id,
        }
    })

    return await objectToWebsite(result)
}

export async function readWebsiteServices() {
    const results = await prisma.$extends(rlsExtension()).websites.findMany()

    return await objectsToWebsites(results)
}

export async function readChallengeWebsiteServices(challengeId: string) {
    const results = await prisma.$extends(rlsExtension()).websites.findMany({
        where: {
            challengeId: challengeId,
        }
    })

    return await objectsToWebsites(results)
}

export async function readWebsiteService(websiteId: string) {
    const result = await prisma.$extends(rlsExtension()).websites.findUnique({
        where: {
            id: websiteId,
        }
    })

    if (result == null) return undefined

    return await objectToWebsite(result)
}