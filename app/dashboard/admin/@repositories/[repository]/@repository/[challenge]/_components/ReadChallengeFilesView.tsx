import React from "react";
import {getServerClient} from "@/lib/supabase/server";

export default async function ReadChallengeFilesView({repositoryId, challengeId}: {repositoryId: string, challengeId: string}) {
    const storagePath = `${repositoryId}/${challengeId}`;
    const { data, error } = await (await getServerClient()).storage.from("challenges").list(storagePath)

    return (
        <div className={"h-full w-full flex flex-col"}>
            {(error || !data ?
                    <p>error</p>
                    :
                    <p>your files:</p>
            )}
        </div>
    )
}