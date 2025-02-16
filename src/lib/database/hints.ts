"use server"

import {prisma} from '@/src/lib/globals'
import {Challenge, readChallenge} from "@/src/lib/database/challenges"

export type Hint = {
    id: string
    challenge: Challenge
    title: string
    hint: string
}

export type EditableHint = {
    challenge: Challenge
    title: string
    hint: string
}

type RawHint = {
    id: string
    challengeId: string
    title: string
    hint: string
}

async function objectToHint(result: RawHint) {
    return {
        id: result.id,
        challenge: (await readChallenge(result.challengeId))!,
        title: result.title,
        hint: result.hint,
    } as Hint
}

async function objectToHints(results: RawHint[]) {
    return await Promise.all(
        results.map(async (result) => ({
            id: result.id,
            challenge: (await readChallenge(result.challengeId))!,
            title: result.title,
            hint: result.hint,
        }) as Hint)
    )
}

export async function createHint(data: EditableHint) {
    const result = await prisma.hint.create({
        data: {
            challengeId: data.challenge.id,
            title: data.title,
            hint: data.hint
        }
    })

    return objectToHint(result)
}

export async function readHints() {
    const result = await prisma.hint.findMany()

    return objectToHints(result)
}

export async function readChallengeHints(challengeId: string) {
    const result = await prisma.hint.findMany({
        where: {
            challengeId: challengeId
        }
    })

    return objectToHints(result)
}

export async function readHint(id: string) {
    const result = await prisma.hint.findUnique({
        where: {
            id: id
        }
    })

    if (!result) return null

    return objectToHint(result)
}

export async function updateHint(id: string, data: EditableHint) {
    const result = await prisma.hint.update({
        where: {
            id: id
        },
        data: {
            challengeId: data.challenge.id,
            title: data.title,
            hint: data.hint
        }
    })

    return objectToHint(result)
}

export async function deleteHint(id: string) {
    const result = await prisma.hint.delete({
        where: {
            id: id
        }
    })

    return objectToHint(result)
}
