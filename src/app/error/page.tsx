import {Button} from "@/src/components/ui/button"
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/src/components/ui/card"
import Link from "next/link"

export default function ErrorPage() {
    return (
        <div className={"grow flex items-center justify-center"}>
            <Card className={"w-full max-w-xl"}>
                <CardHeader className={"text-center"}>
                    <CardTitle>Sorry, something went wrong.</CardTitle>
                    <CardDescription>Please try again later.</CardDescription>
                </CardHeader>
                <CardContent className={"small-column"}>
                    <Button asChild className={"w-full"}>
                        <Link href={"/"}>Home Page</Link>
                    </Button>
                    <Button asChild className={"w-full"}>
                        <Link href={"/dashboard"}>Dashboard</Link>
                    </Button>
                </CardContent>
            </Card>
        </div>
    )
}