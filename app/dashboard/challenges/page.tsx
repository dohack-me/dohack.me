import {Suspense} from "react";
import RepositoriesView from "@/app/dashboard/challenges/_components/RepositoriesView";
import RepositoriesLoading from "@/app/dashboard/challenges/loading";
import {Card, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";

export default async function ChallengesPage() {
    return (
        <div className={"flex-grow flex flex-col py-4 px-8 gap-y-4"}>
            <Card className={"flex-grow flex flex-col"}>
                <CardHeader>
                    <CardTitle className={"text-center"}>Select a repository</CardTitle>
                    <CardDescription className={"text-center"}>Repositories are publicly available at ...</CardDescription>
                </CardHeader>
                <Suspense fallback={<RepositoriesLoading/>}>
                    <RepositoriesView/>
                </Suspense>
            </Card>
        </div>
    )
}