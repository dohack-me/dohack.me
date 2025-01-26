import {Socket} from "@/src/lib/services/sockets";
import {Button} from "@/src/components/ui/button";
import Link from "next/link";
import {ClipboardIcon, XIcon} from "lucide-react";
import {DeleteDialogButton} from "@/src/components/DeleteDialogButton";
import React from "react";
import CreateSocketInstanceButton
    from "@/src/app/dashboard/challenges/[repository]/[challenge]/_components/requirements/sockets/CreateSocketInstanceButton";
import {readSocketInstance} from "@/src/lib/instances/socketinstances";
import {shutdownSocketInstance} from "@/src/lib/orchestrator/sockets";
import ChallengeCopySocketButton
    from "@/src/app/dashboard/challenges/[repository]/[challenge]/_components/requirements/sockets/ChallengeCopySocketButton";

export default async function ChallengeSocketButtonView({socket}: {socket: Socket}) {
    const instance = await readSocketInstance(socket.id);
    if (!instance) return (
        <CreateSocketInstanceButton socketId={socket.id} />
    )
    return (
        <div className={"w-full small-row justify-between"}>
            <ChallengeCopySocketButton value={`nc ${process.env.BACKEND_DISPLAY} ${instance.port}`}/>
            <DeleteDialogButton
                description={`This action cannot be undone, and you will lose any progress on the instance.`}
                confirmation={"Successfully deleted instance."}
                fail={"Could not delete your instance. Please try again later."}
                callback={async () => {
                    'use server'
                    const {error} = await shutdownSocketInstance(socket.id)
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