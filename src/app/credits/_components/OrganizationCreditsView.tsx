import {readRepositories} from "@/src/lib/database/repositories"
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/src/components/ui/card"
import Link from "next/link"
import {prisma} from "@/src/lib/globals"
import {Repository} from "@/src/lib/prisma"

export default async function OrganizationCreditsView() {
    const repositories = await readRepositories()

    const organizationsToLink = new Map<string, string>()
    const organizationsToChallengeCount = new Map<string, number>()
    const organizationsToRepositories = new Map<string, Repository[]>()

    for (const repository of repositories) {
        const repositoryArray = organizationsToRepositories.get(repository.organization) || []
        repositoryArray.push(repository)
        organizationsToRepositories.set(repository.organization, repositoryArray)
        organizationsToLink.set(repository.organization, repository.organizationLink)

        let challengeCount = await prisma.challenge.count({
            where: {
                repositoryId: repository.id,
            },
        })
        challengeCount += organizationsToChallengeCount.get(repository.organization) || 0
        organizationsToChallengeCount.set(repository.organization, challengeCount)
    }

    const organizationsArray = Array.from(organizationsToChallengeCount).sort((a, b) => b[1] - a[1])

    return (
        <div className={"grid-view"}>
            {organizationsArray.map(([organization, challengeCount]) => (
                <Card key={organization}>
                    <CardHeader>
                        <CardTitle><Link href={organizationsToLink.get(organization)!}
                                         className={"underline"}>{organization}</Link></CardTitle>
                        <div>
                            <CardDescription>{`Organization behind ${organizationsToRepositories.get(organization)!.length} repositories`}</CardDescription>
                            <CardDescription>{`Source of ${challengeCount} challenges`}</CardDescription>
                        </div>
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