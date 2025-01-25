'use server'

import {getUserId} from "@/src/lib/users";
import {ServiceActionErrors} from "@/src/lib/orchestrator/ServiceActionErrors";
import {readWebsiteService} from "@/src/lib/services/websites";
import {createWebsiteInstance, deleteWebsiteInstance, readWebsiteInstance, readWebsiteInstances} from "@/src/lib/instances/websiteinstances";

export async function deployWebsiteInstance(websiteId: string) {
    const website = await readWebsiteService(websiteId)
    if (!website) return {data: null, error: ServiceActionErrors.INVALID_ID}

    const instances = await readWebsiteInstances()
    if (!instances) return {data: null, error: ServiceActionErrors.INVALID_ID}

    if (instances.filter((instance) => instance.website.id === websiteId).length > 0) {
        // already have an instance for this service
        return {data: null, error: ServiceActionErrors.ALREADY_HAVE_INSTANCE}
    } else if (instances.length > 0) {
        // already have another instance
        return {data: null, error: ServiceActionErrors.TOO_MANY_INSTANCES}
    }

    const data = await createWebsiteInstance(website)
    if (!data) return {data: null, error: ServiceActionErrors.SERVER_ERROR}

    return {data: data, error: null}
}

export async function shutdownWebsiteInstance(websiteId: string) {
    const userId = await getUserId()
    if (!userId) return {data: null, error: ServiceActionErrors.INVALID_ID}
    const website = await readWebsiteService(websiteId)
    if (!website) return {data: null, error: ServiceActionErrors.INVALID_ID}

    const instance = await readWebsiteInstance(websiteId)
    if (!instance) return {data: null, error: ServiceActionErrors.NO_INSTANCE}

    const data = await deleteWebsiteInstance(instance)
    if (!data) return {data: null, error: ServiceActionErrors.SERVER_ERROR}
    return {data: data, error: null}
}