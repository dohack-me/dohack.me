"use client"

import React from "react"
import {DropdownMenuItem} from "@/src/components/ui/dropdown-menu"
import DeleteActionAlertDialog from "@/src/components/dialog/DeleteActionAlertDialog"
import {toast} from "sonner";

export function DeleteChallengeFileButton({name, callback}: { name: string, callback(): Promise<void> }) {
    return (
        <DeleteActionAlertDialog
            description={`This action cannot be undone. This will permanently delete "${name}".`}
            confirmation={"Successfully deleted file."}
            callback={callback}>
            <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                Delete
            </DropdownMenuItem>
        </DeleteActionAlertDialog>
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