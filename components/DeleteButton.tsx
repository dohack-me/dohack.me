'use client'

import {useRouter} from "next/navigation";
import {DialogClose} from "@/components/ui/dialog";
import {Button} from "@/components/ui/button";
import React from "react";

export function DeleteButton({callback}: {callback(): Promise<void>}) {
    const router = useRouter()

    async function onSubmit() {
        await callback()
        router.refresh()
    }

    return (
        <DialogClose asChild>
            <form onSubmit={async () => {await onSubmit()}}>
                <Button variant={"destructive"} type={"submit"}>Delete</Button>
            </form>
        </DialogClose>
    )
}