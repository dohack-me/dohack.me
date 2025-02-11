import {PrismaClient} from "@prisma/client";
import EnvironmentVariables from "@/src/lib/environment";
import {Client} from "minio";

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient }
const globalForMinio = globalThis as unknown as { minio: Client }

export const prisma = globalForPrisma.prisma || new PrismaClient({
    datasources: {
        db: {
            url: EnvironmentVariables.DATABASE_URL,
        }
    }
})

export const minio = globalForMinio.minio || new Client({
    endPoint: EnvironmentVariables.MINIO_HOST,
    port: parseInt(EnvironmentVariables.MINIO_PORT, 10),
    useSSL: false,
    accessKey: EnvironmentVariables.MINIO_ACCESS_KEY,
    secretKey: EnvironmentVariables.MINIO_SECRET_KEY,
})

if (EnvironmentVariables.NODE_ENV !== "production") {
    globalForPrisma.prisma = prisma
    globalForMinio.minio = minio
}
