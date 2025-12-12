"use client"

import {useSearchParams} from "next/navigation";
import posthog from "posthog-js";

export default function PostHogIdentify({userId, email, name}: { userId: string, email: string, name: string }) {
    const searchParams = useSearchParams()
    const login = searchParams.get("login")

    if (!login) {
        return null
    }

    posthog.identify(userId, {
        email: email, name: name
    })

    return null
}