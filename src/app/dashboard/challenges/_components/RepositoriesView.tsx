import {Card, CardHeader} from "@/src/components/ui/card"
import {readRepositories} from "@/src/lib/database/repositories"
import RepositoriesInteractiveView from "@/src/app/dashboard/challenges/_components/RepositoriesInteractiveView"
import {BookDashedIcon} from "lucide-react"
import {getUserRole} from "@/src/lib/auth/users"
import {Repository} from "@/src/lib/prisma"
import {Empty, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle} from "@/src/components/ui/empty";

export default async function RepositoriesView() {
    const allRepositories = await readRepositories()
    let repositories: Repository[]
    if ((await getUserRole()) !== "admin") {
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
        <Empty className={"border border-solid"}>
            <EmptyHeader>
                <EmptyMedia variant="icon">
                    <BookDashedIcon/>
                </EmptyMedia>
                <EmptyTitle>There&apos;s nothing here...</EmptyTitle>
                <EmptyDescription>Come back later!</EmptyDescription>
            </EmptyHeader>
        </Empty>
    )

    return (
        <Card>
            <CardHeader>
                <div className={"small-column"}>
                    <RepositoriesInteractiveView repositories={repositories}/>
                </div>
            </CardHeader>
        </Card>
    )
}