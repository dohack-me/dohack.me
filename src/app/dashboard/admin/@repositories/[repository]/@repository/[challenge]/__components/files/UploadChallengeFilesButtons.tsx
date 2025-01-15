'use client'

import {Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger} from "@/src/components/ui/dialog";
import {Button} from "@/src/components/ui/button";
import React, {useState} from "react";
import {DropdownMenuItem} from "@/src/components/ui/dropdown-menu";
import {deleteChallengeFile} from "@/src/lib/storage";
import {Form} from "@/src/components/ui/form";
import {useToast} from "@/src/hooks/use-toast";
import {useRouter} from "next/navigation";
import {useForm} from "react-hook-form";

export function DeleteChallengeFileButton({path, name}: {path: string, name: string}) {
    const [open, setOpen] = useState(false)
    const {toast} = useToast()
    const router = useRouter()
    const form = useForm()

    async function onSubmit() {
        await deleteChallengeFile(path)
        setOpen(false)
        toast({
            title: "Successfully deleted file.",
        })
        router.refresh()
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                    Delete
                </DropdownMenuItem>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Are you absolutely sure?</DialogTitle>
                    <DialogDescription>{`This action cannot be undone. This will permanently delete "${name}".`}</DialogDescription>
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
                        <Button>Close</Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export function CopyChallengeFileUrlButton({url}: {url: string}) {
    const {toast} = useToast()

    async function onClick() {
        await navigator.clipboard.writeText(url)
        toast({
            title: "Copied file link into your clipboard.",
        })
    }

    return (
        <DropdownMenuItem onClick={onClick}>Copy URL</DropdownMenuItem>
    )
}