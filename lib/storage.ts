'use server'

import {Challenge} from "@/lib/database/challenge";
import {getServerClient} from "@/lib/supabase/server";

export async function uploadChallengeFile(data: FormData, challenge: Challenge) {
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