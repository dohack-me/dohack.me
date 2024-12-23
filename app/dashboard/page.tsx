import {redirect} from 'next/navigation'
import {Card, CardHeader, CardTitle, CardContent, CardDescription} from '@/components/ui/card'
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import {isLoggedIn} from "@/lib/auth";

export default async function DashboardPage() {
    let data
    if (!(data = await isLoggedIn())) {
        redirect('/login')
    }

    return (
        <div className={"flex flex-col py-4 px-8 gap-y-8"}>
            <div>
                <h1 className={"text-2xl"}>Welcome, {data.user.user_metadata["preferred_username"]}</h1>
            </div>
            <div>
                <Card>
                    <CardHeader>
                        <CardTitle>Progress</CardTitle>
                        <CardDescription>View your category statistics</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Tabs defaultValue={"crypto"} className={"flex flex-col gap-y-8"}>
                            <TabsList>
                                <TabsTrigger value={"crypto"}>Cryptography</TabsTrigger>
                                <TabsTrigger value={"forensics"}>Forensics</TabsTrigger>
                                <TabsTrigger value={"web"}>Web</TabsTrigger>
                                <TabsTrigger value={"rev"}>Reverse Engineering</TabsTrigger>
                                <TabsTrigger value={"pwn"}>Pwn</TabsTrigger>
                                <TabsTrigger value={"misc"}>Miscellaneous</TabsTrigger>
                            </TabsList>
                            <TabsContent value={"crypto"}>
                                <DashboardProgressBody tab={"crypto"}/>
                            </TabsContent>
                            <TabsContent value={"forensics"}>
                                <DashboardProgressBody tab={"forensics"}/>
                            </TabsContent>
                            <TabsContent value={"web"}>
                                <DashboardProgressBody tab={"web"}/>
                            </TabsContent>
                            <TabsContent value={"rev"}>
                                <DashboardProgressBody tab={"rev"}/>
                            </TabsContent>
                            <TabsContent value={"pwn"}>
                                <DashboardProgressBody tab={"pwn"}/>
                            </TabsContent>
                            <TabsContent value={"misc"}>
                                <DashboardProgressBody tab={"misc"}/>
                            </TabsContent>
                        </Tabs>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}

function DashboardProgressBody({tab}: {tab: string}) {
    return (
        <div className={"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-4"}>
            <Card>
                <CardHeader>
                    <CardTitle>Graph 1</CardTitle>
                    <CardDescription>Graph 1 Description</CardDescription>
                </CardHeader>
                <CardContent>
                    <p>{tab} graph here lol</p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle>Graph 2</CardTitle>
                    <CardDescription>Graph 2 Description</CardDescription>
                </CardHeader>
                <CardContent>
                    <p>{tab} graph here lol</p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle>Graph 3</CardTitle>
                    <CardDescription>Graph 3 Description</CardDescription>
                </CardHeader>
                <CardContent>
                    <p>{tab} graph here lol</p>
                </CardContent>
            </Card>
        </div>
    )
}