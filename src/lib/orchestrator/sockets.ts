"use server"

import {getUserId} from "@/src/lib/auth/users"
import {ServiceActionErrors} from "@/src/lib/orchestrator/ServiceActionErrors"
import {readSocketService} from "@/src/lib/database/sockets"
import {createSocketInstance, deleteSocketInstance, readSocketInstance, readSocketInstances} from "@/src/lib/instances/socketinstances"

export async function deploySocketInstance(socketId: string) {
    const socket = await readSocketService(socketId)
    if (!socket) return {data: null, error: ServiceActionErrors.INVALID_ID}

    const instances = await readSocketInstances()
    if (!instances) return {data: null, error: ServiceActionErrors.INVALID_ID}

    if (instances.filter((instance) => instance.socket.id === socketId).length > 0) {
        // already have an instance for this service
        return {data: null, error: ServiceActionErrors.ALREADY_HAVE_INSTANCE}
    } else if (instances.length > 0) {
        // already have another instance
        return {data: null, error: ServiceActionErrors.TOO_MANY_INSTANCES}
    }

    const data = await createSocketInstance(socket)
    if (!data) return {data: null, error: ServiceActionErrors.SERVER_ERROR}

    return {data: data, error: null}
}

export async function shutdownSocketInstance(socketId: string) {
    const userId = await getUserId()
    if (!userId) return {data: null, error: ServiceActionErrors.INVALID_ID}
    const socket = await readSocketService(socketId)
    if (!socket) return {data: null, error: ServiceActionErrors.INVALID_ID}

    const instance = await readSocketInstance(socketId)
    if (!instance) return {data: null, error: ServiceActionErrors.NO_INSTANCE}

    const data = await deleteSocketInstance(instance)
    if (!data) return {data: null, error: ServiceActionErrors.SERVER_ERROR}
    return {data: data, error: null}
}