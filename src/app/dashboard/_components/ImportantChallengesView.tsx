import {Card, CardDescription, CardHeader, CardTitle} from "@/src/components/ui/card"
import Link from "next/link"
import React from "react"
import {Button} from "@/src/components/ui/button"
import {BookDashedIcon, SwordIcon, XIcon} from "lucide-react"
import DeleteDialogButton from "@/src/components/dialog/DeleteDialogButton"
import {readUserBookmarks} from "@/src/lib/database/bookmarks"
import {readChallenge} from "@/src/lib/database/challenges"
import {readUserServiceInstances} from "@/src/lib/orchestrator/serviceinstances"
import {shutdownServiceInstance} from "@/src/lib/orchestrator/services"
import {Challenge} from "@/src/lib/prisma"
import {readRepository} from "@/src/lib/database/repositories"

export default async function ImportantChallengesView() {
    const serviceInstances = (await readUserServiceInstances())!
    const bookmarkedChallenges = (await readUserBookmarks())!

    if (serviceInstances.length === 0 && bookmarkedChallenges.length === 0) {
        return (
            <div className={"grow small-column"}>
                <Card className={"grow-col"}>
                    <CardHeader className={"grow flex items-center justify-center"}>
                        <BookDashedIcon/>
                        <CardHeader className={"p-0"}>There&apos;s nothing here...</CardHeader>
                        <CardDescription>Bookmark a challenge to return to it later!</CardDescription>
                    </CardHeader>
                </Card>
            </div>
        )
    }

    return (
        <div className={"small-column"}>
            {serviceInstances.map((instance) => (
                <ServiceChallengeView key={instance.id} challengeId={instance.service.challengeId}
                                      deleteCallback={async () => {
                                          "use server"
                                          const {error} = await shutdownServiceInstance(instance.service.id)
                                          return error === null
                                      }}/>
            ))}
            {bookmarkedChallenges.map(async ({challengeId}) => {
                const challenge = (await readChallenge(challengeId))!
                return (
                    <ServiceChallengeWrapper key={challengeId} challenge={challenge}>
                        <Button asChild>
                            <Link href={`/dashboard/challenges/${challenge.repositoryId}/${challenge.id}`}>
                                <SwordIcon/>
                                <p>Return</p>
                            </Link>
                        </Button>
                    </ServiceChallengeWrapper>
                )
            })}
        </div>
    )
}

async function ServiceChallengeView({challengeId, deleteCallback}: {
    challengeId: string,
    deleteCallback(): Promise<boolean>
}) {
    const challenge = (await readChallenge(challengeId))!

    return (
        <ServiceChallengeWrapper challenge={challenge}>
            <div className={"small-row"}>
                <Button asChild>
                    <Link href={`/dashboard/challenges/${challenge.repositoryId}/${challengeId}`}>
                        <SwordIcon/>
                        <p>Return</p>
                    </Link>
                </Button>
                <DeleteDialogButton
                    description={`This action cannot be undone, and you will lose any progress on the instance.`}
                    confirmation={"Successfully deleted instance."}
                    fail={"Could not delete your instance. Please try again later."}
                    callback={deleteCallback}
                >
                    <Button>
                        <XIcon/>
                        <p>Delete</p>
                    </Button>
                </DeleteDialogButton>
            </div>
        </ServiceChallengeWrapper>
    )
}

async function ServiceChallengeWrapper({challenge, children}: { challenge: Challenge, children: React.ReactNode }) {
    const repository = await readRepository(challenge.repositoryId)

    return (
        <Card>
            <CardHeader className={"header-with-button"}>
                <div className={"header-with-button-description"}>
                    <CardTitle>{challenge.name}</CardTitle>
                    <CardDescription>
                        {`${challenge.category} challenge in `}
                        <Link href={`/dashboard/challenges/${challenge.repositoryId}`}
                              className={"underline"}>{repository.name}</Link>
                        {" by "}
                        <Link href={repository.organizationLink}
                              className={"underline"}>{repository.organization}</Link>
                    </CardDescription>
                </div>
                {children}
            </CardHeader>
        </Card>
    )
}