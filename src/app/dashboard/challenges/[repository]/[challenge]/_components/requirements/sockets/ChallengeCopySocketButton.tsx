'use client'

import {Button} from "@/src/components/ui/button";
import {ClipboardIcon} from "lucide-react";
import React from "react";
import {useToast} from "@/src/hooks/use-toast";

export default function ChallengeCopySocketButton({value}: {value: string}) {
    const {toast} = useToast()
    return (
        <Button className={"flex-grow"} onClick={async () => {
            await navigator.clipboard.writeText(value);
            toast({
                title: "Copied command into your clipboard."
            })
        }}>
            <ClipboardIcon/>
            {value}
        </Button>
    )
}