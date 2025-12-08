"use client"

import DeleteDialogButton from "@/src/components/dialog/DeleteDialogButton"
import {DropdownMenuItem} from "@/src/components/ui/dropdown-menu"
import React from "react"

export default function DeleteHintButton({callback}: { callback(): Promise<boolean> }) {
    return (
        <DeleteDialogButton
            description={"This action cannot be undone. This will permanently delete the hint."}
            confirmation={"Successfully deleted hint."}
            fail={"Could not delete hint. Please try again later."}
            callback={callback}>
            <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                Delete
            </DropdownMenuItem>
        </DeleteDialogButton>
    )
}