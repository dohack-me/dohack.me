import {type EmailOtpType} from '@supabase/supabase-js'
import {type NextRequest} from 'next/server'
import {getServerClient} from '@/lib/supabase/server'
import {redirect} from 'next/navigation'

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url)
    const token_hash = searchParams.get('token_hash')
    const type = searchParams.get('type') as EmailOtpType | null

    if (token_hash && type) {
        const supabase = await getServerClient()

        const { error } = await supabase.auth.verifyOtp({
            type,
            token_hash,
        })
        if (!error) {
            redirect(`${process.env.PUBLIC_URL}/dashboard`)
        }
    }

    redirect('/error')
}