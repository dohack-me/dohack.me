import {PrismaClient} from "@prisma/client";
import EnvironmentVariables from "@/src/lib/environment";
import {S3Client} from '@aws-sdk/client-s3'

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient }
const globalForS3 = globalThis as unknown as { S3: S3Client }

export const prisma = globalForPrisma.prisma || new PrismaClient({
    datasources: {
        db: {
            url: EnvironmentVariables.DATABASE_URL,
        }
    }
})

export const S3 = globalForS3.S3 || new S3Client({
    endpoint: EnvironmentVariables.S3_ENDPOINT,
    region: EnvironmentVariables.S3_REGION,
    credentials: {
        accessKeyId: EnvironmentVariables.S3_ACCESS_KEY,
        secretAccessKey: EnvironmentVariables.S3_SECRET_KEY
    },
    forcePathStyle: true
})

if (EnvironmentVariables.NODE_ENV !== "production") {
    globalForPrisma.prisma = prisma
    globalForS3.S3 = S3
}
