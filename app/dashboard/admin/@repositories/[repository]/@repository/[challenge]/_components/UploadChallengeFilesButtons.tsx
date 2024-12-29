'use client'

import {Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger} from "@/components/ui/dialog";
import {Button} from "@/components/ui/button";
import {DeleteButton} from "@/components/DeleteButton";
import React, {useState} from "react";
import {DropdownMenuItem} from "@/components/ui/dropdown-menu";
import {deleteChallengeFile} from "@/lib/storage";

export function DeleteChallengeFileButton({path, name}: {path: string, name: string}) {
    const [open, setOpen] = useState(false)
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
                    <DeleteButton callback={async() => {
                        await deleteChallengeFile(path)
                    }}/>
                    <DialogClose asChild>
                        <Button>Close</Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export function CopyChallengeFileUrlButton({url}: {url: string}) {
    async function onClick() {
        await navigator.clipboard.writeText(url)
    }

    return (
        <DropdownMenuItem onClick={onClick}>Copy URL</DropdownMenuItem>
    )
}