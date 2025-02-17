import NextAuth from "next-auth"
import {PrismaAdapter} from "@auth/prisma-adapter";
import {prisma} from '@/src/lib/globals'
import GitHub from "next-auth/providers/github"
import Discord from "next-auth/providers/discord";
import Google from "@auth/core/providers/google";

export const { handlers, signIn, signOut, auth } = NextAuth({
    adapter: PrismaAdapter(prisma),
    providers: [GitHub, Discord, Google],
    callbacks: {
        session({ session, user }) {
            session.user.id = user.id
            return session
        },
    },
    events: {
        createUser: async ({user}) =>{
            await prisma.customUser.create({
                data: {
                    userId: user.id!
                }
            })
        },
    }
})