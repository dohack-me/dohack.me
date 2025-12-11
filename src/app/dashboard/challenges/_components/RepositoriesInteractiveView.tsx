"use client"

import {Input} from "@/src/components/ui/input"
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/src/components/ui/card"
import Link from "next/link"
import {useState} from "react"
import {Repository} from "@/src/lib/prisma"
import PostHogButton from "@/src/components/PostHogButton";

export default function RepositoriesInteractiveView({repositories}: { repositories: Repository[] }) {
    const [finalRepositories, setFinalRepositories] = useState(repositories)

    function onChange(input: string) {
        setFinalRepositories(repositories.filter((repository) => repository.name.toLowerCase().startsWith(input.toLowerCase())))
    }

    return (
        <>
            <Input placeholder={"Search repositories by name"} onChange={(e) => onChange(e.target.value)}/>
            <div className={"grid-view"}>
                {finalRepositories.map((repository) => (
                    <Card key={repository.id} className={"flex flex-col justify-between"}>
                        <CardHeader>
                            <CardTitle>
                                <Link href={repository.sourceLink} target={"_blank"}
                                      className={"underline"}>{repository.name}</Link>
                            </CardTitle>
                            <CardDescription>Created by: <Link href={repository.organizationLink} target={"_blank"}
                                                               className={"underline"}>{repository.organization}</Link></CardDescription>
                        </CardHeader>
                        <CardContent>
                            <PostHogButton className={"w-full"} eventName={"Visited repository"} properties={{
                                repository: repository,
                            }}>
                                <Link href={`/dashboard/challenges/${repository.id}`}>Open Repository</Link>
                            </PostHogButton>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </>
    )
}