import {readChallenge} from "@/lib/database/challenge";
import UploadChallengeFilesForm
    from "@/app/dashboard/admin/@repositories/[repository]/@repository/[challenge]/_components/UploadChallengeFilesForm";

export default async function UploadChallengeFilesView({challengeId}: {challengeId: string}) {
    const challenge = (await readChallenge(challengeId))!

    return (
        <UploadChallengeFilesForm challenge={challenge}/>
    )
}