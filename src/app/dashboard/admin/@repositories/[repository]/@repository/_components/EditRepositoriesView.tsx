import {readRepository} from "@/src/lib/database/repositories"
import EditRepositoryForm
    from "@/src/app/dashboard/admin/@repositories/[repository]/@repository/_components/EditRepositoryForm"

export default async function EditRepositoriesView({repositoryId}: { repositoryId: string }) {
    const repository = await readRepository(repositoryId)

    return (
        <EditRepositoryForm repository={repository}/>
    )
}