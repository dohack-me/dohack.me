"use server"

import {getUserId} from "@/src/lib/auth/users"
import {
    ServiceCreationError,
    ServiceCreationErrors,
    ServiceDeletionError,
    ServiceDeletionErrors,
    ServiceRenewError,
    ServiceRenewErrors
} from "@/src/lib/orchestrator/ServiceActionErrors"
import {readService} from "@/src/lib/database/services"
import {
    createServiceInstance,
    deleteServiceInstance,
    readUserServiceInstance,
    readUserServiceInstances,
    renewServiceInstance
} from "@/src/lib/orchestrator/serviceinstances"

export async function deployServiceInstance(serviceId: string) {
    const service = await readService(serviceId)
    if (!service) throw new ServiceCreationError(ServiceCreationErrors.SERVER_ERROR)

    const instances = await readUserServiceInstances()
    if (!instances) throw new ServiceCreationError(ServiceCreationErrors.SERVER_ERROR)

    if (instances.filter((instance) => instance.service.id === serviceId).length > 0) {
        // already have an instance for this service
        throw new ServiceCreationError(ServiceCreationErrors.ALREADY_HAVE_INSTANCE)
    } else if (instances.length > 0) {
        // already have another instance
        throw new ServiceCreationError(ServiceCreationErrors.TOO_MANY_INSTANCES)
    }

    const data = await createServiceInstance(service)
    if (!data) throw new ServiceCreationError(ServiceCreationErrors.SERVER_ERROR)

    return data
}

export async function requestRenewServiceInstance(serviceId: string) {
    const service = await readService(serviceId)
    if (!service) throw new ServiceRenewError(ServiceRenewErrors.SERVER_ERROR)

    const instances = await readUserServiceInstances()
    if (!instances) throw new ServiceRenewError(ServiceRenewErrors.SERVER_ERROR)

    const instance = await readUserServiceInstance(serviceId)
    if (!instance) throw new ServiceRenewError(ServiceRenewErrors.NO_INSTANCE)

    const data = await renewServiceInstance(instance)
    if (!data) throw new ServiceRenewError(ServiceRenewErrors.SERVER_ERROR)

    return data
}

export async function shutdownServiceInstance(serviceId: string) {
    const userId = await getUserId()
    if (!userId) throw new ServiceDeletionError(ServiceDeletionErrors.SERVER_ERROR)

    const service = await readService(serviceId)
    if (!service) throw new ServiceDeletionError(ServiceDeletionErrors.SERVER_ERROR)

    const instance = await readUserServiceInstance(serviceId)
    if (!instance) throw new ServiceDeletionError(ServiceDeletionErrors.NO_INSTANCE)

    const data = await deleteServiceInstance(instance)
    if (!data) throw new ServiceDeletionError(ServiceDeletionErrors.SERVER_ERROR)

    return data
}