"use server"

import {prisma} from "@/src/lib/globals"
import {Category, Challenge} from "@/src/lib/prisma"
import {deleteFolder, readFolderFiles} from "@/src/lib/storage"

export type EditableChallenge = {
    name: string
    description: string
    category: Category
    answer: string
    authors: string[]
    visible: boolean

    repositoryId: string
}

export async function createChallenge(data: EditableChallenge): Promise<Challenge> {
    return prisma.challenge.create({
        data: {
            name: data.name,
            description: data.description,
            category: data.category,
            answer: data.answer,
            authors: data.authors,
            visible: data.visible,

            repositoryId: data.repositoryId,
        },
    })
}

export async function readChallenges(): Promise<Challenge[]> {
    return prisma.challenge.findMany()
}

export async function readRepositoryChallenges(repositoryId: string): Promise<Challenge[]> {
    return prisma.challenge.findMany({
        where: {
            repositoryId: repositoryId,
        },
    })
}

export async function readChallenge(id: string): Promise<Challenge | null> {
    return prisma.challenge.findUnique({
        where: {
            id: id,
        },
    })
}

export async function updateChallenge(id: string, data: EditableChallenge): Promise<Challenge> {
    return prisma.challenge.update({
        where: {
            id: id,
        },
        data: {
            name: data.name,
            description: data.description,
            category: data.category,
            answer: data.answer,
            authors: data.authors,
            visible: data.visible,

            repositoryId: data.repositoryId,
        },
    })
}

export async function deleteChallenge(id: string): Promise<Challenge | null> {
    const challenge = await readChallenge(id)

    if (!challenge) return null

    const files = await readFolderFiles(`${challenge.repositoryId}/${challenge.id}`)
    if (files.length > 0) await deleteFolder(`${challenge.repositoryId}/${id}`)

    return prisma.challenge.delete({
        where: {
            id: id,
        },
    })
}
