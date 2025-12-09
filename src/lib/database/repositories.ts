"use server"

import {prisma} from "@/src/lib/globals"
import {deleteFolder, readFolderFiles} from "@/src/lib/storage"
import {Repository} from "@/src/lib/prisma"

export type EditableRepository = {
    name: string
    sourceLink: string
    organization: string
    organizationLink: string
    visible: boolean
}

export async function createRepository(data: EditableRepository): Promise<Repository> {
    return (await prisma.repository.create({
        data: {
            name: data.name,
            sourceLink: data.sourceLink,
            organization: data.organization,
            organizationLink: data.organizationLink,
            visible: data.visible,
        },
    })) as Repository
}

export async function readRepositories(): Promise<Repository[]> {
    return (await prisma.repository.findMany()) as Repository[]
}

export async function readRepository(id: string): Promise<Repository> {
    return (await prisma.repository.findUnique({
        where: {
            id: id,
        },
    })) as Repository
}

export async function updateRepository(id: string, data: EditableRepository): Promise<Repository> {
    return (await prisma.repository.update({
        where: {
            id: id,
        },
        data: {
            name: data.name,
            sourceLink: data.sourceLink,
            organization: data.organization,
            organizationLink: data.organizationLink,
            visible: data.visible,
        },
    })) as Repository
}

export async function deleteRepository(id: string): Promise<Repository | null> {
    const repository = await readRepository(id)

    if (!repository) return null

    const challengeFolders = await readFolderFiles(`${repository.id}`)
    for (const challengeFolder of challengeFolders) {
        await deleteFolder(`${repository.id}/${challengeFolder}`)
    }

    return (await prisma.repository.delete({
        where: {
            id: id,
        },
    })) as Repository
}
