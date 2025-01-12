'use server'

import rlsExtension, {prisma} from "@/lib/prisma";
import {deleteChallengeFile} from "@/lib/storage";

export type Repository = {
    id: string
    name: string
    sourceLink: string
    organization: string
    organizationLink: string
    createdAt: Date
    updatedAt: Date
}

export type EditableRepository = {
    name: string
    sourceLink: string
    organization: string
    organizationLink: string
}

export async function createRepository(data: EditableRepository) {
    return (await prisma.$extends(rlsExtension()).repositories.create({
        data: {
            name: data.name,
            sourceLink: data.sourceLink,
            organization: data.organization,
            organizationLink: data.organizationLink,
        }
    })) as Repository
}

export async function readRepositories() {
    return (await prisma.$extends(rlsExtension()).repositories.findMany()) as Repository[]
}

export async function readRepository(id: string) {
    return (await prisma.$extends(rlsExtension()).repositories.findUnique({
        where: {
            id: id
        }
    })) as Repository
}

export async function updateRepository(id: string, data: EditableRepository) {
    return (await prisma.$extends(rlsExtension()).repositories.update({
        where: {
            id: id
        },
        data: {
            name: data.name,
            sourceLink: data.sourceLink,
            organization: data.organization,
            organizationLink: data.organizationLink,
        }
    })) as Repository
}

export async function deleteRepository(id: string) {
    await deleteChallengeFile(id)

    return (await prisma.$extends(rlsExtension()).repositories.delete({
        where: {
            id: id
        }
    })) as Repository
}
