import {redirect} from 'next/navigation'
import {isLoggedIn} from "@/lib/auth";

export default async function RepositoryPage({ params }: { params: Promise<{ repository: string }> }) {
    if (!(await isLoggedIn())) {
        redirect('/login')
    }

    const repository = (await params).repository

    return <p>Visited { repository }</p>
}