'use client'

import React, {useState} from "react";
import {Button} from "@/components/ui/button";
import {ChevronDownIcon, ChevronUpIcon} from "lucide-react";
import {CollapsibleTrigger} from "@/components/ui/collapsible";

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