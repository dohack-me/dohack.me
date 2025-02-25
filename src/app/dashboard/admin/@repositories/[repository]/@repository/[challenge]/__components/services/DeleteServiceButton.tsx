"use client"

import {DeleteDialogButton} from "@/src/components/dialog/DeleteDialogButton";
import {DropdownMenuItem} from "@/src/components/ui/dropdown-menu";
import React from "react";

export default function DeleteServiceButton({type, callback}: {
    type: "website" | "socket",
    callback(): Promise<boolean>
}) {
    return (
        <DeleteDialogButton
            description={`This action cannot be undone. This will permanently delete the ${type} service.`}
            confirmation={`Successfully deleted ${type} service.`}
            fail={`Could not delete ${type} service. Please try again later.`}
            callback={callback}>
            <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                Delete
            </DropdownMenuItem>
        </DeleteDialogButton>
    )
}