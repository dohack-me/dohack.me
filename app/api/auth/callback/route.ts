import {NextResponse} from "next/server";
import {getServerClient} from '@/lib/supabase/server'

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url)
    const code = searchParams.get("code");
    const next = searchParams.get('next') ?? '/dashboard'

    if (code) {
        const supabase = await getServerClient()
        const { error } = await supabase.auth.exchangeCodeForSession(code)
        if (!error) {
            const forwardedHost = request.headers.get('x-forwarded-host') // original origin before load balancer
            const isLocalEnv = process.env.NODE_ENV === 'development'
            if (isLocalEnv) {
                // we can be sure that there is no load balancer in between, so no need to watch for X-Forwarded-Host
                return NextResponse.redirect(`${process.env.PUBLIC_URL}${next}`)
            } else if (forwardedHost) {
                return NextResponse.redirect(`https://${forwardedHost}${next}`)
            } else {
                return NextResponse.redirect(`${process.env.PUBLIC_URL}${next}`)
            }
        }
    }

    return NextResponse.redirect(`${process.env.PUBLIC_URL}/error`)
}