"use client"

import {Button} from "@/src/components/ui/button"
import {ClockIcon} from "lucide-react"
import React, {useEffect, useState} from "react"
import DialogButton from "@/src/components/dialog/DialogButton"

export default function ChallengeInstanceExpiryButton({expiry, renewInstanceFunction}: {
    expiry: Date,
    renewInstanceFunction(): Promise<void>
}) {

    const [timeLeft, setTimeLeft] = useState<number>(0)
    const [expired, setExpired] = useState<boolean>(false)

    useEffect(() => {
        const updateTimer = () => {
            const currentTime = new Date()
            const expiryDate = new Date(expiry)
            const timeDifference = expiryDate.getTime() - currentTime.getTime()

            if (timeDifference <= 0) {
                setExpired(true)
                setTimeLeft(0)
            } else {
                setExpired(false)
                setTimeLeft(Math.floor(timeDifference / 1000))
            }
        }

        updateTimer()

        const intervalId = setInterval(updateTimer, 1000)

        return () => clearInterval(intervalId)
    }, [expiry])

    const formatTime = (seconds: number) => {
        const hours = Math.floor(seconds / 3600)
        const minutes = Math.floor((seconds % 3600) / 60)
        const remainingSeconds = seconds % 60

        if (hours > 0) {
            return `${hours}:${minutes.toString().padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`
        } else {
            return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`
        }
    }
    return (
        <DialogButton
            title={"Renew this instance?"}
            description={"This will reset the expiry time of the instance."}
            confirmVariant={"secondary"}
            confirm={"Renew"}
            startingTitle={"Requesting instance renewal..."}
            endingSuccess={"The instance has been renewed."}
            callback={renewInstanceFunction}
        >
            {(expired
                    ?
                    <Button>
                        <ClockIcon/>
                        Expired
                    </Button>
                    :
                    <Button>
                        <ClockIcon/>
                        {`${formatTime(timeLeft)}`}
                    </Button>
            )}
        </DialogButton>
    )
}