import {Card, CardDescription, CardHeader} from "@/src/components/ui/card"
import {readRepositories} from "@/src/lib/database/repositories"
import RepositoriesInteractiveView from "@/src/app/dashboard/challenges/_components/RepositoriesInteractiveView"
import {BookDashedIcon} from "lucide-react"

export default async function RepositoriesView() {
    const allRepositories = await readRepositories()
    const repositories = allRepositories.filter((repository) => repository.visible)

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