"use client"

import {Button} from "@/src/components/ui/button"
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/src/components/ui/card"
import {SiDiscord, SiGithub, SiGoogle} from "@icons-pack/react-simple-icons"
import Link from "next/link"
import {ChevronLeftIcon} from "lucide-react"
import React from "react"
import {authClient} from "@/src/lib/auth/client"

export default function LoginPage() {
    async function oauthLogin(type: "github" | "discord" | "google") {
        await authClient.signIn.social({
            provider: type,
            callbackURL: "/dashboard"
        })
    }
    return (
        <div className={"grow-col items-center justify-center bg-muted p-6 md:p-10"}>
            <Card className={"w-full max-w-xl flex flex-col items-center justify-center rounded-xl"}>
                <CardHeader className={"header-with-button flex-row w-full"}>
                    <div className={"header-with-button-description"}>
                        <CardTitle>Welcome back</CardTitle>
                        <CardDescription>Ready to get started?</CardDescription>
                    </div>
                    <Button asChild>
                        <Link href={`/`}>
                            <ChevronLeftIcon/>
                            <p>Back</p>
                        </Link>
                    </Button>
                </CardHeader>
                <CardContent className={"w-full flex flex-col gap-y-6"}>
                    <div className={"flex flex-col gap-y-4"}>
                        <Button className={"w-full"} onClick={() => oauthLogin("github")}>
                            <SiGithub/>
                            Login using Github
                        </Button>
                        <Button className={"w-full"} onClick={() => oauthLogin("discord")}>
                            <SiDiscord/>
                            Login using Discord
                        </Button>
                        <Button className={"w-full"} onClick={() => oauthLogin("google")}>
                            <SiGoogle/>
                            Login using Google
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}