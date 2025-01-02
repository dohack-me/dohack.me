import {Card, CardFooter, CardHeader} from "@/components/ui/card";
import {readChallenge} from "@/lib/database/challenge";
import {redirect} from "next/navigation";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";

export default async function ChallengeView({challengeId}: {challengeId: string}) {
    const challenge = await readChallenge(challengeId)

    if (!challenge) {
        redirect("/error")
    }

    return (
        <Card>
            <CardHeader>
                <div>
                    {challenge.description.split("\n").map((line) => (
                        <p key={line}>{line}</p>
                    ))}
                </div>
            </CardHeader>
            <CardFooter>
                <form className={"w-full flex flex-row gap-x-4"}>
                    <Input type={"text"} placeholder={"Flag"} />
                    <Button type={"submit"}>Submit</Button>
                </form>
            </CardFooter>
        </Card>
    )
}