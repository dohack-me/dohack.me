import {Card, CardContent, CardHeader} from "@/components/ui/card";
import {readChallenges} from "@/lib/database/challenge";
import {Category} from "@prisma/client";

export default async function RepositoryChallengeView({repositoryId}: {repositoryId: string}) {
    const challenges = (await readChallenges()).filter((challenge) => challenge.repository.id === repositoryId);
    const categories = Object.keys(Category)
    const categoryChallenges = categories.map((category) =>
            ({category: category, challenges: challenges.filter((challenge) => challenge.category === category)}))
        .filter(({challenges}) => challenges.length > 0)

    return (
        <Card>
            <CardHeader>test</CardHeader>
            <CardContent className={"flex flex-col gap-y-4"}>
                {categoryChallenges.map(({category, challenges}) => (
                    <Card key={category}>
                        <CardHeader>{category}</CardHeader>
                        <CardContent>
                            {
                                challenges.map((challenge) => (
                                    <Card key={challenge.id}>
                                        <CardHeader>test</CardHeader>
                                    </Card>
                                ))
                            }
                        </CardContent>
                    </Card>
                ))}
            </CardContent>
        </Card>
    )
}