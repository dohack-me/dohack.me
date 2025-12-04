import {PrismaClient} from "@/src/lib/prisma/client"
import {S3Client} from "@aws-sdk/client-s3"

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient }
const globalForS3 = globalThis as unknown as { S3: S3Client }

export const prisma = globalForPrisma.prisma || new PrismaClient()

export const S3 = globalForS3.S3 || new S3Client({
    endpoint: process.env.S3_ENDPOINT!,
    region: process.env.S3_REGION!,
    credentials: {
        accessKeyId: process.env.S3_ACCESS_KEY!,
        secretAccessKey: process.env.S3_SECRET_KEY!,
    },
    forcePathStyle: true,
})

if (process.env.NODE_ENV! !== "production") {
    globalForPrisma.prisma = prisma
    globalForS3.S3 = S3
}
