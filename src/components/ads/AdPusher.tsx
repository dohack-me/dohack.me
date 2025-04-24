"use client"

import {useEffect} from "react"

export default function AdPusher() {
    useEffect(() => {
        try {
            if (window.hasOwnProperty('adsbygoogle')) {
                // @ts-expect-error testing
                (adsbygoogle = window.adsbygoogle || []).push({});
            }
        } catch {
            console.error('Could not initialize adsense ad block');
        }
    }, []);

    return null
}