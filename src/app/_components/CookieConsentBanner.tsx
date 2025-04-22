"use client"
import {useEffect, useState} from "react";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/src/components/ui/card";
import {Button} from "@/src/components/ui/button";
import {usePostHog} from "posthog-js/react";
import {cookieConsentGiven} from "@/src/lib/posthog/cookies";
import Link from "next/link";

export default function CookieConsentBanner() {
    const [consentGiven, setConsentGiven] = useState("")
    const posthog = usePostHog()

    useEffect(() => {
        setConsentGiven(cookieConsentGiven())
    }, [])

    useEffect(() => {
        if (consentGiven !== '') {
            posthog.set_config({persistence: consentGiven === 'yes' ? 'localStorage+cookie' : 'memory'});
        }
    }, [posthog, consentGiven]);

    const handleAcceptCookies = () => {
        localStorage.setItem("cookie_consent", "yes")
        setConsentGiven("yes")
    }

    const handleDeclineCookies = () => {
        localStorage.setItem("cookie_consent", "no")
        setConsentGiven("no")
    }

    return (
        <div>
            {consentGiven === "undecided" && (
                <Card className={"absolute bottom-4 right-4"}>
                    <CardHeader>
                        <CardTitle>Cookie Consent</CardTitle>
                        <div>
                            <CardDescription>dohack.me uses essential cookies to provide functionality to the website</CardDescription>
                            <CardDescription>and optional tracking cookies to understand how you use the website.</CardDescription>
                            <CardDescription>Read more in our <Link className={"underline"} href={"/privacy"}>privacy policy</Link>. Please accept all cookies to help us improve.</CardDescription>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className={"w-full grid grid-cols-2 gap-x-4"}>
                            <Button variant={"secondary"} onClick={handleDeclineCookies}>Accept Essential</Button>
                            <Button onClick={handleAcceptCookies}>Accept All</Button>
                        </div>
                    </CardContent>
                </Card>
            )}
        </div>
    )
}