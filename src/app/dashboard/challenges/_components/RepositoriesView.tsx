import {Card, CardDescription, CardHeader} from "@/src/components/ui/card"
import {readRepositories, Repository} from "@/src/lib/database/repositories"
import RepositoriesInteractiveView from "@/src/app/dashboard/challenges/_components/RepositoriesInteractiveView"
import {BookDashedIcon} from "lucide-react"
import {getUserRole} from "@/src/lib/auth/users"
import {UserRole} from "@prisma/client"

export default async function RepositoriesView() {
    const allRepositories = await readRepositories()
    let repositories: Repository[]
    if ((await getUserRole()) !== UserRole.ADMIN) {
        repositories = allRepositories.filter((repository) => repository.visible)
    } else {
        repositories = allRepositories.map((repository) => ((repository.visible ? repository : {
            id: repository.id,
            name: `${repository.name} | HIDDEN`,
            sourceLink: repository.sourceLink,
            organization: repository.organization,
            organizationLink: repository.organizationLink,
            visible: repository.visible,
            createdAt: repository.createdAt,
            updatedAt: repository.updatedAt,
        } as Repository)))
    }

    if (repositories.length <= 0) return (
        <Card className={"grow-col"}>
            <CardHeader className={"grow-col items-center justify-center"}>
                <BookDashedIcon/>
                <CardHeader className={"p-0"}>There&apos;s nothing here...</CardHeader>
                <CardDescription>Come back later!</CardDescription>
            </CardHeader>
        </Card>
    )

    return (
        <Card>
            <CardHeader className={"column"}>
                <RepositoriesInteractiveView repositories={repositories}/>
            </CardHeader>
        </Card>
    )
}