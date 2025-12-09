"use client"

import React from "react"
import {DropdownMenuItem} from "@/src/components/ui/dropdown-menu"
import DeleteDialogButton from "@/src/components/dialog/DeleteDialogButton"
import {toast} from "sonner";

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
    async function onClick() {
        await navigator.clipboard.writeText(url)
        toast.success("Copied file link into your clipboard.")
    }

    return (
        <DropdownMenuItem onClick={onClick}>Copy URL</DropdownMenuItem>
    )
}