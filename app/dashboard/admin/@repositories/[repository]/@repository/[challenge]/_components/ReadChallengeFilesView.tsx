import React from "react";
import {getServerClient} from "@/lib/supabase/server";
import {FileIcon, FolderIcon, TriangleAlertIcon} from "lucide-react";
import {isFolder} from "@/lib/utils";

export default async function ReadChallengeFilesView({repositoryId, challengeId}: {repositoryId: string, challengeId: string}) {
    const storagePath = `${repositoryId}/${challengeId}`;
    const { data, error } = await (await getServerClient()).storage.from("challenges").list(storagePath)

    if (error || !data) {
        return (
            <div className={"h-full w-full flex flex-col items-center justify-center"}>
                <TriangleAlertIcon/>
                <p>There was an error retrieving this challenge&apos;s files.</p>
                <p>Please try again later.</p>
            </div>
        )
    }
    return (
        <div className={"h-full w-full flex flex-col"}>
            {data.map((file) => (
                <div key={file.id} className={"hover:bg-accent p-2 flex flex-row items-center gap-x-2 first:rounded-tr-lg"}>
                    {isFolder(file) ? <FolderIcon/> : <FileIcon/>}
                    <p>{file.name}</p>
                </div>
            ))}
        </div>
    )
}