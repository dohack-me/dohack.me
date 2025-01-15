import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/src/components/ui/card";
import {Button} from "@/src/components/ui/button";
import Link from "next/link";

export default function NotFound() {
    return (
        <div className={"flex-grow flex items-center justify-center"}>
            <Card>
                <CardHeader className={"text-center"}>
                    <CardTitle>404 Error</CardTitle>
                    <CardDescription>Something went wrong.</CardDescription>
                </CardHeader>
                <CardContent className={"flex flex-col gap-y-4"}>
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