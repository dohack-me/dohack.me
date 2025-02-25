"use client"

import {useRouter} from "next/navigation"
import {Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger} from "@/src/components/ui/dialog"
import {Button} from "@/src/components/ui/button"
import React, {useState} from "react"
import {useToast} from "@/src/hooks/use-toast"
import {useForm} from "react-hook-form"
import {Form} from "@/src/components/ui/form"

export function DeleteDialogButton({description, confirmation, fail, callback, children}: {
    description: string,
    confirmation: string,
    fail: string,
    callback(): Promise<boolean>,
    children: React.ReactNode
}) {
    const [open, setOpen] = useState(false)
    const {toast} = useToast()
    const router = useRouter()
    const form = useForm()

    async function onSubmit() {
        toast({
            title: "Deleting...",
            description: "Please be patient!",
        })
        setOpen(false)
        const success = await callback()
        toast({
            title: (success ? confirmation : "Something went wrong."),
            description: (success ? null : fail),
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
                    <DialogTitle>Are you absolutely sure?</DialogTitle>
                    <DialogDescription>{description}</DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <DialogClose asChild>
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)}>
                                <Button variant={"destructive"} type={"submit"}>Delete</Button>
                            </form>
                        </Form>
                    </DialogClose>
                    <DialogClose asChild>
                        <Button>Close</Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}