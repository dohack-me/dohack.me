export default async function RepositoryPage({ params }: { params: Promise<{ repository: string }> }) {
    const repository = (await params).repository

    return (
        <p>Visited { repository }</p>
    )
}