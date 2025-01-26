import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import EnvironmentVariables from "@/src/lib/environment";

export async function getServerClient() {
    const cookieStore = await cookies()

    return createServerClient(
        EnvironmentVariables.SUPABASE_URL!,
        EnvironmentVariables.SUPABASE_ANON_KEY!,
        {
            cookies: {
                getAll() {
                    return cookieStore.getAll()
                },
                setAll(cookiesToSet) {
                    try {
                        cookiesToSet.forEach(({ name, value, options }) =>
                            cookieStore.set(name, value, options)
                        )
                    } catch {
                    }
                },
            },
        }
    )
}