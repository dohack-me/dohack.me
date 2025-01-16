import {Prisma} from "@prisma/client"
import {getServerClient} from "@/src/lib/supabase/server";

// taken from https://github.com/dthyresson/prisma-extension-supabase-rls
export default function rlsExtension() {
    return Prisma.defineExtension((client) =>
        client.$extends({
            name: 'useSupabaseRowLevelSecurity',
            query: {
                $allModels: {
                    async $allOperations({ args, query }) {
                        const claims = JSON.stringify({
                            sub: (await (await getServerClient()).auth.getUser()).data.user!.id,
                            aud: "authenticated",
                            role: "authenticated",
                        })

                        try {
                            const [, result] = await client.$transaction([
                                // removing the ${} causes an error im gonna crash out
                                client.$executeRaw`SELECT set_config(${"request.jwt.claims"}, ${claims}, TRUE)`,
                                query(args),
                            ])
                            return result
                        } catch (error) {
                            // console.error(e)
                            throw error
                        }
                    },
                },
            },
        })
    )
}