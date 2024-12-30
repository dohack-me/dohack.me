export default async function ChallengesPage({ params }: { params: Promise<{ repository: string, challenge: string }> }) {
    const repositoryId = (await params).repository
    const challengeId = (await params).challenge

    return (
        <div>
            <p>test</p>
            <p>{`Repository ID: ${repositoryId}`}</p>
            <p>{`Challenge ID: ${challengeId}`}</p>
        </div>
    )
}