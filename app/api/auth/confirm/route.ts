import {type EmailOtpType} from '@supabase/supabase-js'
import {type NextRequest} from 'next/server'
import {getServerClient} from '@/lib/supabase/server'
import {redirect} from 'next/navigation'
import {revalidatePath} from "next/cache";

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
            revalidatePath("/dashboard")
            redirect("/dashboard")
        }
    }

    redirect('/error')
}