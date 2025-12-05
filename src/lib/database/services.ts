"use server"

import {prisma} from "@/src/lib/globals"
import {Service, ServiceType} from "@/src/lib/prisma"

export type EditableService = {
    image: string
    tag: string
    type: ServiceType

    challengeId: string
}

export async function createService(data: EditableService): Promise<Service> {
    return prisma.service.create({
        data: {
            image: data.image,
            tag: data.tag,
            type: data.type,
            challengeId: data.challengeId,
        },
    })
}

export async function readServices(): Promise<Service[]> {
    return prisma.service.findMany()
}

export async function readChallengeServices(challengeId: string): Promise<Service[]> {
    return prisma.service.findMany({
        where: {
            challengeId: challengeId,
        },
    })
}

export async function readService(serviceId: string): Promise<Service | null> {
    return prisma.service.findUnique({
        where: {
            id: serviceId,
        },
    })
}

export async function deleteService(serviceId: string): Promise<Service> {
    return prisma.service.delete({
        where: {
            id: serviceId,
        },
    })
}