import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/src/components/ui/card"
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/src/components/ui/table"
import DeleteServiceButton from "@/src/app/dashboard/admin/@repositories/[repository]/@repository/[challenge]/_components/services/DeleteServiceButton"
import {DropdownMenu, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger} from "@/src/components/ui/dropdown-menu"
import {EllipsisVerticalIcon} from "lucide-react"
import React from "react"
import CreateServiceButton from "@/src/app/dashboard/admin/@repositories/[repository]/@repository/[challenge]/_components/services/CreateServiceButton"
import {deleteService, readChallengeServices} from "@/src/lib/database/services"

export default async function ChallegeServicesView({challengeId}: { challengeId: string }) {
    const services = await readChallengeServices(challengeId)

    return (
        <Card className={"grow-col"}>
            <CardHeader className={"header-with-button"}>
                <div className={"header-with-button-description"}>
                    <CardTitle>Challenge Services</CardTitle>
                    <CardDescription>Services are add itional programs users need to run to solve a
                        challenge</CardDescription>
                </div>
                <div className={"flex flex-row gap-x-2"}>
                    <CreateServiceButton challengeId={challengeId}/>
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
                        {services.map(service => (
                            <TableRow key={service.id}>
                                <TableCell>{`${service.image}:${service.tag}`}</TableCell>
                                <TableCell>{service.type}</TableCell>
                                <TableCell className={"flex items-center justify-end"}>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger>
                                            <EllipsisVerticalIcon/>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent>
                                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                            <DropdownMenuSeparator/>
                                            <DeleteServiceButton type={service.type} callback={async () => {
                                                "use server"
                                                await deleteService(service.id)
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