"use client"

import posthog, {Properties} from "posthog-js"
import {Button} from "@/src/components/ui/button"
import React from "react"

export default function PostHogButton({eventName, properties, children}: {eventName: string, properties?: Properties | null, children: React.ReactNode}) {
    return (
        <Button asChild onClick={() => {posthog.capture(eventName, properties)}}>
            {children}
        </Button>
    )
}