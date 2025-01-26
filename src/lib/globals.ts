import {PrismaClient} from "@prisma/client";
import EnvironmentVariables from "@/src/lib/environment";

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient }

export const prisma = globalForPrisma.prisma || new PrismaClient({
    datasources: {
        db: {
            url: EnvironmentVariables.RLS_DATABASE_URL,
        }
    }
})

if (EnvironmentVariables.NODE_ENV !== "production") globalForPrisma.prisma = prisma