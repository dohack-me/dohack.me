import React from "react";
import {getServerClient} from "@/lib/supabase/server";
import {EllipsisVerticalIcon, FileIcon, FolderIcon, TriangleAlertIcon} from "lucide-react";
import {isFolder} from "@/lib/utils";
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger} from "@/components/ui/dropdown-menu"
import {
    CopyChallengeFileUrlButton,
    DeleteChallengeFileButton
} from "@/app/dashboard/admin/@repositories/[repository]/@repository/[challenge]/_components/UploadChallengeFilesButtons";
import Link from "next/link";
import {readChallenge} from "@/lib/database/challenge";
import {readChallengeFiles} from "@/lib/storage";

export default async function ReadChallengeFilesView({challengeId}: {challengeId: string}) {
    const challenge = (await readChallenge(challengeId))!
    const data = await readChallengeFiles(challenge);

    if (!data) {
        return (
            <div className={"h-full w-full flex flex-col items-center justify-center"}>
                <TriangleAlertIcon/>
                <p>There was an error retrieving this challenge&apos;s files.</p>
                <p>Please try again later.</p>
            </div>
        )
    }

    const finalData = data.filter((file) => file.name !== ".emptyFolderPlaceholder")
    return (
        <div className={"h-full w-full flex flex-col"}>
            {finalData.map((file) => (
                <div key={file.id} className={"hover:bg-accent p-2 flex flex-row items-center justify-between first:rounded-tr-lg"}>
                    <div className={"flex flex-row gap-x-2"}>
                        {isFolder(file) ? <FolderIcon/> : <FileIcon/>}
                        <p>{file.name}</p>
                    </div>
                    <DropdownMenu>
                        <DropdownMenuTrigger>
                            <EllipsisVerticalIcon/>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DeleteChallengeFileButton path={`${challenge.repository.id}/${challenge.id}/${file.name}`} name={file.name}/>
                            <DownloadChallengeFileButton path={`${challenge.repository.id}/${challenge.id}/${file.name}`} fileName={file.name}/>
                            <CopyChallengeFileUrlView path={`${challenge.repository.id}/${challenge.id}/${file.name}`}/>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            ))}
        </div>
    )
}
async function CopyChallengeFileUrlView({path}: {path: string}) {
    const url = (await getServerClient()).storage.from('challenges').getPublicUrl(path).data.publicUrl
    return (
        <CopyChallengeFileUrlButton url={url}/>
    )
}

async function DownloadChallengeFileButton({path, fileName}: {path: string, fileName: string}) {
    const url = (await getServerClient()).storage.from('challenges').getPublicUrl(path, {download: true}).data.publicUrl
    return (
        <DropdownMenuItem><Link href={url} download={fileName}>Download</Link></DropdownMenuItem>
    )
}