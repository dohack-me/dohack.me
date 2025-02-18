"use client"

import posthog from 'posthog-js'
import {PostHogProvider as PHProvider} from 'posthog-js/react'
import React, {useEffect} from 'react'
import SuspendedPostHogPageView from "@/src/app/posthog/PostHogPageView";

export default function PostHogProvider({children}: {children: React.ReactNode}) {
    useEffect(() => {
        posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY!, {
            api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST!,
            person_profiles: 'identified_only', // or 'always' to create profiles for anonymous users as well
            capture_pageview: false // Disable automatic pageview capture, as we capture manually
        })
    }, [])

    return (
        <PHProvider client={posthog}>
            <SuspendedPostHogPageView />
            {children}
        </PHProvider>
    )
}