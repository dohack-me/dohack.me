'use server'

import {prisma} from '@/src/lib/globals'
import rlsExtension from "@/src/lib/prisma";
import {Repository, readRepository} from "@/src/lib/database/repositories";
import {Category} from "@prisma/client";
import {deleteChallengeFile} from "@/src/lib/storage";

export type Challenge = {
    id: string
    name: string
    description: string
    category: Category
    answer: string
    authors: string[]

    createdAt: Date
    updatedAt: Date

    repository: Repository
}

export type EditableChallenge = {
    name: string
    description: string
    category: Category
    answer: string
    authors: string[]

    repository: Repository
}

type RawChallenge = {
    id: string
    name: string
    description: string
    category: Category
    answer: string
    authors: string[]
    createdAt: Date
    updatedAt: Date
    repositoryId: string
}

async function objectToChallenge(result: RawChallenge) {
    return {
        id: result.id,
        name: result.name,
        description: result.description,
        category: result.category,
        answer: result.answer,
        authors: result.authors,

        createdAt: result.createdAt,
        updatedAt: result.updatedAt,

        repository: await readRepository(result.repositoryId),
    } as Challenge
}

async function objectsToChallenges(results: RawChallenge[]) {
    return await Promise.all(
        results.map(async (result) => ({
            id: result.id,
            name: result.name,
            description: result.description,
            category: result.category,
            answer: result.answer,
            authors: result.authors,

            createdAt: result.createdAt,
            updatedAt: result.updatedAt,

            repository: await readRepository(result.repositoryId),
        }) as Challenge)
    )
}

export async function createChallenge(data: EditableChallenge) {
    const result = await prisma.$extends(rlsExtension()).challenges.create({
        data: {
            name: data.name,
            description: data.description,
            category: data.category,
            answer: data.answer,
            authors: data.authors,

            repositoryId: data.repository.id,
        }
    })

    return await objectToChallenge(result)
}

export async function readChallenges() {
    const results = await prisma.$extends(rlsExtension()).challenges.findMany()

    return await objectsToChallenges(results)
}

export async function readRepositoryChallenges(repositoryId: string) {
    const results = await prisma.$extends(rlsExtension()).challenges.findMany({
        where: {
            repositoryId: repositoryId
        }
    })

    return await objectsToChallenges(results)
}

export async function readChallenge(id: string) {
    const result = await prisma.$extends(rlsExtension()).challenges.findUnique({
        where: {
            id: id
        }
    })

    if (result == null) return null

    return await objectToChallenge(result)
}

export async function updateChallenge(id: string, data: EditableChallenge) {
    const result = await prisma.$extends(rlsExtension()).challenges.update({
        where: {
            id: id
        },
        data: {
            name: data.name,
            description: data.description,
            category: data.category,
            answer: data.answer,
            authors: data.authors,

            repositoryId: data.repository.id,
        }
    })

    return await objectToChallenge(result)
}

export async function deleteChallenge(id: string) {
    const repositoryId = await prisma.$extends(rlsExtension()).challenges.findUniqueOrThrow({
        where: {
            id: id
        },
        select: {
            repositoryId: true
        }
    })

    await deleteChallengeFile(`${repositoryId}/${id}`)

    const result = await prisma.$extends(rlsExtension()).challenges.delete({
        where: {
            id: id
        }
    })

    return await objectToChallenge(result)
}
