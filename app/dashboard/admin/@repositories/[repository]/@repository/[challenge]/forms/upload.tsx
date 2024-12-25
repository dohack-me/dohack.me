'use client'

import {Repository} from "@/lib/database/repository";
import {Challenge} from "@/lib/database/challenge";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import React from "react";

export default function UploadChallengeFilesForm({repository, challenge}: {repository: Repository, challenge: Challenge}) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const basePath = `/${repository.id}/${challenge.id}`;

    function onClick() {
        const fileInput = document.getElementById(challenge.id) as HTMLInputElement;
        fileInput.click()
    }

    function onDrop(event: React.DragEvent<HTMLButtonElement>) {
        alert(event.dataTransfer.files.length)
    }

    return (
        <form className={"h-full w-full"}>
            <Button className={"h-full w-full rounded-r-none"} variant={"ghost"} type={"button"}
                    onClick={onClick}
                    onDragOver={(e) => {
                        e.stopPropagation()
                        e.preventDefault();
                    }}
                    onDrop={onDrop}
            >
                test
            </Button>
            <Input type={"file"} className={"hidden"} id={challenge.id}/>
        </form>
    )
}
