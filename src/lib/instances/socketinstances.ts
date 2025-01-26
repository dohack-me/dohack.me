'use server'

import {getUserId} from "@/src/lib/users";
import {prisma} from "@/src/lib/globals";
import rlsExtension from "@/src/lib/prisma";
import {readSocketService, Socket} from "@/src/lib/services/sockets";

const url = process.env.BACKEND_URL as string
const key = process.env.SECRET_KEY as string

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
        }) as SocketInstance)
    )
}

export async function readSocketInstance(socketId: string) {
    const userId = await getUserId()
    if (!userId) return null;
    const result = await prisma.$extends(rlsExtension()).socketInstances.findUnique({
        where: {
            userId_socketId: {
                userId: userId,
                socketId: socketId
            }
        }
    })

    if (result == null) return null
    return await objectToSocketInstance(result)
}

export async function readSocketInstances() {
    const userId = await getUserId()
    if (!userId) return null;
    const results = await prisma.$extends(rlsExtension()).socketInstances.findMany({
        where: {
            userId: userId
        }
    })

    return await objectToSocketInstances(results)
}

export async function createSocketInstance(socket: Socket) {
    const userId = await getUserId()
    if (!userId) return null;

    const response = await fetch(`${url}/api/v1/service/socket`, {
        method: "POST",
        body: JSON.stringify({
            "image": socket.image,
            "tag": socket.tag
        }),
        headers: {
            "Content-Type": "application/json",
            "Authorization": key
        }
    })

    if (!response.ok) return null
    const data: {
        id: string
        port: number
    } = await response.json()

    const result = await prisma.$extends(rlsExtension()).socketInstances.create({
        data: {
            socketId: socket.id,
            userId: userId,
            id: data.id,
            port: data.port
        }
    })
    return await objectToSocketInstance(result)
}

export async function deleteSocketInstance(instance: SocketInstance) {
    const userId = await getUserId()
    if (!userId) return null;

    const response = await fetch(`${url}/api/v1/service`, {
        method: "DELETE",
        body: JSON.stringify({
            "id": instance.id,
        }),
        headers: {
            "Content-Type": "application/json",
            "Authorization": key
        }
    })

    if (!response.ok) return null

    const result = await prisma.$extends(rlsExtension()).socketInstances.delete({
        where: {
            userId_socketId: {
                userId: userId,
                socketId: instance.socket.id
            }
        }
    })
    return await objectToSocketInstance(result)
}