'use server'

import rlsExtension, {prisma} from "@/lib/prisma";
import {Repository, readRepository} from "@/lib/database/repository";
import {Category} from "@prisma/client";
import {deleteChallengeFile} from "@/lib/storage";

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
    imageId: string | null
}

export type EditableChallenge = {
    name: string
    description: string
    category: Category
    answer: string
    authors: string[]

    repository: Repository
    imageId: string | null
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
            imageId: data.imageId,
        }
    })

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
        imageId: result.imageId,
    } as Challenge
}

export async function readChallenges() {
    const results = await prisma.$extends(rlsExtension()).challenges.findMany()

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
            imageId: result.imageId,
        }) as Challenge)
    )
}

export async function readChallenge(id: string) {
    const result = await prisma.$extends(rlsExtension()).challenges.findUnique({
        where: {
            id: id
        }
    })

    if (result == null) return undefined

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
        imageId: result.imageId,
    } as Challenge
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
            imageId: data.imageId,
        }
    })

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
        imageId: result.imageId,
    } as Challenge
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
        imageId: result.imageId,
    } as Challenge
}
