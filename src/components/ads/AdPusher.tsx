"use client"

import React, {useEffect} from "react"
import {createRoot} from "react-dom/client"

export default function AdPusher() {
    useEffect(() => {
        try {
            if (Object.hasOwn(window, "adsbygoogle")) {
                // @ts-expect-error Google Adsense javascript code
                (adsbygoogle = window.adsbygoogle || []).push({});
            }
        } catch {
            console.error("Could not initialize adsense ad block");
        }

        setTimeout(function(){
            const adElement = document.querySelector("ins.adsbygoogle")
            if (!adElement) {
                return
            }
            if (adElement.clientHeight <= 0) {
                console.log("probably blocked")
                const parentNode = adElement.parentNode!
                parentNode.removeChild(adElement)

                createRoot(parentNode as Element).render(<FallbackAd/>)
            }
        }, 500);
    }, [])

    return null
}

export function FallbackAd() {
    return (
        <div className={"flex-grow flex flex-col justify-center items-center text-center"}>
            <p className={"font-bold"}>It looks like you are using an ad blocker.</p>
            <br/>
            <p>Ads help to fund server costs of hosting service instances. Ads helps dohack.me to remain free.</p>
            <br/>
            <p>Please consider turning off your ad blocker. Thank you!</p>
        </div>
    )
}