"use server"

import {getUserId} from "@/src/lib/auth/users"
import {prisma} from "@/src/lib/globals"
import {readService} from "@/src/lib/database/services"
import PostHogClient from "@/src/lib/posthog/posthog"
import {Service} from "@/src/lib/prisma"

export type ServiceInstance = {
    id: string
    service: Service,
    userId: string,
    endpoint: string,
    expiry: Date,
}

export type RawServiceInstance = {
    id: string
    serviceId: string,
    userId: string,
    endpoint: string,
    expiry: Date,
}

async function objectToServiceInstance(result: RawServiceInstance) {
    return {
        id: result.id,
        service: (await readService(result.serviceId))!,
        userId: result.userId,
        endpoint: result.endpoint,
        expiry: result.expiry,
    } as ServiceInstance
}

async function objectToServiceInstances(results: RawServiceInstance[]) {
    return await Promise.all(
        results.map(async (result) => ({
            id: result.id,
            service: (await readService(result.serviceId))!,
            userId: result.userId,
            endpoint: result.endpoint,
            expiry: result.expiry,
        }) as ServiceInstance),
    )
}

export async function createServiceInstance(service: Service) {
    const userId = await getUserId()
    if (!userId) return null

    await cleanExpiredServiceInstance(service)

    const response = await fetch(`${process.env.BACKEND_URL!}/api/v1/service/`, {
        method: "POST",
        body: JSON.stringify({
            "image": service.image,
            "tag": service.tag,
            "type": service.type,
        }),
        headers: {
            "Content-Type": "application/json",
            "Authorization": process.env.BACKEND_SECRET_KEY!,
        },
    })

    if (!response.ok) return null
    const data: {
        id: string
        endpoint: string
        expiry: string
    } = await response.json()

    const result = await prisma.serviceInstance.create({
        data: {
            serviceId: service.id,
            userId: userId,
            id: data.id,
            endpoint: data.endpoint,
            expiry: new Date(data.expiry),
        },
    })

    const instance = await objectToServiceInstance(result)

    PostHogClient().capture({
        event: "Service instance created",
        distinctId: userId,
        properties: {
            instance: instance
        }
    })

    return instance
}

export async function readUserServiceInstance(serviceId: string) {
    const currentTimestamp = new Date()
    const userId = await getUserId()
    if (!userId) return null
    const result = await prisma.serviceInstance.findUnique({
        where: {
            userId_serviceId: {
                userId: userId,
                serviceId: serviceId,
            },
            expiry: {
                gte: currentTimestamp,
            },
        },
    })

    if (result == null) return null
    return await objectToServiceInstance(result)
}

export async function readUserServiceExpiredInstance(serviceId: string) {
    const currentTimestamp = new Date()
    const userId = await getUserId()
    if (!userId) return null
    const result = await prisma.serviceInstance.findUnique({
        where: {
            userId_serviceId: {
                userId: userId,
                serviceId: serviceId,
            },
            expiry: {
                lt: currentTimestamp,
            },
        },
    })

    if (result == null) return null
    return await objectToServiceInstance(result)
}

export async function readUserServiceInstances() {
    const currentTimestamp = new Date()
    const userId = await getUserId()
    if (!userId) return null
    const results = await prisma.serviceInstance.findMany({
        where: {
            userId: userId,
            expiry: {
                gte: currentTimestamp,
            },
        },
    })

    return await objectToServiceInstances(results)
}

export async function renewServiceInstance(instance: ServiceInstance) {
    const userId = await getUserId()
    if (!userId) return null

    const response = await fetch(`${process.env.BACKEND_URL!}/api/v1/service/${instance.id}/`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": process.env.BACKEND_SECRET_KEY!,
        },
    })

    if (!response.ok && response.status != 404) return null

    PostHogClient().capture({
        event: "Service instance renewed",
        distinctId: userId,
        properties: {
            instance: instance
        }
    })

    const data: {
        id: string
        expiry: string
    } = await response.json()

    const result = await prisma.serviceInstance.update({
        where: {
            userId_serviceId: {
                userId: userId,
                serviceId: instance.service.id,
            },
        },
        data: {
            expiry: new Date(data.expiry),
        },
    })
    return await objectToServiceInstance(result)
}

export async function deleteServiceInstance(instance: ServiceInstance) {
    const userId = await getUserId()
    if (!userId) return null

    const response = await fetch(`${process.env.BACKEND_URL!}/api/v1/service/${instance.id}/`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "Authorization": process.env.BACKEND_SECRET_KEY!,
        },
    })

    if (!response.ok && response.status != 404) return null

    PostHogClient().capture({
        event: "Service instance deleted",
        distinctId: userId,
        properties: {
            instance: instance
        }
    })

    const result = await prisma.serviceInstance.delete({
        where: {
            userId_serviceId: {
                userId: userId,
                serviceId: instance.service.id,
            },
        },
    })
    return await objectToServiceInstance(result)
}

export async function cleanExpiredServiceInstance(service: Service) {
    const userId = await getUserId()
    if (!userId) return null

    const expiredInstance = await readUserServiceExpiredInstance(service.id)

    if (expiredInstance) {
        await prisma.serviceInstance.delete({
            where: {
                userId_serviceId: {
                    userId: userId,
                    serviceId: service.id,
                },
            },
        })
    }
}