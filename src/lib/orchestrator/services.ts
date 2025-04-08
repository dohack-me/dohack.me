"use server"

import {getUserId} from "@/src/lib/auth/users"
import {ServiceActionErrors} from "@/src/lib/orchestrator/ServiceActionErrors"
import {readService} from "@/src/lib/database/services"
import {createServiceInstance, deleteServiceInstance, readUserServiceInstance, readUserServiceInstances, renewServiceInstance} from "@/src/lib/orchestrator/serviceinstances"

export async function deployServiceInstance(serviceId: string) {
    const service = await readService(serviceId)
    if (!service) return {data: null, error: ServiceActionErrors.INVALID_ID}

    const instances = await readUserServiceInstances()
    if (!instances) return {data: null, error: ServiceActionErrors.INVALID_ID}

    if (instances.filter((instance) => instance.service.id === serviceId).length > 0) {
        // already have an instance for this service
        return {data: null, error: ServiceActionErrors.ALREADY_HAVE_INSTANCE}
    } else if (instances.length > 0) {
        // already have another instance
        return {data: null, error: ServiceActionErrors.TOO_MANY_INSTANCES}
    }

    const data = await createServiceInstance(service)
    if (!data) return {data: null, error: ServiceActionErrors.SERVER_ERROR}

    return {data: data, error: null}
}

export async function requestRenewServiceInstance(serviceId: string) {
    const service = await readService(serviceId)
    if (!service) return {data: null, error: ServiceActionErrors.INVALID_ID}

    const instances = await readUserServiceInstances()
    if (!instances) return {data: null, error: ServiceActionErrors.INVALID_ID}

    const instance = await readUserServiceInstance(serviceId)
    if (!instance) return {data: null, error: ServiceActionErrors.NO_INSTANCE}

    const data = await renewServiceInstance(instance)
    if (!data) return {data: null, error: ServiceActionErrors.SERVER_ERROR}

    return {data: data, error: null}
}

export async function shutdownServiceInstance(serviceId: string) {
    const userId = await getUserId()
    if (!userId) return {data: null, error: ServiceActionErrors.INVALID_ID}
    const service = await readService(serviceId)
    if (!service) return {data: null, error: ServiceActionErrors.INVALID_ID}

    const instance = await readUserServiceInstance(serviceId)
    if (!instance) return {data: null, error: ServiceActionErrors.NO_INSTANCE}

    const data = await deleteServiceInstance(instance)
    if (!data) return {data: null, error: ServiceActionErrors.SERVER_ERROR}

    return {data: data, error: null}
}