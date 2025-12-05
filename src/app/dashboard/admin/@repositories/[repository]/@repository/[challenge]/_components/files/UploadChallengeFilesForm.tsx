"use client"

import {Input} from "@/src/components/ui/input"
import {Button} from "@/src/components/ui/button"
import React from "react"
import {CloudUploadIcon} from "lucide-react"
import {useRouter} from "next/navigation"
import {getFileUploadUrl} from "@/src/lib/storage"
import {Challenge} from "@/src/lib/prisma"
import {toast} from "sonner";

export default function UploadChallengeFilesForm({challenge}: { challenge: Challenge }) {
    const router = useRouter()

    function onClick(event: React.MouseEvent<HTMLButtonElement>) {
        const inputElement = event.currentTarget.querySelector("input[type=\"file\"]")! as HTMLInputElement
        inputElement.click()
    }

    async function onDrop(event: React.DragEvent<HTMLButtonElement>) {
        event.preventDefault()
        const files = event.dataTransfer.files
        await uploadFiles(files)
    }

    async function onChange(event: React.ChangeEvent<HTMLInputElement>) {
        event.preventDefault()
        const files = event.target.files
        if (!files) return
        await uploadFiles(files)
    }

    async function uploadFiles(files: FileList) {
        if (files.length <= 0) {
            return
        }

        // forEach not used so that await can be used
        const uploadPromises: Promise<Response>[] = []
        for (const file of Array.from(files)) {
            const filePath = `${challenge.repositoryId}/${challenge.id}/${file.name}`
            const uploadUrl = await getFileUploadUrl(filePath)
            uploadPromises.push(fetch(uploadUrl, {
                method: "PUT",
                body: file,
            }))
        }
        toast.promise<Response[]>(Promise.all(uploadPromises), {
            loading: "Uploading files...",
            success: "Successfully uploaded files.",
            error: "Something went wrong while uploading files.",
        })
        router.refresh()
    }

    return (
        <Button className={"h-full w-full rounded-r-none"} variant={"ghost"} type={"button"}
                onDragOver={(e) => {
                    e.stopPropagation()
                    e.preventDefault()
                }}
                onDrop={onDrop}
                onClick={onClick}>
            <div className={"h-full flex flex-col items-center justify-center gap-y-3"}>
                <div className={"flex flex-col items-center justify-center"}>
                    <CloudUploadIcon size={100}/>
                    <p>Drop your files here</p>
                </div>
                <p>Or, click to choose files</p>
            </div>
            <Input type={"file"} multiple className={"hidden"} onChange={onChange}/>
        </Button>
    )
}
