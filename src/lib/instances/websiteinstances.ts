"use server"

import {getUserId} from "@/src/lib/auth/users";
import {prisma} from "@/src/lib/globals";
import {readWebsiteService, Website} from "@/src/lib/services/websites";
import EnvironmentVariables from "@/src/lib/environment";

export type WebsiteInstance = {
    website: Website,
    userId: string,
    id: string,
    url: string,
}

export type RawWebsiteInstance = {
    websiteId: string,
    userId: string,
    id: string,
    url: string,
}

async function objectToWebsiteInstance(result: RawWebsiteInstance) {
    return {
        website: (await readWebsiteService(result.websiteId))!,
        userId: result.userId,
        id: result.id,
        url: result.url,
    } as WebsiteInstance
}

async function objectToWebsiteInstances(results: RawWebsiteInstance[]) {
    return await Promise.all(
        results.map(async (result) => ({
            website: (await readWebsiteService(result.websiteId))!,
            userId: result.userId,
            id: result.id,
            url: result.url,
        }) as WebsiteInstance)
    )
}

export async function readWebsiteInstance(websiteId: string) {
    const userId = await getUserId()
    if (!userId) return null;
    const result = await prisma.websiteInstance.findUnique({
        where: {
            userId_websiteId: {
                userId: userId,
                websiteId: websiteId
            }
        }
    })

    if (result == null) return null
    return await objectToWebsiteInstance(result)
}

export async function readWebsiteInstances() {
    const userId = await getUserId()
    if (!userId) return null;
    const results = await prisma.websiteInstance.findMany({
        where: {
            userId: userId
        }
    })

    return await objectToWebsiteInstances(results)
}

export async function createWebsiteInstance(website: Website) {
    const userId = await getUserId()
    if (!userId) return null;

    const response = await fetch(`${EnvironmentVariables.BACKEND_URL}/api/v1/service/website/`, {
        method: "POST",
        body: JSON.stringify({
            "image": website.image,
            "tag": website.tag
        }),
        headers: {
            "Content-Type": "application/json",
            "Authorization": EnvironmentVariables.BACKEND_SECRET_KEY
        }
    })

    if (!response.ok) return null
    const data: {
        id: string
        url: string
    } = await response.json()

    const result = await prisma.websiteInstance.create({
        data: {
            websiteId: website.id,
            userId: userId,
            id: data.id,
            url: data.url
        }
    })
    return await objectToWebsiteInstance(result)
}

export async function deleteWebsiteInstance(instance: WebsiteInstance) {
    const userId = await getUserId()
    if (!userId) return null;

    const response = await fetch(`${EnvironmentVariables.BACKEND_URL}/api/v1/service/website/${instance.id}/`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "Authorization": EnvironmentVariables.BACKEND_SECRET_KEY
        }
    })

    if (!response.ok) return null

    const result = await prisma.websiteInstance.delete({
        where: {
            userId_websiteId: {
                userId: userId,
                websiteId: instance.website.id
            }
        }
    })
    return await objectToWebsiteInstance(result)
}