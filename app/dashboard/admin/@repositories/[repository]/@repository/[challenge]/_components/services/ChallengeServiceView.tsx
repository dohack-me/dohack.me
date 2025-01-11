import {readRepository} from "@/lib/database/repository";
import {Card} from "@/components/ui/card";
import {readChallenge} from "@/lib/database/challenge";
import {notFound} from "next/navigation";
import EditChallengeServiceForm
    from "@/app/dashboard/admin/@repositories/[repository]/@repository/[challenge]/_components/services/EditChallengeServiceForm";

export default async function ChallengeServiceView({repositoryId, challengeId}: {repositoryId: string, challengeId: string}) {
    const repository = await readRepository(repositoryId)
    const challenge = await readChallenge(challengeId)
    if (!challenge) notFound()

    return (
        <Card>
            <EditChallengeServiceForm repository={repository} challenge={challenge}/>
        </Card>
    )
}