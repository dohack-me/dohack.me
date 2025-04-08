"use client"

import React from "react"
import {DropdownMenuItem} from "@/src/components/ui/dropdown-menu"
import {useToast} from "@/src/hooks/use-toast"
import DeleteDialogButton from "@/src/components/dialog/DeleteDialogButton"

export function DeleteChallengeFileButton({name, callback}: { name: string, callback(): Promise<boolean> }) {
    return (
        <DeleteDialogButton
            description={`This action cannot be undone. This will permanently delete "${name}".`}
            confirmation={"Successfully deleted file."}
            fail={"Could not delete file. Please try again later."}
            callback={callback}>
            <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                Delete
            </DropdownMenuItem>
        </DeleteDialogButton>
    )
}

export function CopyChallengeFileUrlButton({url}: { url: string }) {
    const {toast} = useToast()

    async function onClick() {
        await navigator.clipboard.writeText(url)
        toast({
            title: "Copied file link into your clipboard.",
        })
    }

    return (
        <DropdownMenuItem onClick={onClick}>Copy URL</DropdownMenuItem>
    )
}