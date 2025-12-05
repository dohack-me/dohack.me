"use client"

import {Button} from "@/src/components/ui/button"
import {ClipboardIcon} from "lucide-react"
import React from "react"
import {toast} from "sonner";

export default function ChallengeSocketInstanceButton({endpoint}: { endpoint: string }) {
    return (
        <Button className={"grow"} onClick={async () => {
            await navigator.clipboard.writeText(endpoint)
            toast.success("Copied command into your clipboard.")
        }}>
            <ClipboardIcon/>
            {endpoint}
        </Button>
    )
}