'use server'

import {prisma} from "@/app/prisma";
import {Repository, readRepository} from "@/lib/database/repository";
import {Category} from "@prisma/client";
import {isAdmin, isLoggedIn} from "@/lib/auth";
import {redirect} from "next/navigation";

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
    if (!await isAdmin()) {
        redirect("/dashboard");
    }

    const result = await prisma.challenge.create({
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
    if (!await isLoggedIn()) {
        redirect("/login");
    }

    const results = await prisma.challenge.findMany()

    return await Promise.all(results.map(async (result) => {
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
    })) as Challenge[]
}

export async function readChallenge(id: string) {
    if (!await isLoggedIn()) {
        redirect("/login");
    }

    const result = await prisma.challenge.findUnique({
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
    if (!await isAdmin()) {
        redirect("/dashboard");
    }

    const result = await prisma.challenge.update({
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
    if (!await isAdmin()) {
        redirect("/dashboard");
    }

    const result = await prisma.challenge.delete({
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
