'use client'

import {Challenge} from "@/lib/database/challenge";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import React from "react";
import {CloudUploadIcon} from "lucide-react";
import {uploadChallengeFile} from "@/lib/storage";

export default function UploadChallengeFilesForm({challenge}: {challenge: Challenge}) {
    function onClick(event: React.MouseEvent<HTMLButtonElement>) {
        const inputElement = event.currentTarget.querySelector('input[type="file"]')! as HTMLInputElement;
        inputElement.click();
    }

    async function onDrop(event: React.DragEvent<HTMLButtonElement>) {
        event.preventDefault()
        const files = event.dataTransfer.files;
        if (files.length <= 0) {
            return
        }

        for (const file of Array.from(files)) {
            const formData = new FormData();
            formData.append("file", file);
            await uploadChallengeFile(formData, challenge);
        }
    }

    async function onChange(event: React.ChangeEvent<HTMLInputElement>) {
        event.preventDefault()
        const files = event.target.files;
        if (!files || files.length <= 0) {
            return
        }

        for (const file of Array.from(files)) {
            const formData = new FormData();
            formData.append("file", file);
            await uploadChallengeFile(formData, challenge);
        }
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
