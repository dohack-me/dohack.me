"use client"
import {useEffect, useEffectEvent, useState} from "react";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/src/components/ui/card";
import {Button} from "@/src/components/ui/button";
import {usePostHog} from "posthog-js/react";
import {cookieConsentGiven} from "@/src/lib/posthog/cookies";
import Link from "next/link";

export default function CookieConsentBanner() {
    const [consentGiven, setConsentGiven] = useState("")
    const posthog = usePostHog()

    useEffectEvent(() => {
        setConsentGiven(cookieConsentGiven())
    })

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
                <Card className={"fixed bottom-0 sm:bottom-4 sm:right-4 w-full sm:max-w-128"}>
                    <CardHeader>
                        <CardTitle>Cookie Consent</CardTitle>
                        <div>
                            <CardDescription>dohack.me uses essential cookies to provide functionality to the website
                                and optional tracking cookies to understand how you use the website.</CardDescription>
                            <CardDescription>Read more in our <Link className={"underline"} href={"/privacy"}>privacy policy</Link>.
                                Please accept all cookies to help improve dohack.me. Thank you!</CardDescription>
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