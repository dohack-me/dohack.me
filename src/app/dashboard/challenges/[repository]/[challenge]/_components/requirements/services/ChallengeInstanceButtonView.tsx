import {Service} from "@/src/lib/database/services"
import {Button} from "@/src/components/ui/button"
import {XIcon} from "lucide-react"
import DeleteDialogButton from "@/src/components/dialog/DeleteDialogButton"
import React from "react"
import CreateServiceInstanceButton from "@/src/app/dashboard/challenges/[repository]/[challenge]/_components/requirements/services/CreateServiceInstanceButton"
import {readUserServiceInstance} from "@/src/lib/orchestrator/serviceinstances"
import {requestRenewServiceInstance, shutdownServiceInstance} from "@/src/lib/orchestrator/services"
import ChallengeSocketInstanceButton from "@/src/app/dashboard/challenges/[repository]/[challenge]/_components/requirements/services/ChallengeSocketInstanceButton"
import {ServiceType} from "@prisma/client"
import ChallengeWebsiteInstanceButton from "@/src/app/dashboard/challenges/[repository]/[challenge]/_components/requirements/services/ChallengeWebsiteInstanceButton"
import ChallengeInstanceExpiryButton from "@/src/app/dashboard/challenges/[repository]/[challenge]/_components/requirements/services/ChallengeInstanceExpiryButton"

export default async function ChallengeInstanceButtonView({service}: { service: Service }) {
    const instance = await readUserServiceInstance(service.id)
    if (!instance) return (
        <CreateServiceInstanceButton service={service}/>
    )
    return (
        <div className={"w-full small-row justify-between"}>
            <ChallengeInstanceExpiryButton expiry={instance.expiry} renewInstance={async () => {
                "use server"
                const {error} = await requestRenewServiceInstance(instance.service.id)
                return error == null
            }}/>
            {
                (service.type == ServiceType.SOCKET ?
                        <ChallengeSocketInstanceButton endpoint={instance.endpoint}/>
                        :
                        <ChallengeWebsiteInstanceButton endpoint={instance.endpoint}/>
                )
            }
            <DeleteDialogButton
                description={`This action cannot be undone, and you will lose any progress on the instance.`}
                confirmation={"Successfully deleted instance."}
                fail={"Could not delete your instance. Please try again later."}
                callback={async () => {
                    "use server"
                    const {error} = await shutdownServiceInstance(service.id)
                    return error == null
                }}
            >
                <Button>
                    <XIcon/>
                </Button>
            </DeleteDialogButton>
        </div>
    )
}