"use client"

import DeleteDialogButton from "@/src/components/dialog/DeleteDialogButton"
import {DropdownMenuItem} from "@/src/components/ui/dropdown-menu"
import React from "react"
import {ServiceType} from "@/src/lib/prisma"

export default function DeleteServiceButton({type, callback}: {
    type: ServiceType,
    callback(): Promise<void>
}) {
    return (
        <DeleteDialogButton
            description={`This action cannot be undone. This will permanently delete the ${type} service.`}
            confirmation={`Successfully deleted ${type} service.`}
            callback={callback}>
            <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                Delete
            </DropdownMenuItem>
        </DeleteDialogButton>
    )
}