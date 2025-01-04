'use client'

import {useRouter} from "next/navigation";
import {Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger} from "@/components/ui/dialog";
import {Button} from "@/components/ui/button";
import React, {useState} from "react";
import {useToast} from "@/hooks/use-toast";
import {useForm} from "react-hook-form";
import {Form} from "@/components/ui/form";

export function DeleteDialogButton({description, confirmation, callback}: {description: string, confirmation: string, callback(): Promise<void>}) {
    const [open, setOpen] = useState(false)
    const {toast} = useToast()
    const router = useRouter()
    const form = useForm()

    async function onSubmit() {
        await callback()
        setOpen(false)
        toast({
            title: confirmation,
        })
        router.refresh()
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant={"destructive"}>Delete</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Are you absolutely sure?</DialogTitle>
                    <DialogDescription>{description}</DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <DialogClose>
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)}>
                                <Button variant={"destructive"} type={"submit"}>Delete</Button>
                            </form>
                        </Form>
                    </DialogClose>
                    <DialogClose asChild>
                        <Button >Close</Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}