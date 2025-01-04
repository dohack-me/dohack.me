'use server'

import {readChallenge} from "@/lib/database/challenge";
import rlsExtension, {prisma} from "@/lib/prisma";
import {getServerClient} from "@/lib/supabase/server";

export async function submitChallengeAnswer(challengeId: string, answer: string) {
    const challenge = await readChallenge(challengeId)
    if (!challenge) return
    if (challenge.answer === answer) {
        const {data, error} = await (await getServerClient()).auth.getUser()
        if (error || !data) return
        const userId = data.user.id

        await prisma.$extends(rlsExtension()).solves.create({
            data: {
                userId: userId,
                challengeId: challengeId,
            }
        })
    }
}