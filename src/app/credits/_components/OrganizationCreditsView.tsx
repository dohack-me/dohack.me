import {readRepositories, Repository} from "@/src/lib/database/repositories"
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/src/components/ui/card";
import Link from "next/link";

export default async function OrganizationCreditsView() {
    const repositories = await readRepositories()

    const organizationsToLink = new Map<string, string>()
    const organizationsToRepositories = new Map<string, Repository[]>()

    repositories.forEach(repository => {
        const repositoryArray = organizationsToRepositories.get(repository.organization) || []
        repositoryArray.push(repository)
        organizationsToRepositories.set(repository.organization, repositoryArray)
        organizationsToLink.set(repository.organization, repository.organizationLink)
    })

    return (
        <div className="grid-view">
            {Array.from(organizationsToRepositories.keys()).map(organization => (
                <Card key={organization}>
                    <CardHeader>
                        <CardTitle><Link href={organizationsToLink.get(organization)!} className={"underline"}>{organization}</Link></CardTitle>
                        <CardDescription>{`Organization behind ${organizationsToRepositories.get(organization)!.length} repositories`}</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ul className={"list-disc list-inside"}>
                            {organizationsToRepositories.get(organization)!.map((repository) => (
                                <li key={repository.id}>{repository.name}</li>
                            ))}
                        </ul>
                    </CardContent>
                </Card>
            ))}
        </div>
    )
}