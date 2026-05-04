"use client"

import React from "react"
import ActionAlertDialog from "@/src/components/dialog/ActionAlertDialog"

export default function DeleteActionAlertDialog({description, confirmation, callback, children}: {
    description: string,
    confirmation: string,
    callback(): Promise<void>,
    children: React.ReactNode
}) {
    return (
        <ActionAlertDialog
            title={"Are you absolutely sure?"}
            description={description}
            confirmVariant={"destructive"}
            confirm={"Delete"}
            startingTitle={"Deleting..."}
            endingSuccess={confirmation}
            callback={callback}>
            {children}
        </ActionAlertDialog>
    )
}