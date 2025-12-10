"use client"

import React from "react"
import DialogButton from "@/src/components/dialog/DialogButton"

export default function DeleteDialogButton({description, confirmation, callback, children}: {
    description: string,
    confirmation: string,
    callback(): Promise<void>,
    children: React.ReactNode
}) {
    return (
        <DialogButton
            title={"Are you absolutely sure?"}
            description={description}
            confirmVariant={"destructive"}
            confirm={"Delete"}
            startingTitle={"Deleting..."}
            endingSuccess={confirmation}
            callback={callback}>
            {children}
        </DialogButton>
    )
}