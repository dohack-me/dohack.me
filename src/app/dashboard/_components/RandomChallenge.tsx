"use client"

import React, {useEffect, useState} from "react";
import {readRepository} from "@/src/lib/database/repositories";
import {Card, CardAction, CardDescription, CardHeader, CardTitle} from "@/src/components/ui/card";
import Link from "next/link";
import PostHogButton from "@/src/components/PostHogButton";
import {SwordIcon} from "lucide-react";
import {Challenge, Repository} from "@/src/lib/prisma";

export default function RandomChallenge({challenges}: { challenges: Challenge[] }) {
    const [challenge, setChallenge] = useState<Challenge>()
    const [repository, setRepository] = useState<Repository>()

    useEffect(() => {
        const setRandomChallenge = async () => {
            // randomChallenge is not inlined into setChallenge() because it doesn't update challenge state immediately,
            // which causes await readRepository(challenge.repositoryId) to error, since challenge was not set yet
            const randomChallenge = challenges[Math.floor(Math.random() * challenges.length)]
            setChallenge(randomChallenge)
            setRepository(await readRepository(randomChallenge.repositoryId))
        }
        setRandomChallenge()
            .catch(console.error)
    }, [challenges]);

    if (!challenge || !repository) return null;

    return (
        <Card>
            <CardHeader>
                <CardTitle>{challenge.name}</CardTitle>
                <CardDescription>
                    {`${challenge.category} challenge in `}
                    <Link href={`/dashboard/challenges/${repository.id}`}
                          className={"underline"}>{repository.name}</Link>
                    {" by "}
                    <Link href={repository.organizationLink}
                          className={"underline"}>{repository.organization}</Link>
                </CardDescription>
                <CardAction>
                    <PostHogButton eventName={"Random challenge attempted"} properties={{
                        challenge: challenge,
                    }}>
                        <Link href={`/dashboard/challenges/${challenge.repositoryId}/${challenge.id}`}>
                            <SwordIcon/>
                            <p className={"hidden lg:block"}>Attempt Challenge</p>
                            <p className={"hidden sm:block lg:hidden"}>Go</p>
                        </Link>
                    </PostHogButton>
                </CardAction>
            </CardHeader>
        </Card>
    )
}