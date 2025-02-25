import {readUserChallengeBookmark} from "@/src/lib/database/bookmarks"
import ChallengeBookmarkButton from "@/src/app/dashboard/challenges/[repository]/[challenge]/_components/ChallengeBookmarkButton"

export default async function ChallengeBookmarkView({challengeId}: { challengeId: string }) {
    const bookmark = await readUserChallengeBookmark(challengeId)

    return (
        <ChallengeBookmarkButton hasBookmark={!(bookmark === null)} challengeId={challengeId}/>
    )
}