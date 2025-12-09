import {betterAuth} from "better-auth";
import {prismaAdapter} from "better-auth/adapters/prisma";
import {prisma} from "@/src/lib/globals";

export const auth = betterAuth({
    database: prismaAdapter(prisma, {
        provider: "postgresql", // or "mysql", "postgresql", ...etc
    }),
    emailAndPassword: {
        enabled: false,
    },
    socialProviders: {
        github: {
            clientId: process.env.AUTH_GITHUB_ID as string,
            clientSecret: process.env.AUTH_GITHUB_SECRET as string,
        },
        discord: {
            clientId: process.env.AUTH_DISCORD_ID as string,
            clientSecret: process.env.AUTH_DISCORD_SECRET as string,
        },
        google: {
            clientId: process.env.AUTH_GOOGLE_ID as string,
            clientSecret: process.env.AUTH_GOOGLE_SECRET as string,
        }
    },
    user: {
        additionalFields: {
            role: {
                type: "string",
                required: true,
                default: "user",
                input: false,
            }
        }
    },
    advanced: {
        database: {
            generateId: "uuid"
        }
    }
});