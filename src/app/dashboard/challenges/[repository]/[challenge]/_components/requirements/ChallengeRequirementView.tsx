import {Challenge} from "@/src/lib/database/challenges"
import {readFolderFiles} from "@/src/lib/storage"
import {readChallengeHints} from "@/src/lib/database/hints"
import {readChallengeSocketServices} from "@/src/lib/database/sockets"
import {readChallengeWebsiteServices} from "@/src/lib/database/websites"
import ChallengeFiles from "@/src/app/dashboard/challenges/[repository]/[challenge]/_components/requirements/files/ChallengeFiles"
import React from "react"
import ChallengeWebsites from "@/src/app/dashboard/challenges/[repository]/[challenge]/_components/requirements/websites/ChallengeWebsites"
import ChallengeSockets from "@/src/app/dashboard/challenges/[repository]/[challenge]/_components/requirements/sockets/ChallengeSockets"
import ChallengeHints from "@/src/app/dashboard/challenges/[repository]/[challenge]/_components/requirements/hints/ChallengeHints"

export default async function ChallengeRequirementView({challenge}: { challenge: Challenge }) {
    const files = await readFolderFiles(`${challenge.repository.id}/${challenge.id}`)
    const websites = await readChallengeWebsiteServices(challenge.id)
    const sockets = await readChallengeSocketServices(challenge.id)
    const hints = await readChallengeHints(challenge.id)
    if (files.length <= 0 && websites.length <= 0 && sockets.length <= 0 && hints.length <= 0) {
        return null
    }
    return (
        <div className={"small-column xl:min-w-[35%]"}>
            {(files.length > 0 && <ChallengeFiles files={files}/>)}
            {(websites.length > 0 && <ChallengeWebsites websites={websites}/>)}
            {(sockets.length > 0 && <ChallengeSockets sockets={sockets}/>)}
            {(hints.length > 0 && <ChallengeHints hints={hints}/>)}
        </div>
    )
}