'use client'

import {Button} from "@/src/components/ui/button";
import {ServerIcon} from "lucide-react";
import React from "react";
import {ServiceActionErrors} from "@/src/lib/orchestrator/ServiceActionErrors";
import {useToast} from "@/src/hooks/use-toast";
import {useRouter} from "next/navigation";
import {deploySocketInstance} from "@/src/lib/orchestrator/sockets";

export default function CreateSocketInstanceButton({socketId}: {socketId: string}) {
    const {toast} = useToast();
    const router = useRouter()

    async function onSubmit() {
        toast({
            title: "Starting socket instance...",
            description: "Please be patient!",
        })
        const {data, error} = await deploySocketInstance(socketId)
        if (error) {
            switch (error) {
                case ServiceActionErrors.TOO_MANY_INSTANCES:
                    toast({
                        title: "You already have another socket instance.",
                        description: "Please stop all instances before requesting another one."
                    })
                    return;
                case ServiceActionErrors.ALREADY_HAVE_INSTANCE:
                    toast({
                        title: "You already have a socket instance.",
                        description: "Please stop your instance to request another one."

                    })
                    return;
                case ServiceActionErrors.SERVER_ERROR | ServiceActionErrors.INVALID_ID:
                    toast({
                        title: "Something went wrong.",
                        description: "Please try again later.",
                    })
                    return;
            }
        }
        if (data) {
            toast({
                title: "Your socket instance is ready!",
                description: `Stop this instance to request another one.`,
            })
        }
        router.refresh()
    }

    return (
        <Button className={"cursor-pointer"} onClick={onSubmit}>
            <ServerIcon/>
            Launch Instance
        </Button>
    )
}