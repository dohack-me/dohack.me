import {Card, CardHeader, CardTitle, CardDescription, CardContent} from "@/components/ui/card";
import {readChallengeWebsiteServices} from "@/lib/database/services/websites";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table"
import CreateWebsiteServiceButton
    from "@/app/dashboard/admin/@repositories/[repository]/@repository/[challenge]/_components/services/CreateWebsiteServiceButton";
import {readChallenge} from "@/lib/database/challenges";
import {notFound} from "next/navigation";
import CreateSocketServiceButton
    from "@/app/dashboard/admin/@repositories/[repository]/@repository/[challenge]/_components/services/CreateSocketServiceButton";
import {readChallengeSocketServices} from "@/lib/database/services/sockets";


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
                                <TableCell>{website.url}</TableCell>
                                <TableCell>Website</TableCell>
                                <TableCell>Button</TableCell>
                            </TableRow>
                        ))}
                        {sockets.map(socket => (
                            <TableRow key={socket.id}>
                                <TableCell>{`${socket.host}:${socket.port}`}</TableCell>
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