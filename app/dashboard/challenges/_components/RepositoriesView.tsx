import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {readRepositories} from "@/lib/database/repository";
import RepositoriesInteractiveView from "@/app/dashboard/challenges/_components/RepositoriesInteractiveView";

export default async function RepositoriesView() {
    const repositories = await readRepositories();

    return (
        <Card className={"flex-grow"}>
            <CardHeader>
                <CardTitle className={"text-center"}>Select a repository</CardTitle>
                <CardDescription className={"text-center"}>Repositories are publicly available at
                    ...</CardDescription>
            </CardHeader>
            <CardContent className={"flex flex-col gap-y-8"}>
                <RepositoriesInteractiveView repositories={repositories} />
            </CardContent>
        </Card>
    )
}