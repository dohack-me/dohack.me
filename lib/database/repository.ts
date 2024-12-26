'use server'

import {prisma} from "@/app/prisma";
import {isAdmin, isLoggedIn} from "@/lib/auth";
import {redirect} from "next/navigation";

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
    if (!await isAdmin()) {
        redirect("/dashboard");
    }

    return (await prisma.repository.create({
        data: {
            name: data.name,
            sourceLink: data.sourceLink,
            organization: data.organization,
            organizationLink: data.organizationLink,
        }
    })) as Repository
}

export async function readRepositories() {
    if (!await isLoggedIn()) {
        redirect("/login");
    }

    return (await prisma.repository.findMany()) as Repository[]
}

export async function readRepository(id: string) {
    if (!await isLoggedIn()) {
        redirect("/login");
    }

    return (await prisma.repository.findUnique({
        where: {
            id: id
        }
    })) as Repository
}

export async function updateRepository(id: string, data: EditableRepository) {
    if (!await isAdmin()) {
        redirect("/dashboard");
    }

    return (await prisma.repository.update({
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
    if (!await isAdmin()) {
        redirect("/dashboard");
    }

    return (await prisma.repository.delete({
        where: {
            id: id
        }
    })) as Repository
}
