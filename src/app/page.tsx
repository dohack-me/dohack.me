import Link from "next/link"
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/src/components/ui/card"
import {Button} from "@/src/components/ui/button"
import React from "react"

export default async function Home() {
    return (
        <div className={"grow padding column justify-center"}>
            <Card>
                <CardHeader className={"text-center"}>
                    <CardTitle>Welcome to dohack.me</CardTitle>
                    <CardDescription>A CTF Training Platform, done differently</CardDescription>
                </CardHeader>
                <CardContent className={"grid grid-cols-2 gap-x-4"}>
                    <Button asChild>
                        <Link href={"/login"}>Login</Link>
                    </Button>
                    <Button asChild>
                        <Link href={"/dashboard"}>Dashboard</Link>
                    </Button>
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle>What is this?</CardTitle>
                </CardHeader>
                <CardContent>
                    <p>dohack.me is a collection of CTF challenges from past events.</p>
                    <p>Challenge files, websites and servers are handled by the website.</p>
                    <p>Build, practice and refine your skills now in over 100+ challenges!</p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle>Whats so different?</CardTitle>
                </CardHeader>
                <CardContent>
                    <ul className={"list-disc list-inside"}>
                        <li>Free as in Freedom - There will never be any restrictions or paywalls for any challenge.
                        </li>
                        <li>No competitiveness - No global leaderboard or solves to encourage growing at your own
                            pace.
                        </li>
                        <li>Hints & Solutions (in the future) - Theres no shame in receiving some help!</li>
                    </ul>
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle>Credits</CardTitle>
                </CardHeader>
                <CardContent>
                    <ul className={"list-disc list-inside"}>
                        <li><Link href={"/credits"} className={"underline"}>All organizations</Link> that are behind
                            this website&apos;s challenges.
                        </li>
                        <li><Link href={"https://dunhack.me"} target={"_blank"}
                                  className={"underline"}>dunhack.me</Link> for inspiring this website and name.
                        </li>
                    </ul>
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle>dohack.me is in Alpha!</CardTitle>
                </CardHeader>
                <CardContent>
                    <p>Features, UI and challenges are subject to change.</p>
                    <p>Any problems or suggestions? Contact me on <Link
                        href={"https://discord.com/users/301279262994857987"} className={"underline"}
                        target={"_blank"}>Discord</Link>.</p>
                </CardContent>
            </Card>
        </div>
    )
}
