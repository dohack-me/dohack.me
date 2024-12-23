import {redirect} from 'next/navigation'
import {isLoggedIn} from "@/lib/auth";

export default async function SettingsPage() {
    let data
    if (!(data = await isLoggedIn())) {
        redirect('/login')
    }

    return <p>Hello {data.user.email}</p>
}