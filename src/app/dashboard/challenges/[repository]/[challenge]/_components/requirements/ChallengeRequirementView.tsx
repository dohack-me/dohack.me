import {readFolderFiles} from "@/src/lib/storage"
import {readChallengeHints} from "@/src/lib/database/hints"
import ChallengeFiles from "@/src/app/dashboard/challenges/[repository]/[challenge]/_components/requirements/files/ChallengeFiles"
import React from "react"
import ChallengeHints from "@/src/app/dashboard/challenges/[repository]/[challenge]/_components/requirements/hints/ChallengeHints"
import {readChallengeServices} from "@/src/lib/database/services"
import ChallengeServices from "@/src/app/dashboard/challenges/[repository]/[challenge]/_components/requirements/services/ChallengeServices"
import {Challenge} from "@prisma/client"

export default async function ChallengeRequirementView({challenge}: { challenge: Challenge }) {
    const files = await readFolderFiles(`${challenge.repositoryId}/${challenge.id}`)
    const services = await readChallengeServices(challenge.id)
    const hints = await readChallengeHints(challenge.id)
    if (files.length <= 0 && services.length <= 0 && hints.length <= 0) {
        return null
    }

    return (
        <div className={"small-column xl:min-w-[35%]"}>
            {(files.length > 0 && <ChallengeFiles files={files}/>)}
            {(services.length > 0 && <ChallengeServices services={services}/>)}
            {(hints.length > 0 && <ChallengeHints hints={hints}/>)}
        </div>
    )
}