import {readRepository} from "@/src/lib/database/repositories"
import {Card} from "@/src/components/ui/card"
import EditRepositoryForm from "@/src/app/dashboard/admin/@repositories/[repository]/@repository/_components/EditRepositoryForm"

export default async function EditRepositoriesView({repositoryId}: { repositoryId: string }) {
    const repository = await readRepository(repositoryId)

    return (
        <Card>
            <EditRepositoryForm repository={repository}/>
        </Card>
    )
}