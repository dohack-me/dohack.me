"use client"

import {Properties} from "posthog-js"
import {Button} from "@/src/components/ui/button"
import React from "react"
import {usePostHog} from "posthog-js/react";

export default function PostHogButton({eventName, properties, children}: {eventName: string, properties?: Properties | null, children: React.ReactNode}) {
    const posthog = usePostHog()

    return (
        <Button asChild onClick={() => {posthog.capture(eventName, properties)}}>
            {children}
        </Button>
    )
}