import {readChallenge} from "@/lib/database/challenges";
import UploadChallengeFilesForm
    from "@/app/dashboard/admin/@repositories/[repository]/@repository/[challenge]/_components/files/UploadChallengeFilesForm";
import {notFound} from "next/navigation";

export default async function UploadChallengeFilesView({challengeId}: {challengeId: string}) {
    const challenge = await readChallenge(challengeId)
    if (!challenge) notFound()

    return (
        <UploadChallengeFilesForm challenge={challenge}/>
    )
}