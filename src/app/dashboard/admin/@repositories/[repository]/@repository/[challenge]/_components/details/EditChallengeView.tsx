import {Card} from "@/src/components/ui/card"
import EditChallengeForm
    from "@/src/app/dashboard/admin/@repositories/[repository]/@repository/[challenge]/_components/details/EditChallengeForm"
import {readChallenge} from "@/src/lib/database/challenges"
import {notFound} from "next/navigation"

export default async function EditChallengeView({challengeId}: { challengeId: string }) {
    const challenge = await readChallenge(challengeId)
    if (!challenge) notFound()

    return (
        <Card>
            <EditChallengeForm challenge={challenge}/>
        </Card>
    )
}