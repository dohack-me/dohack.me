"use client"

import React from "react"
import DialogButton from "@/src/components/dialog/DialogButton"

export default function DeleteDialogButton({description, confirmation, fail, callback, children}: {
    description: string,
    confirmation: string,
    fail: string,
    callback(): Promise<boolean>,
    children: React.ReactNode
}) {
    return (
        <DialogButton
            title={"Are you absolutely sure?"}
            description={description}
            variant={"destructive"}
            confirm={"Delete"}
            startingTitle={"Deleting..."}
            startingDescription={"Please be patient!"}
            endingSuccess={confirmation}
            endingFail={fail}
            callback={callback}>
            {children}
        </DialogButton>
    )
}