'use server'

import {Challenge} from "@/lib/database/challenge";
import {getServerClient} from "@/lib/supabase/server";

export async function createChallengeFile(data: FormData, challenge: Challenge) {
    const file = (data.get("file") as unknown) as File
    const supabase = await getServerClient()
    return await supabase.storage.from("challenges").upload(
        `${challenge.repository.id}/${challenge.id}/${file.name}`,
        file,
        {
            upsert: true,
        }
    )
}

export async function readChallengeFiles(challenge: Challenge) {
    const { data, error } = await (await getServerClient()).storage.from("challenges").list(`${challenge.repository.id}/${challenge.id}`)

    if (error || !data) return null

    return data
}

export async function deleteChallengeFile(path: string) {
    const supabase = await getServerClient()
    return await supabase.storage.from("challenges").remove([
        path
    ])
}