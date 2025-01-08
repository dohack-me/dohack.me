'use server'

import {readChallenge} from "@/lib/database/challenge";
import {getServerClient} from "@/lib/supabase/server";
import {createSolve, readUserChallengeSolve} from "@/lib/solves";

export async function getUserId() {
    const {data, error} = await (await getServerClient()).auth.getUser()
    if (error || !data) return null
    return data.user.id
}

export async function submitChallengeAnswer(challengeId: string, answer: string) {
    const challenge = await readChallenge(challengeId)
    if (!challenge) return null

    if (challenge.answer === answer) {
        await createSolve(challengeId)
        return true
    } else {
        return false
    }
}

export async function hasSolvedChallenge(challengeId: string) {
    if (!(await readChallenge(challengeId))) return null

    const result = await readUserChallengeSolve(challengeId)
    return result != null;
}