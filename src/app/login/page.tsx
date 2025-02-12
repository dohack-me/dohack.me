import {Button} from "@/src/components/ui/button"
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/src/components/ui/card";
import {SiDiscord, SiGithub} from "@icons-pack/react-simple-icons"
import {signIn} from "@/src/lib/auth/auth"

export default async function LoginPage() {
    return (
        <div className={"flex-grow flex flex-col items-center justify-center bg-muted"}>
            <Card className={"flex flex-col items-center justify-center w-full rounded-none lg:rounded-xl lg:w-[40%] flex-grow lg:flex-grow-0"}>
                <CardHeader className={"w-full text-center"}>
                    <CardTitle>Welcome back</CardTitle>
                    <CardDescription>Ready to get started?</CardDescription>
                </CardHeader>
                <CardContent className={"w-full flex flex-col gap-y-6"}>
                    <div className={"flex flex-col gap-y-4"}>
                        <form action={async() => {
                            "use server"
                            await signIn("github", { redirectTo: "/" })
                        }}>
                            <Button type={"submit"} className={"w-full"}>
                                <SiGithub />
                                Login using Github
                            </Button>
                        </form>
                        <form action={async () => {
                            "use server"
                            await signIn("discord", { redirectTo: "/" })
                        }}>
                            <Button type={"submit"} className={"w-full"}>
                                <SiDiscord />
                                Login using Discord
                            </Button>
                        </form>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}