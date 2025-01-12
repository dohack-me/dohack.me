import {readRepository} from "@/lib/database/repositories";
import {Card} from "@/components/ui/card";
import {readChallenge} from "@/lib/database/challenges";
import {notFound} from "next/navigation";
import EditChallengeComposeForm
    from "@/app/dashboard/admin/@repositories/[repository]/@repository/[challenge]/_components/services/EditChallengeComposeForm";

export default async function ChallengeComposeView({repositoryId, challengeId}: {repositoryId: string, challengeId: string}) {
    const repository = await readRepository(repositoryId)
    const challenge = await readChallenge(challengeId)
    if (!challenge) notFound()

    return (
        <Card>
            <EditChallengeComposeForm repository={repository} challenge={challenge}/>
        </Card>
    )
}