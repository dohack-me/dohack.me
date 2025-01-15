'use client'

import React, {useState} from "react";
import {CollapsibleTrigger} from "@/src/components/ui/collapsible";
import {Button} from "@/src/components/ui/button";
import {ChevronDownIcon, ChevronUpIcon} from "lucide-react";

export function CollapsibleButton({title}: {title: string}) {
    const [open, setOpen] = useState(false)

    return (
        <CollapsibleTrigger asChild className={"w-full"}>
            <Button variant={"ghost"} className={"w-full flex flex-row justify-between"} onClick={() => setOpen(!open)}>
                {title}
                {open ? <ChevronUpIcon /> : <ChevronDownIcon />}
            </Button>
        </CollapsibleTrigger>
    )
}