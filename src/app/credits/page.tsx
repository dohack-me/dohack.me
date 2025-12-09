import {Card, CardAction, CardDescription, CardHeader, CardTitle} from "@/src/components/ui/card"
import OrganizationCreditsView from "@/src/app/credits/_components/OrganizationCreditsView"
import {Button} from "@/src/components/ui/button"
import Link from "next/link"
import {ChevronLeftIcon} from "lucide-react"
import React, {Suspense} from "react"
import {Skeleton} from "@/src/components/ui/skeleton"

export const dynamic = "force-dynamic"

export default async function Credits() {
    return (
        <div className={"min-h-screen small-column padding"}>
            <Card>
                <CardHeader>
                    <CardTitle>Repository Credits</CardTitle>
                    <CardDescription>This website wouldn&apos;t have been possible without these organizations
                        open sourcing their challenges. Thank you!</CardDescription>
                    <CardDescription>Want to suggest a repository? Make an issue <Link
                        href={"https://github.com/dohack-me/repositories-archive/issues/new?title=Repository+Suggestion"}
                        className={"underline"} target={"_blank"}>here</Link>.</CardDescription>
                    <CardAction>
                        <div className={"small-row"}>
                            <Button asChild>
                                <Link href={"/"}>
                                    <ChevronLeftIcon/>
                                    Back to Home
                                </Link>
                            </Button>
                            <Button asChild>
                                <Link href={"/dashboard"}>
                                    <ChevronLeftIcon/>
                                    Back to Dashboard
                                </Link>
                            </Button>
                        </div>
                    </CardAction>
                </CardHeader>
            </Card>
            <Suspense fallback={<Skeleton className={"grow"}/>}>
                <OrganizationCreditsView/>
            </Suspense>
        </div>
    )
}
