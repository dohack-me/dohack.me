import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {Input} from "@/components/ui/input";
import Link from "next/link";
import {Button} from "@/components/ui/button";

interface Repository {
    name: string;
    source: string;
    slug: string;
}

const tempRepositories = [
    {
        name: "Hack@AC 2024",
        source: "https://github.com/certificateofparticipation/ctf-archive/tree/main/2024/Hack@AC",
        slug: "hackac-2024",
    },
    {
        name: "BlahajCTF 2024",
        source: "https://github.com/certificateofparticipation/ctf-archive/tree/main/2024/BlahajCTF",
        slug: "blahajctf-2024",
    },
    {
        name: "YCEP-NP 2024",
        source: "https://github.com/certificateofparticipation/ctf-archive/tree/main/2024/YCEP-NP",
        slug: "ycepnp-2024",
    },
    {
        name: "Hack@AC Training 2024",
        source: "https://github.com/certificateofparticipation/ctf-archive/tree/main/2024/Hack@AC-Training",
        slug: "placeholder",
    },
    {
        name: "Hack@AC 2024",
        source: "https://github.com/certificateofparticipation/ctf-archive/tree/main/2024/Hack@AC",
        slug: "hackac-2024",
    },
    {
        name: "BlahajCTF 2024",
        source: "https://github.com/certificateofparticipation/ctf-archive/tree/main/2024/BlahajCTF",
        slug: "blahajctf-2024",
    },
    {
        name: "YCEP-NP 2024",
        source: "https://github.com/certificateofparticipation/ctf-archive/tree/main/2024/YCEP-NP",
        slug: "ycepnp-2024",
    },
    {
        name: "Hack@AC Training 2024",
        source: "https://github.com/certificateofparticipation/ctf-archive/tree/main/2024/Hack@AC-Training",
        slug: "placeholder",
    }
]

export default async function ChallengesPage() {
    return (
        <div className={"flex flex-col py-4 px-8 gap-y-4"}>
            <Card>
                <CardHeader>
                    <CardTitle className={"text-center"}>Select a repository</CardTitle>
                    <CardDescription className={"text-center"}>Repositories are publicly available at ...</CardDescription>
                </CardHeader>
                <CardContent className={"flex flex-col gap-y-8"}>
                    <Input placeholder={"Search repositories by name"}/>
                    <div className={"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-y-8 gap-x-8"}>
                        {tempRepositories.map((repository) => (
                            <RepositoryCard key={repository.name} repository={repository}/>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

function RepositoryCard({repository}: {repository: Repository}) {
    return (
        <Card>
            <CardHeader>
                <CardTitle><Link href={repository.source} className={"underline"}>{repository.name}</Link></CardTitle>
            </CardHeader>
            <CardContent>
                <Button className={"w-full"} asChild>
                    <Link href={`/dashboard/challenges/${repository.slug}`}>Open Repository</Link>
                </Button>
            </CardContent>
        </Card>
    )
}