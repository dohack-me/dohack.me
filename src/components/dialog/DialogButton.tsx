"use client"

import {useRouter} from "next/navigation"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/src/components/ui/dialog"
import {Button} from "@/src/components/ui/button"
import React, {useState} from "react"
import {useForm} from "react-hook-form"
import {toast} from "sonner"

export default function DialogButton({
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
    const router = useRouter()
    const form = useForm()

    async function onSubmit() {
        setOpen(false)
        toast.promise<void>(callback, {
            loading: startingTitle,
            success: endingSuccess,
            error: (error: Error) => error.message,
        })
        router.refresh()
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                    <DialogDescription>{description}</DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <DialogClose asChild>
                        <form onSubmit={form.handleSubmit(onSubmit)}>
                            <Button variant={confirmVariant} type={"submit"}>{confirm}</Button>
                        </form>
                    </DialogClose>
                    <DialogClose asChild>
                        <Button variant={closeVariant}>Close</Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}