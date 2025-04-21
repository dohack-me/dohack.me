import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/src/components/ui/card"
import {Button} from "@/src/components/ui/button"
import Link from "next/link"
import {ChevronLeftIcon} from "lucide-react"
import React from "react"

export default async function PrivacyPolicy() {
    return (
        <div className={"min-h-screen small-column padding"}>
            <Card>
                <CardHeader className={"header-with-button"}>
                    <div className={"header-with-button-description"}>
                        <CardTitle>Privacy Policy</CardTitle>
                        <div>
                            <CardDescription>How your data is being collected and used</CardDescription>
                        </div>
                    </div>
                    <div className={"flex flex-row gap-x-2"}>
                        <Button asChild>
                            <Link href={"/"}>
                                <ChevronLeftIcon/>
                                Back to Home
                            </Link>
                        </Button>
                        <Button asChild>
                            <Link href={"/dashboard"}>
                                <ChevronLeftIcon/>
                                Back to Dashboard
                            </Link>
                        </Button>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className={"italic"}>
                        <h1 className={"text-3xl font-bold"}>TLDR:</h1>
                        <ul className={"list-disc list-inside"}>
                            <li>Your username and email from your authentication provider are stored when you sign up.</li>
                            <li>Certain actions you perform on the website will be anonymously logged.</li>
                            <li>Data collected will only be used to improve dohack.me services, and nothing else.</li>
                        </ul>
                    </div>
                    <br/>
                    <p>Work in Progress! Actual privacy policy terms will be added later...</p>
                </CardContent>
            </Card>
        </div>
    )
}
