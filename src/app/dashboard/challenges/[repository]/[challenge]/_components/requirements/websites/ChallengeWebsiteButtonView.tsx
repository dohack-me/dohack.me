import {Website} from "@/src/lib/database/websites";
import {Button} from "@/src/components/ui/button";
import Link from "next/link";
import {ExternalLinkIcon, XIcon} from "lucide-react";
import {DeleteDialogButton} from "@/src/components/dialog/DeleteDialogButton";
import React from "react";
import CreateWebsiteInstanceButton
    from "@/src/app/dashboard/challenges/[repository]/[challenge]/_components/requirements/websites/CreateWebsiteInstanceButton";
import {readWebsiteInstance} from "@/src/lib/instances/websiteinstances";
import {shutdownWebsiteInstance} from "@/src/lib/orchestrator/websites";

export default async function ChallengeWebsiteButtonView({website}: {website: Website}) {
    const instance = await readWebsiteInstance(website.id);
    if (!instance) return (
        <CreateWebsiteInstanceButton websiteId={website.id} />
    )
    return (
        <div className={"w-full small-row justify-between"}>
            <Button asChild className={"grow"}>
                <Link href={instance.url} rel={"noopener noreferrer"} target={"_blank"}>
                    <ExternalLinkIcon/>
                    {instance.url}
                </Link>
            </Button>
            <DeleteDialogButton
                description={`This action cannot be undone, and you will lose any progress on the instance.`}
                confirmation={"Successfully deleted instance."}
                fail={"Could not delete your instance. Please try again later."}
                callback={async () => {
                    "use server"
                    const {error} = await shutdownWebsiteInstance(website.id)
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