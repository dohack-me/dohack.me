"use client"

import posthog from "posthog-js"
import {PostHogProvider as PHProvider} from "posthog-js/react"
import React, {useEffect} from "react"
import SuspendedPostHogPageView from "@/src/app/posthog/PostHogPageView"
import {cookieConsentGiven} from "@/src/lib/posthog/cookies"

export default function PostHogProvider({children}: { children: React.ReactNode }) {
    useEffect(() => {
        posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY!, {
            api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST!,
            persistence: cookieConsentGiven() === "yes" ? "localStorage+cookie" : "memory",
            person_profiles: "always",
            capture_pageview: false,
            capture_pageleave: true,
        })
    }, [])

    return (
        <PHProvider client={posthog}>
            <SuspendedPostHogPageView/>
            {children}
        </PHProvider>
    )
}