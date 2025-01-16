'use client'

import {Challenge} from "@/src/lib/database/challenges";
import {Input} from "@/src/components/ui/input";
import {Button} from "@/src/components/ui/button";
import React from "react";
import {CloudUploadIcon} from "lucide-react";
import {createChallengeFile} from "@/src/lib/storage";
import {useRouter} from "next/navigation";
import {useToast} from "@/src/hooks/use-toast";

export default function UploadChallengeFilesForm({challenge}: {challenge: Challenge}) {
    const router = useRouter()
    const {toast} = useToast()

    function onClick(event: React.MouseEvent<HTMLButtonElement>) {
        const inputElement = event.currentTarget.querySelector('input[type="file"]')! as HTMLInputElement;
        inputElement.click();
    }

    async function onDrop(event: React.DragEvent<HTMLButtonElement>) {
        event.preventDefault()
        const files = event.dataTransfer.files;
        await uploadFiles(files);
    }

    async function onChange(event: React.ChangeEvent<HTMLInputElement>) {
        event.preventDefault()
        const files = event.target.files;
        if (!files) return
        await uploadFiles(files);
    }

    async function uploadFiles(files: FileList) {
        if (files.length <= 0) {
            return
        }

        for (const file of Array.from(files)) {
            const formData = new FormData();
            formData.append("file", file);
            await createChallengeFile(formData, challenge);
        }
        router.refresh()
        toast({
            title: "Successfully uploaded file."
        })
    }

    return (
        <Button className={"h-full w-full rounded-r-none"} variant={"ghost"} type={"button"}
                onDragOver={(e) => {
                    e.stopPropagation()
                    e.preventDefault();
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
