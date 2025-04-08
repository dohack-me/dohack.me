import {Button} from "@/src/components/ui/button"
import Link from "next/link"
import {ExternalLinkIcon} from "lucide-react"
import React from "react"

export default async function ChallengeWebsiteInstanceButton({endpoint}: { endpoint: string }) {
    return (
        <Button asChild className={"grow"}>
            <Link href={endpoint} rel={"noopener noreferrer"} target={"_blank"}>
                <ExternalLinkIcon/>
                {endpoint}
            </Link>
        </Button>
    )
}