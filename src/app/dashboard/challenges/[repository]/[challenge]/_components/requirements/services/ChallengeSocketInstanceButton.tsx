"use client"

import {Button} from "@/src/components/ui/button"
import {ClipboardIcon} from "lucide-react"
import React from "react"
import {useToast} from "@/src/hooks/use-toast"

export default function ChallengeSocketInstanceButton({endpoint}: { endpoint: string }) {
    const {toast} = useToast()
    return (
        <Button className={"grow"} onClick={async () => {
            await navigator.clipboard.writeText(endpoint)
            toast({
                title: "Copied command into your clipboard.",
            })
        }}>
            <ClipboardIcon/>
            {endpoint}
        </Button>
    )
}