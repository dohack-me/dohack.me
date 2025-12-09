"use client"

import {Button} from "@/src/components/ui/button"
import {PanelsTopLeftIcon, ServerIcon} from "lucide-react"
import React from "react"
import {ServiceActionErrors} from "@/src/lib/orchestrator/ServiceActionErrors"
import {useRouter} from "next/navigation"
import {deployServiceInstance} from "@/src/lib/orchestrator/services"
import {Service, ServiceType} from "@/src/lib/prisma"
import {toast} from "sonner";
import {ServiceInstance} from "@/src/lib/orchestrator/serviceinstances";

export default function CreateServiceInstanceButton({service}: { service: Service }) {
    const router = useRouter()

    async function onSubmit() {
        toast.promise<{ data: ServiceInstance | null, error: ServiceActionErrors | null }>(
            deployServiceInstance(service.id), {
                loading: "Starting service instance...",
                success: "Your service instance is ready!",
                error: (error: ServiceActionErrors) => {
                    switch (error) {
                        case ServiceActionErrors.TOO_MANY_INSTANCES:
                            return "You already have another service instance."
                        case ServiceActionErrors.ALREADY_HAVE_INSTANCE:
                            return "You already have a service instance."
                        default:
                        case ServiceActionErrors.SERVER_ERROR | ServiceActionErrors.INVALID_ID:
                            return "Something went wrong."
                    }
                },
            })
        router.refresh()
    }

    return (
        <Button onClick={onSubmit}>
            {service.type == ServiceType.WEBSITE ? <PanelsTopLeftIcon/> : <ServerIcon/>}
            Launch Instance
        </Button>
    )
}