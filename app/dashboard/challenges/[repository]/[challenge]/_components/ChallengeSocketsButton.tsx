'use client'

import {Button} from "@/components/ui/button";
import {ServerIcon} from "lucide-react";
import React from "react";
import {Socket} from "@/lib/database/services/sockets";
import {useToast} from "@/hooks/use-toast";

export default function ChallengeSocketsButton({socket}: {socket: Socket}) {
    const {toast} = useToast()
    return (
        <Button onClick={async () => {
            await navigator.clipboard.writeText(`nc ${socket.host} ${socket.port}`);
            toast({
                title: "Copied command into your clipboard."
            })
        }}>
            <ServerIcon/>
            {`nc ${socket.host} ${socket.port}`}
        </Button>
    )
}