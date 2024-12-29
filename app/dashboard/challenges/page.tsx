import {Suspense} from "react";
import RepositoriesView from "@/app/dashboard/challenges/_components/RepositoriesView";
import RepositoriesLoading from "@/app/dashboard/challenges/loading";

export default async function ChallengesPage() {
    return (
        <div className={"flex-grow flex flex-col py-4 px-8 gap-y-4"}>
            <Suspense fallback={<RepositoriesLoading/>}>
                <RepositoriesView/>
            </Suspense>
        </div>
    )
}