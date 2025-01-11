import {readChallenge} from "@/lib/database/challenge";
import UploadChallengeFilesForm
    from "@/app/dashboard/admin/@repositories/[repository]/@repository/[challenge]/_components/UploadChallengeFilesForm";
import {notFound} from "next/navigation";

export default async function UploadChallengeFilesView({challengeId}: {challengeId: string}) {
    const challenge = await readChallenge(challengeId)
    if (!challenge) notFound()

    return (
        <UploadChallengeFilesForm challenge={challenge}/>
    )
}