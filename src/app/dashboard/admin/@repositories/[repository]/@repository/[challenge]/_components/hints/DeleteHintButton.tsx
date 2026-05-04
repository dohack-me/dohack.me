"use client"

import DeleteActionAlertDialog from "@/src/components/dialog/DeleteActionAlertDialog"
import {DropdownMenuItem} from "@/src/components/ui/dropdown-menu"
import React from "react"

export default function DeleteHintButton({callback}: { callback(): Promise<void> }) {
    return (
        <DeleteActionAlertDialog
            description={"This action cannot be undone. This will permanently delete the hint."}
            confirmation={"Successfully deleted hint."}
            callback={callback}>
            <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                Delete
            </DropdownMenuItem>
        </DeleteActionAlertDialog>
    )
}