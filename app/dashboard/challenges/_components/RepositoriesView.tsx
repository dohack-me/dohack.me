import {CardContent} from "@/components/ui/card";
import {readRepositories} from "@/lib/database/repository";
import RepositoriesInteractiveView from "@/app/dashboard/challenges/_components/RepositoriesInteractiveView";

export default async function RepositoriesView() {
    const repositories = await readRepositories();

    return (
        <CardContent className={"flex flex-col gap-y-8"}>
            <RepositoriesInteractiveView repositories={repositories} />
        </CardContent>
    )
}