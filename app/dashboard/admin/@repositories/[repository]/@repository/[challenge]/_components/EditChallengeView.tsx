import {readRepository} from "@/lib/database/repository";
import {Card} from "@/components/ui/card";
import EditChallengeForm
    from "@/app/dashboard/admin/@repositories/[repository]/@repository/[challenge]/_components/EditChallengeForm";
import {readChallenge} from "@/lib/database/challenge";

export default async function EditChallengeView({repositoryId, challengeId}: {repositoryId: string, challengeId: string}) {
    const repository = await readRepository(repositoryId)
    const challenge = (await readChallenge(challengeId))!

    return (
        <Card>
            <EditChallengeForm repository={repository} challenge={challenge}/>
        </Card>
    )
}