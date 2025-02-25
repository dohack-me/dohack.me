import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/src/components/ui/card";
import {deleteWebsiteService, readChallengeWebsiteServices} from "@/src/lib/database/websites";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/src/components/ui/table"
import {readChallenge} from "@/src/lib/database/challenges";
import {notFound} from "next/navigation";
import {deleteSocketService, readChallengeSocketServices} from "@/src/lib/database/sockets";
import DeleteServiceButton from "@/src/app/dashboard/admin/@repositories/[repository]/@repository/[challenge]/__components/services/DeleteServiceButton";
import {DropdownMenu, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger} from "@/src/components/ui/dropdown-menu";
import {EllipsisVerticalIcon} from "lucide-react";
import React from "react";
import CreateServiceButton from "@/src/app/dashboard/admin/@repositories/[repository]/@repository/[challenge]/__components/services/CreateServiceButton";

export default async function ChallegeServicesView({challengeId}: { challengeId: string }) {
    const challenge = await readChallenge(challengeId)
    if (!challenge) notFound()

    const websites = await readChallengeWebsiteServices(challengeId)
    const sockets = await readChallengeSocketServices(challengeId)

    return (
        <Card className={"grow-col"}>
            <CardHeader className={"header-with-button"}>
                <div className={"header-with-button-description"}>
                    <CardTitle>Challenge Services</CardTitle>
                    <CardDescription>Services are additional programs users need to run to solve a
                        challenge</CardDescription>
                </div>
                <div className={"flex flex-row gap-x-2"}>
                    <CreateServiceButton type={"website"} challenge={challenge}/>
                    <CreateServiceButton type={"socket"} challenge={challenge}/>
                </div>
            </CardHeader>
            <CardContent className={"grow-col"}>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Name</TableHead>
                            <TableHead>Type</TableHead>
                            <TableHead className={"text-right"}>Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {websites.map(website => (
                            <TableRow key={website.id}>
                                <TableCell>{`${website.image}:${website.tag}`}</TableCell>
                                <TableCell>Website</TableCell>
                                <TableCell className={"flex items-center justify-end"}>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger>
                                            <EllipsisVerticalIcon/>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent>
                                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                            <DropdownMenuSeparator/>
                                            <DeleteServiceButton type={"website"} callback={async () => {
                                                "use server"
                                                await deleteWebsiteService(website.id)
                                                return true
                                            }}/>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </TableCell>
                            </TableRow>
                        ))}
                        {sockets.map(socket => (
                            <TableRow key={socket.id}>
                                <TableCell>{`${socket.image}:${socket.tag}`}</TableCell>
                                <TableCell>Socket</TableCell>
                                <TableCell className={"flex items-center justify-end"}>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger>
                                            <EllipsisVerticalIcon/>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent>
                                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                            <DropdownMenuSeparator/>
                                            <DeleteServiceButton type={"socket"} callback={async () => {
                                                "use server"
                                                await deleteSocketService(socket.id)
                                                return true
                                            }}/>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    )
}