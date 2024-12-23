'use server'

import {getServerClient} from "@/lib/supabase/server";
import {redirect} from "next/navigation";
import {revalidatePath} from "next/cache";
import {Provider} from "@supabase/auth-js";

export async function login(email: string, password: string) {
    const supabase = await getServerClient()

    const { error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password
    })

    if (error) {
        redirect('/error')
    }

    revalidatePath('/', 'layout')
    redirect('/dashboard')
}

export async function oauthLogin(provider: Provider) {
    const supabase = await getServerClient()

    const {data, error} = await supabase.auth.signInWithOAuth({
        provider: provider,
        options: {
            redirectTo: `${process.env.PUBLIC_URL}/api/auth/callback`,
        }
    })

    if (error) {
        redirect("/error")
    }

    if (data.url) {
        redirect(data.url)
    }
}

export async function signup(email: string, username: string, password: string) {
    const supabase = await getServerClient()

    const { error } = await supabase.auth.signUp({
        email: email,
        password: password,
        options: {
            data: {
                name: username,
                full_name: username,
                user_name: username,
                preferred_username: username,
            },
            emailRedirectTo: `${process.env.PUBLIC_URL}/api/auth/confirm`
        }
    })

    if (error) {
        redirect('/error')
    }

    revalidatePath('/', 'layout')
    redirect('/dashboard')
}

export async function logOut() {
    const supabase = await getServerClient()
    await supabase.auth.signOut()

    revalidatePath('/', 'layout')
    redirect('/')
}