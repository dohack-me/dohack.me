'use client'

import {Button} from "@/src/components/ui/button";
import {ExternalLinkIcon, Loader2Icon, ServerIcon} from "lucide-react";
import React, {useEffect, useState} from "react";
import {useToast} from "@/src/hooks/use-toast";
import {Website} from "@/src/lib/services/websites";
import {readWebsiteInstance, requestWebsiteService} from "@/src/lib/services/orchestrator";
import {WebsiteServiceErrors} from "@/src/lib/services/WebsiteServiceErrors";
import Link from "next/link";

export default function ChallengeWebsiteButton({website}: {website: Website}) {
    const {toast} = useToast()
    const [url, setUrl] = useState<string | null | undefined>(undefined)

    useEffect(() => {
        readWebsiteInstance(website.id).then(((result) => {
            setUrl((result ? result.url : null));
        }))
    }, [website.id])

    async function onSubmit() {
        toast({
            title: "Starting website instance...",
            description: "Please be patient!",
        })
        const {data, error} = await requestWebsiteService(website.id)
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
            setUrl(data.url)
        }
    }

    if (url === undefined) {
        return (
            <Button disabled>
                <Loader2Icon className={"animate-spin"} />
                <p>Loading...</p>
            </Button>
        )
    } else if (url === null) {
        return (
            <Button onClick={onSubmit}>
                <ServerIcon/>
                Launch Instance
            </Button>
        )
    } else {
        return (
            <Button asChild>
                <Link href={url}>
                    <ExternalLinkIcon/>
                    {url}
                </Link>
            </Button>
        )
    }
}