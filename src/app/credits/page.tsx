import {Card, CardDescription, CardFooter, CardHeader, CardTitle} from "@/src/components/ui/card";
import OrganizationCreditsView from "@/src/app/credits/_components/OrganizationCreditsView";
import {Button} from "@/src/components/ui/button";
import Link from "next/link";
import {ChevronLeftIcon} from "lucide-react";
import React, {Suspense} from "react";
import {Skeleton} from "@/src/components/ui/skeleton";

export const dynamic = "force-dynamic";

export default async function Credits() {
    return (
        <div className={"min-h-screen small-column padding"}>
            <Card>
                <CardHeader className={"header-with-button"}>
                    <div className={"header-with-button-description"}>
                        <CardTitle>Repository Credits</CardTitle>
                        <CardDescription>This website wouldn&apos;t have been possible without these organizations open sourcing their challenges. Thank you!</CardDescription>
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
                <CardFooter className={"flex flex-col items-start"}>
                    <p>Want to suggest a repository? Make an issue <Link href={"https://github.com/dohack-me/repositories-archive/issues/new?title=Repository+Suggestion"} className={"underline hover:text-accent"} rel={"noopener noreferrer"} target={"_blank"}>here</Link>.</p>
                </CardFooter>
            </Card>
            <Suspense fallback={<Skeleton className={"grow"}/>}>
                <OrganizationCreditsView/>
            </Suspense>
        </div>
    );
}
