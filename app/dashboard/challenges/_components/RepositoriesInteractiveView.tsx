'use client'

import {Repository} from "@/lib/database/repository";
import {Input} from "@/components/ui/input";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import Link from "next/link";
import {Button} from "@/components/ui/button";
import {useState} from "react";

export default function RepositoriesInteractiveView({repositories}: {repositories: Repository[]}) {
    const [finalRepositories, setFinalRepositories] = useState(repositories);

    function onChange(input: string) {
        setFinalRepositories(repositories.filter((repository) => repository.name.startsWith(input)));
    }

    return (
        <>
            <Input placeholder={"Search repositories by name"} onChange={(e) => onChange(e.target.value)} />
            <div className={"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-y-8 gap-x-8"}>
                {finalRepositories.map((repository) => (
                    <Card key={repository.id}>
                        <CardHeader>
                            <CardTitle>
                                <Link href={repository.sourceLink}
                                      className={"underline"}>{repository.name}</Link>
                            </CardTitle>
                            <CardDescription>Created by: <Link href={repository.organizationLink}
                                                               className={"underline"}>{repository.organization}</Link></CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Button className={"w-full"} asChild>
                                <Link href={`/dashboard/challenges/${repository.id}`}>Open Repository</Link>
                            </Button>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </>
    )
}