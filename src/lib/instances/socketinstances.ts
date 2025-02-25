"use server"

import {getUserId} from "@/src/lib/auth/users"
import {prisma} from "@/src/lib/globals"
import {readSocketService, Socket} from "@/src/lib/database/sockets"
import posthog from "posthog-js"

export type SocketInstance = {
    socket: Socket,
    userId: string,
    id: string,
    port: number,
}

export type RawSocketInstance = {
    socketId: string,
    userId: string,
    id: string,
    port: number,
}

async function objectToSocketInstance(result: RawSocketInstance) {
    return {
        socket: (await readSocketService(result.socketId))!,
        userId: result.userId,
        id: result.id,
        port: result.port,
    } as SocketInstance
}

async function objectToSocketInstances(results: RawSocketInstance[]) {
    return await Promise.all(
        results.map(async (result) => ({
            socket: (await readSocketService(result.socketId))!,
            userId: result.userId,
            id: result.id,
            port: result.port,
        }) as SocketInstance),
    )
}

export async function readSocketInstance(socketId: string) {
    const userId = await getUserId()
    if (!userId) return null
    const result = await prisma.socketInstance.findUnique({
        where: {
            userId_socketId: {
                userId: userId,
                socketId: socketId,
            },
        },
    })

    if (result == null) return null
    return await objectToSocketInstance(result)
}

export async function readSocketInstances() {
    const userId = await getUserId()
    if (!userId) return null
    const results = await prisma.socketInstance.findMany({
        where: {
            userId: userId,
        },
    })

    return await objectToSocketInstances(results)
}

export async function createSocketInstance(socket: Socket) {
    const userId = await getUserId()
    if (!userId) return null

    const response = await fetch(`${process.env.BACKEND_URL!}/api/v1/service/socket/`, {
        method: "POST",
        body: JSON.stringify({
            "image": socket.image,
            "tag": socket.tag,
        }),
        headers: {
            "Content-Type": "application/json",
            "Authorization": process.env.BACKEND_SECRET_KEY!,
        },
    })

    if (!response.ok) return null
    const data: {
        id: string
        port: number
    } = await response.json()

    posthog.capture("Socket instance created", {image: socket.image, tag: socket.tag})

    const result = await prisma.socketInstance.create({
        data: {
            socketId: socket.id,
            userId: userId,
            id: data.id,
            port: data.port,
        },
    })
    return await objectToSocketInstance(result)
}

export async function deleteSocketInstance(instance: SocketInstance) {
    const userId = await getUserId()
    if (!userId) return null

    const response = await fetch(`${process.env.BACKEND_URL!}/api/v1/service/socket/${instance.id}/`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "Authorization": process.env.BACKEND_SECRET_KEY!,
        },
    })

    if (!response.ok && response.status != 404) return null

    posthog.capture("Socket instance deleted", {image: instance.socket.image, tag: instance.socket.tag})

    const result = await prisma.socketInstance.delete({
        where: {
            userId_socketId: {
                userId: userId,
                socketId: instance.socket.id,
            },
        },
    })
    return await objectToSocketInstance(result)
}