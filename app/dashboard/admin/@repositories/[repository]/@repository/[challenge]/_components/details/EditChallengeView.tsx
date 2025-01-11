import {readRepository} from "@/lib/database/repository";
import {Card} from "@/components/ui/card";
import EditChallengeForm
    from "@/app/dashboard/admin/@repositories/[repository]/@repository/[challenge]/_components/details/EditChallengeForm";
import {readChallenge} from "@/lib/database/challenge";
import {notFound} from "next/navigation";

export default async function EditChallengeView({repositoryId, challengeId}: {repositoryId: string, challengeId: string}) {
    const repository = await readRepository(repositoryId)
    const challenge = await readChallenge(challengeId)
    if (!challenge) notFound()

    return (
        <Card>
            <EditChallengeForm repository={repository} challenge={challenge}/>
        </Card>
    )
}