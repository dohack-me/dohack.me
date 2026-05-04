"use client"

import {useRouter} from "next/navigation"
import React, {useState, useTransition} from "react"
import {toast} from "sonner"
import {
    AlertDialog, AlertDialogAction, AlertDialogCancel,
    AlertDialogContent, AlertDialogDescription, AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger
} from "@/src/components/ui/alert-dialog";

export default function ActionAlertDialog({
                                         title,
                                         description,
                                         confirmVariant = "default",
                                         closeVariant = "default",
                                         confirm,
                                         startingTitle,
                                         endingSuccess,
                                         callback,
                                         children,
                                     }: {
    title: string;
    description: string,
    confirmVariant?: "link" | "default" | "destructive" | "outline" | "secondary" | "ghost",
    closeVariant?: "link" | "default" | "destructive" | "outline" | "secondary" | "ghost",
    confirm: string,
    startingTitle: string,
    endingSuccess: string,
    callback(): Promise<void>,
    children: React.ReactNode
}) {
    const [open, setOpen] = useState(false)
    const [isPending, startTransition] = useTransition()
    const router = useRouter()

    function onConfirm() {
        startTransition(async () => {
            toast.promise<void>(callback, {
                loading: startingTitle,
                success: () => {
                    router.refresh()
                    return endingSuccess
                },
                error: (error: Error) => error.message,
            })
            setOpen(false)
        })
    }

    return (
        <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogTrigger asChild>
                {children}
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>{title}</AlertDialogTitle>
                    <AlertDialogDescription>{description}</AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel variant={closeVariant} disabled={isPending}>Cancel</AlertDialogCancel>
                    <AlertDialogAction variant={confirmVariant} disabled={isPending} onClick={onConfirm}>{confirm}</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}