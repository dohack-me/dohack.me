"use client"

import React from "react"

export default function AdUnit({format, client, slot, ...props}: {format: string, client: string, slot: string}) {

    return (
        <ins suppressHydrationWarning
             className={"adsbygoogle"}
             style={{"display": "block"}}
             data-ad-format={format}
             data-ad-client={client}
             data-ad-slot={slot}
             {...props}
        />
    )
}