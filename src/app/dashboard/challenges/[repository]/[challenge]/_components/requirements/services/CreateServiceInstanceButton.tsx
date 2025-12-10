"use client"

import {Button} from "@/src/components/ui/button"
import {PanelsTopLeftIcon, ServerIcon} from "lucide-react"
import React from "react"
import {useRouter} from "next/navigation"
import {deployServiceInstance} from "@/src/lib/orchestrator/services"
import {Service, ServiceType} from "@/src/lib/prisma"
import {toast} from "sonner";
import {ServiceInstance} from "@/src/lib/orchestrator/serviceinstances";
import {ServiceCreationError} from "@/src/lib/orchestrator/ServiceActionErrors";

export default function CreateServiceInstanceButton({service}: { service: Service }) {
    const router = useRouter()

    async function onSubmit() {
        toast.promise<ServiceInstance>(
            deployServiceInstance(service.id), {
                loading: "Starting service instance...",
                success: "Your service instance is ready!",
                error: (error: ServiceCreationError) => error.message,
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