import {PrismaClient} from "@prisma/client";
import EnvironmentVariables from "@/src/lib/environment";
import {Client, ClientOptions} from "minio";
import {Agent} from "node:https";

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient }
const globalForMinio = globalThis as unknown as { minio: Client }

export const prisma = globalForPrisma.prisma || new PrismaClient({
    datasources: {
        db: {
            url: EnvironmentVariables.DATABASE_URL,
        }
    }
})

let minioOptions: ClientOptions

if (EnvironmentVariables.MINIO_SSL === "true") {
    minioOptions = {
        endPoint: EnvironmentVariables.MINIO_HOST,
        port: parseInt(EnvironmentVariables.MINIO_PORT, 10),
        useSSL: true,
        accessKey: EnvironmentVariables.MINIO_ACCESS_KEY,
        secretKey: EnvironmentVariables.MINIO_SECRET_KEY,
        transportAgent: new Agent({
            rejectUnauthorized: false, // probably unsafe, but for some reason letsencrypt is not within the default ca and i couldnt get it to include it after a hour
        })
    }
} else {
    minioOptions = {
        endPoint: EnvironmentVariables.MINIO_HOST,
        port: parseInt(EnvironmentVariables.MINIO_PORT, 10),
        useSSL: false,
        accessKey: EnvironmentVariables.MINIO_ACCESS_KEY,
        secretKey: EnvironmentVariables.MINIO_SECRET_KEY,
    }
}
export const minio = globalForMinio.minio || new Client(minioOptions)

if (EnvironmentVariables.NODE_ENV !== "production") {
    globalForPrisma.prisma = prisma
    globalForMinio.minio = minio
}
