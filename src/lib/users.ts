"use server"

import {readChallenge} from "@/src/lib/database/challenges";
import {createSolve, readUserChallengeSolve} from "@/src/lib/database/solves";

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