import {readRepository} from "@/src/lib/database/repositories"
import {Card} from "@/src/components/ui/card"
import EditChallengeForm from "@/src/app/dashboard/admin/@repositories/[repository]/@repository/[challenge]/__components/details/EditChallengeForm"
import {readChallenge} from "@/src/lib/database/challenges"
import {notFound} from "next/navigation"

export default async function EditChallengeView({repositoryId, challengeId}: {
    repositoryId: string,
    challengeId: string
}) {
    const repository = await readRepository(repositoryId)
    const challenge = await readChallenge(challengeId)
    if (!challenge) notFound()

    return (
        <Card>
            <EditChallengeForm repository={repository} challenge={challenge}/>
        </Card>
    )
}