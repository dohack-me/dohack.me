"use client"

import {useRouter} from "next/navigation"
import {Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger} from "@/src/components/ui/dialog"
import {Button} from "@/src/components/ui/button"
import React, {useState} from "react"
import {useToast} from "@/src/hooks/use-toast"
import {useForm} from "react-hook-form"
import {Form} from "@/src/components/ui/form"

export default function DialogButton({
                                         title,
                                         description,
                                         variant,
                                         confirm,
                                         startingTitle,
                                         startingDescription,
                                         endingSuccess,
                                         endingFail,
                                         callback,
                                         children,
                                     }: {
    title: string;
    description: string,
    variant: "link" | "default" | "destructive" | "outline" | "secondary" | "ghost",
    confirm: string,
    startingTitle: string,
    startingDescription: string,
    endingSuccess: string,
    endingFail: string,
    callback(): Promise<boolean>,
    children: React.ReactNode
}) {
    const [open, setOpen] = useState(false)
    const {toast} = useToast()
    const router = useRouter()
    const form = useForm()

    async function onSubmit() {
        toast({
            title: startingTitle,
            description: startingDescription,
        })
        setOpen(false)
        const success = await callback()
        toast({
            title: (success ? endingSuccess : "Something went wrong."),
            description: (success ? null : endingFail),
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
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)}>
                                <Button variant={variant} type={"submit"}>{confirm}</Button>
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