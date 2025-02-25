"use client"

import {Button} from "@/src/components/ui/button";
import {ServerIcon} from "lucide-react";
import React from "react";
import {ServiceActionErrors} from "@/src/lib/orchestrator/ServiceActionErrors";
import {useToast} from "@/src/hooks/use-toast";
import {useRouter} from "next/navigation";
import {deployWebsiteInstance} from "@/src/lib/orchestrator/websites";

export default function CreateWebsiteInstanceButton({websiteId}: { websiteId: string }) {
    const {toast} = useToast();
    const router = useRouter()

    async function onSubmit() {
        toast({
            title: "Starting website instance...",
            description: "Please be patient!",
        })
        const {data, error} = await deployWebsiteInstance(websiteId)
        if (error) {
            switch (error) {
                case ServiceActionErrors.TOO_MANY_INSTANCES:
                    toast({
                        title: "You already have another website instance.",
                        description: "Please stop all instances before requesting another one.",
                    })
                    return;
                case ServiceActionErrors.ALREADY_HAVE_INSTANCE:
                    toast({
                        title: "You already have a website instance.",
                        description: "Please stop your instance to request another one.",

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
                title: "Your website instance is ready!",
                description: `Stop this instance to request another one.`,
            })
        }
        router.refresh()
    }

    return (
        <Button onClick={onSubmit}>
            <ServerIcon/>
            Launch Instance
        </Button>
    )
}