"use client"

import {posthog, Properties} from "posthog-js"
import {Button} from "@/src/components/ui/button"
import React from "react"

export default function PostHogButton({eventName, properties, className, variant = "default", children}: {
    eventName: string,
    properties?: Properties | null,
    className?: string,
    variant?: "link" | "default" | "destructive" | "outline" | "secondary" | "ghost",
    children: React.ReactNode
}) {
    return (
        <Button className={className} variant={variant} asChild onClick={() => {
            posthog.capture(eventName, properties)
        }}>
            {children}
        </Button>
    )
}