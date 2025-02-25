import {readChallenge} from "@/src/lib/database/challenges";
import UploadChallengeFilesForm from "@/src/app/dashboard/admin/@repositories/[repository]/@repository/[challenge]/__components/files/UploadChallengeFilesForm";
import {notFound} from "next/navigation";

export default async function UploadChallengeFilesView({challengeId}: { challengeId: string }) {
    const challenge = await readChallenge(challengeId)
    if (!challenge) notFound()

    return (
        <UploadChallengeFilesForm challenge={challenge}/>
    )
}