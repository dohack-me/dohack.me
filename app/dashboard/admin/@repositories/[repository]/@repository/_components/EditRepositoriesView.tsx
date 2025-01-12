import {readRepository} from "@/lib/database/repositories";
import {Card} from "@/components/ui/card";
import EditRepositoryForm
    from "@/app/dashboard/admin/@repositories/[repository]/@repository/_components/EditRepositoryForm";

export default async function EditRepositoriesView({repositoryId}: {repositoryId: string}) {
    const repository = await readRepository(repositoryId)

    return (
        <Card>
            <EditRepositoryForm repository={repository} />
        </Card>
    )
}