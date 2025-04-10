import {Card, CardDescription, CardHeader, CardTitle} from "@/src/components/ui/card"
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
                <CardHeader className={"header-with-button"}>
                    <div className={"header-with-button-description"}>
                        <CardTitle>Repository Credits</CardTitle>
                        <div>
                            <CardDescription>This website wouldn&apos;t have been possible without these organizations
                                open sourcing their challenges. Thank you!</CardDescription>
                            <CardDescription>Want to suggest a repository? Make an issue <Link
                                href={"https://github.com/dohack-me/repositories-archive/issues/new?title=Repository+Suggestion"}
                                className={"underline"} target={"_blank"}>here</Link>.</CardDescription>
                        </div>
                    </div>
                    <div className={"flex flex-row gap-x-2"}>
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
                </CardHeader>
            </Card>
            <Suspense fallback={<Skeleton className={"grow"}/>}>
                <OrganizationCreditsView/>
            </Suspense>
        </div>
    )
}
