'use server'

import {prisma} from '@/src/lib/globals'
import rlsExtension from "@/src/lib/prisma";
import {getUserId} from "@/src/lib/users";
import {readWebsiteService, Website} from "@/src/lib/services/websites";
import {WebsiteServiceErrors} from '@/src/lib/services/WebsiteServiceErrors';

export type WebsiteServiceResult = {
    data: {
        id: string
        url: string
    } | null;
    error: WebsiteServiceErrors | null;
}

export async function readWebsiteInstance(websiteId: string) {
    const userId = await getUserId()
    if (!userId) return null;
    return await prisma.$extends(rlsExtension()).websiteInstances.findUnique({
        where: {
            userId_websiteId: {
                userId: userId,
                websiteId: websiteId
            }
        }
    })
}

export async function requestWebsiteService(websiteId: string) {
    const userId = await getUserId()
    if (!userId) return {data: null, error: WebsiteServiceErrors.INVALID_ID}
    const website = await readWebsiteService(websiteId)
    if (!website) return {data: null, error: WebsiteServiceErrors.INVALID_ID}

    const instances = await prisma.$extends(rlsExtension()).websiteInstances.findMany({
        where: {
            userId: userId
        }
    })
    if (instances.filter((instance) => instance.websiteId === websiteId).length > 0) {
        // already have an instance for this service
        return {data: null, error: WebsiteServiceErrors.ALREADY_HAVE_INSTANCE}
    } else if (instances.length > 0) {
        // already have another instance
        return {data: null, error: WebsiteServiceErrors.TOO_MANY_INSTANCES}
    }

    const data = await deployWebsiteService(website)
    if (!data) return {data: null, error: WebsiteServiceErrors.SERVER_ERROR}

    await prisma.$extends(rlsExtension()).websiteInstances.create({
        data: {
            websiteId: websiteId,
            userId: userId,
            id: data.id,
            url: data.url
        }
    })
    return {data: data, error: null}
}

async function deployWebsiteService(website: Website) {
    const url = process.env.BACKEND_URL as string
    const response = await fetch(`${url}/api/v1/service`, {
        method: "POST",
        body: JSON.stringify({
            "image": website.image,
            "tag": website.tag
        }),
        headers: {
            "Content-Type": "application/json",
            "Authorization": (process.env.SECRET_KEY || "")
        }
    })

    if (!response.ok) return undefined
    const data: {
        id: string
        url: string
    } = await response.json()
    return data
}