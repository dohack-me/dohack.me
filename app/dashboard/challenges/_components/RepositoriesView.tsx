import {Card, CardHeader} from "@/components/ui/card";
import {readRepositories} from "@/lib/database/repositories";
import RepositoriesInteractiveView from "@/app/dashboard/challenges/_components/RepositoriesInteractiveView";

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