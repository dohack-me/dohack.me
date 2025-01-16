'use client'

import {Button} from "@/src/components/ui/button";
import {ServerIcon} from "lucide-react";
import React from "react";
import {requestWebsiteService} from "@/src/lib/services/orchestrator";
import {WebsiteServiceErrors} from "@/src/lib/services/WebsiteServiceErrors";
import {useToast} from "@/src/hooks/use-toast";
import {useRouter} from "next/navigation";

export default function CreateWebsiteInstanceButton({websiteId}: {websiteId: string}) {
    const {toast} = useToast();
    const router = useRouter()

    async function onSubmit() {
        toast({
            title: "Starting website instance...",
            description: "Please be patient!",
        })
        const {data, error} = await requestWebsiteService(websiteId)
        if (error) {
            switch (error) {
                case WebsiteServiceErrors.TOO_MANY_INSTANCES:
                    toast({
                        title: "You already have another website instance.",
                        description: "Please stop all instances before requesting another one."
                    })
                    return;
                case WebsiteServiceErrors.ALREADY_HAVE_INSTANCE:
                    toast({
                        title: "You already have a website instance.",
                        description: "Please stop your instance to request another one."

                    })
                    return;
                case WebsiteServiceErrors.SERVER_ERROR | WebsiteServiceErrors.INVALID_ID:
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