import React from "react"
import {EllipsisVerticalIcon, FileIcon} from "lucide-react"
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger} from "@/src/components/ui/dropdown-menu"
import {CopyChallengeFileUrlButton, DeleteChallengeFileButton} from "@/src/app/dashboard/admin/@repositories/[repository]/@repository/[challenge]/_components/files/ChallengeFilesOptionButtons"
import Link from "next/link"
import {readChallenge} from "@/src/lib/database/challenges"
import {deleteFile, getFileDownloadUrl, readFolderFiles} from "@/src/lib/storage"
import {notFound} from "next/navigation"

export default async function ReadChallengeFilesView({challengeId}: { challengeId: string }) {
    const challenge = await readChallenge(challengeId)
    if (!challenge) notFound()

    const data = await readFolderFiles(`${challenge.repositoryId}/${challenge.id}`)

    return (
        <div className={"h-full w-full flex flex-col"}>
            {data.map((file) => {
                return (
                    <div key={file.etag}
                         className={"hover:bg-accent p-2 flex flex-row items-center justify-between first:rounded-tr-lg"}>
                        <div className={"flex flex-row gap-x-2"}>
                            <FileIcon/>
                            <p>{file.name}</p>
                        </div>
                        <DropdownMenu>
                            <DropdownMenuTrigger>
                                <EllipsisVerticalIcon/>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                <DropdownMenuSeparator/>
                                <DeleteChallengeFileButton name={file.name} callback={async () => {
                                    "use server"
                                    await deleteFile(file.path)
                                    return true
                                }}/>
                                <DownloadChallengeFileButton
                                    filePath={file.path}
                                    fileName={file.name}/>
                                <CopyChallengeFileUrlView
                                    filePath={file.path}/>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                )
            })}
        </div>
    )
}


async function DownloadChallengeFileButton({filePath, fileName}: { filePath: string, fileName: string }) {
    const url = await getFileDownloadUrl(filePath)
    return (
        <DropdownMenuItem><Link href={url} download={fileName}>Download</Link></DropdownMenuItem>
    )
}

async function CopyChallengeFileUrlView({filePath}: { filePath: string }) {
    const url = await getFileDownloadUrl(filePath)
    return (
        <CopyChallengeFileUrlButton url={url}/>
    )
}