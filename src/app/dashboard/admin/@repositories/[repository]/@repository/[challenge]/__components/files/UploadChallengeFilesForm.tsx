"use client"

import {Challenge} from "@/src/lib/database/challenges"
import {Input} from "@/src/components/ui/input"
import {Button} from "@/src/components/ui/button"
import React from "react"
import {CloudUploadIcon} from "lucide-react"
import {useRouter} from "next/navigation"
import {useToast} from "@/src/hooks/use-toast"
import {getFileUploadUrl} from "@/src/lib/storage"

export default function UploadChallengeFilesForm({challenge}: { challenge: Challenge }) {
    const router = useRouter()
    const {toast} = useToast()

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

        toast({
            title: "Uploading files...",
            description: "Please be patient!",
        })

        // forEach not used so that await can be used
        for (const file of Array.from(files)) {
            const filePath = `${challenge.repository.id}/${challenge.id}/${file.name}`
            const uploadUrl = await getFileUploadUrl(filePath)
            await fetch(uploadUrl, {
                method: "PUT",
                body: file,
            })
        }

        router.refresh()
        toast({
            title: "Successfully uploaded files.",
        })
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
