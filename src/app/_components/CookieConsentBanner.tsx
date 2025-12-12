"use client"
import {useEffect, useState} from "react";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/src/components/ui/card";
import {Button} from "@/src/components/ui/button";
import Link from "next/link";
import posthog from "posthog-js";

export default function CookieConsentBanner() {
    const [consentGiven, setConsentGiven] = useState("");

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setConsentGiven(posthog.get_explicit_consent_status());
    }, []);

    const handleAcceptCookies = () => {
        posthog.opt_in_capturing();
        setConsentGiven('granted');
    };

    const handleDeclineCookies = () => {
        posthog.opt_out_capturing();
        setConsentGiven('denied');
    };

    return (
        <div>
            {consentGiven === "pending" && (
                <Card className={"fixed bottom-0 sm:bottom-4 sm:right-4 w-full sm:max-w-lg"}>
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