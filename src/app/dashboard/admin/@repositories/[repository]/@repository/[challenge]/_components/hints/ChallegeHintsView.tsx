import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/src/components/ui/card"
import {readChallenge} from "@/src/lib/database/challenges"
import {notFound} from "next/navigation"
import React from "react"
import CreateHintButton from "@/src/app/dashboard/admin/@repositories/[repository]/@repository/[challenge]/_components/hints/CreateHintButton"
import DeleteHintButton from "@/src/app/dashboard/admin/@repositories/[repository]/@repository/[challenge]/_components/hints/DeleteHintButton"
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/src/components/ui/table"
import {DropdownMenu, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger} from "@/src/components/ui/dropdown-menu"
import {EllipsisVerticalIcon} from "lucide-react"
import {deleteHint, readChallengeHints} from "@/src/lib/database/hints"
import MarkdownContent from "@/src/components/MarkdownContent"
import EditHintButton from "@/src/app/dashboard/admin/@repositories/[repository]/@repository/[challenge]/_components/hints/EditHintButton"

export default async function ChallengeHintsView({challengeId}: { challengeId: string }) {
    const challenge = await readChallenge(challengeId)
    if (!challenge) notFound()

    const hints = await readChallengeHints(challengeId)

    return (
        <Card className={"grow-col"}>
            <CardHeader className={"header-with-button"}>
                <div className={"header-with-button-description"}>
                    <CardTitle>Challenge Hints</CardTitle>
                    <CardDescription>Hints are optional clues that help players solve a challenge</CardDescription>
                </div>
                <div className={"flex flex-row gap-x-2"}>
                    <CreateHintButton challenge={challenge}/>
                </div>
            </CardHeader>
            <CardContent className={"grow-col"}>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Title</TableHead>
                            <TableHead>Hint</TableHead>
                            <TableHead className={"text-right"}>Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {hints.map(hint => (
                            <TableRow key={hint.id}>
                                <TableCell>
                                    <p>{hint.title}</p>
                                </TableCell>
                                <TableCell>
                                    <MarkdownContent text={hint.hint}/>
                                </TableCell>
                                <TableCell>
                                    <div className={"flex items-center justify-end"}>
                                        <DropdownMenu>
                                            <DropdownMenuTrigger>
                                                <EllipsisVerticalIcon/>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent>
                                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                                <DropdownMenuSeparator/>
                                                <EditHintButton hint={hint}/>
                                                <DeleteHintButton callback={async () => {
                                                    "use server"
                                                    await deleteHint(hint.id)
                                                    return true
                                                }}/>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    )
}