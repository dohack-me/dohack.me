import {Card, CardHeader, CardTitle, CardDescription, CardContent} from "@/src/components/ui/card";
import {readChallengeWebsiteServices} from "@/src/lib/services/websites";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/src/components/ui/table"
import CreateWebsiteServiceButton
    from "@/src/app/dashboard/admin/@repositories/[repository]/@repository/[challenge]/__components/services/CreateWebsiteServiceButton";
import {readChallenge} from "@/src/lib/database/challenges";
import {notFound} from "next/navigation";
import CreateSocketServiceButton
    from "@/src/app/dashboard/admin/@repositories/[repository]/@repository/[challenge]/__components/services/CreateSocketServiceButton";
import {readChallengeSocketServices} from "@/src/lib/services/sockets";


export default async function ChallegeServicesView({challengeId}: {challengeId: string}) {
    const websites = await readChallengeWebsiteServices(challengeId);
    const sockets = await readChallengeSocketServices(challengeId);
    const challenge = await readChallenge(challengeId);
    if (!challenge) notFound();

    return (
        <Card>
            <CardHeader className={"header-with-button"}>
                <div className={"header-with-button-description"}>
                    <CardTitle>Challenge Services</CardTitle>
                    <CardDescription>Testing</CardDescription>
                </div>
                <div className={"flex flex-row gap-x-2"}>
                    <CreateWebsiteServiceButton challenge={challenge}/>
                    <CreateSocketServiceButton challenge={challenge}/>
                </div>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Name</TableHead>
                            <TableHead>Type</TableHead>
                            <TableHead>Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {websites.map(website => (
                            <TableRow key={website.id}>
                                <TableCell>{`${website.image}:${website.tag}`}</TableCell>
                                <TableCell>Website</TableCell>
                                <TableCell>Button</TableCell>
                            </TableRow>
                        ))}
                        {sockets.map(socket => (
                            <TableRow key={socket.id}>
                                <TableCell>{`${socket.image}:${socket.tag}`}</TableCell>
                                <TableCell>Socket</TableCell>
                                <TableCell>Button</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    )
}