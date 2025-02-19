import React, {Suspense} from "react";
import RepositoriesView from "@/src/app/dashboard/challenges/_components/RepositoriesView";
import {Card, CardDescription, CardHeader, CardTitle} from "@/src/components/ui/card";
import {Button} from "@/src/components/ui/button";
import Link from "next/link";
import {ChevronLeftIcon} from "lucide-react";
import {Skeleton} from "@/src/components/ui/skeleton";

export default async function ChallengesPage() {
    return (
        <div className={"grow padding small-column"}>
            <Card>
                <CardHeader className={"header-with-button"}>
                    <div className={"header-with-button-description"}>
                        <CardTitle>Select a repository</CardTitle>
                        <CardDescription>Repositories are publicly available <Link href={"https://github.com/dohack-me/dohack.me"} className={"underline"}>here</Link></CardDescription>
                    </div>
                    <Button asChild>
                        <Link href={`/dashboard`}>
                            <ChevronLeftIcon/>
                            <p className={"hidden lg:block"}>Back to Dashboard</p>
                            <p className={"hidden sm:block lg:hidden"}>Back</p>
                        </Link>
                    </Button>
                </CardHeader>
            </Card>
            <Suspense fallback={<Skeleton className={"grow"}/>}>
                <RepositoriesView/>
            </Suspense>
        </div>
    )
}