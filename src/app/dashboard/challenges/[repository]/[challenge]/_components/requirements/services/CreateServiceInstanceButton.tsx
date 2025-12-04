"use client"

import {Button} from "@/src/components/ui/button"
import {PanelsTopLeftIcon, ServerIcon} from "lucide-react"
import React from "react"
import {ServiceActionErrors} from "@/src/lib/orchestrator/ServiceActionErrors"
import {useRouter} from "next/navigation"
import {deployServiceInstance} from "@/src/lib/orchestrator/services"
import {Service, ServiceType} from "@prisma/client"

export default function CreateServiceInstanceButton({service}: { service: Service }) {
    const {toast} = useToast()
    const router = useRouter()

    async function onSubmit() {
        toast({
            title: "Starting service instance...",
            description: "Please be patient!",
        })
        const {data, error} = await deployServiceInstance(service.id)
        if (error) {
            switch (error) {
                case ServiceActionErrors.TOO_MANY_INSTANCES:
                    toast({
                        title: "You already have another service instance.",
                        description: "Please stop all instances before requesting another one.",
                    })
                    return
                case ServiceActionErrors.ALREADY_HAVE_INSTANCE:
                    toast({
                        title: "You already have a service instance.",
                        description: "Please stop your instance to request another one.",
                    })
                    return
                case ServiceActionErrors.SERVER_ERROR | ServiceActionErrors.INVALID_ID:
                    toast({
                        title: "Something went wrong.",
                        description: "Please try again later.",
                    })
                    return
            }
        }
        if (data) {
            toast({
                title: "Your service instance is ready!",
                description: `Stop this instance to request another one.`,
            })
        }
        router.refresh()
    }

    return (
        <Button onClick={onSubmit}>
            {service.type == ServiceType.WEBSITE ? <PanelsTopLeftIcon/> : <ServerIcon/>}
            Launch Instance
        </Button>
    )
}