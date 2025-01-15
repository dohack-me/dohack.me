import {Card, CardHeader} from "@/src/components/ui/card";
import {readRepositories} from "@/src/lib/database/repositories";
import RepositoriesInteractiveView from "@/src/app/dashboard/challenges/_components/RepositoriesInteractiveView";

export default async function RepositoriesView() {
    const repositories = await readRepositories();

    return (
        <Card>
            <CardHeader className={"column"}>
                <RepositoriesInteractiveView repositories={repositories} />
            </CardHeader>
        </Card>
    )
}