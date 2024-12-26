import {readRepository} from "@/lib/database/repository";
import {readChallenge} from "@/lib/database/challenge";
import UploadChallengeFilesForm
    from "@/app/dashboard/admin/@repositories/[repository]/@repository/[challenge]/_components/UploadChallengeFilesForm";

export default async function UploadChallengeFilesView({repositoryId, challengeId}: {repositoryId: string, challengeId: string}) {
    const repository = await readRepository(repositoryId)
    const challenge = (await readChallenge(challengeId))!

    return (
        <UploadChallengeFilesForm repository={repository} challenge={challenge}/>
    )
}