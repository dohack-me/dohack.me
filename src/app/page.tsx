import Link from "next/link";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/src/components/ui/card";
import {Button} from "@/src/components/ui/button";

export default async function Home() {
    return (
        <div className={"grow padding column justify-center"}>
            <Card>
                <CardHeader className={"text-center"}>
                    <CardTitle>Welcome to dohack.me</CardTitle>
                    <CardDescription>A CTF Training Platform, done differently</CardDescription>
                </CardHeader>
                <CardContent className={"grid grid-cols-2 gap-x-4"}>
                    <Button asChild>
                        <Link href={"/login"}>Login</Link>
                    </Button>
                    <Button asChild>
                        <Link href={"/dashboard"}>Dashboard</Link>
                    </Button>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className={"text-center"}>
                    <CardTitle className={"text-2xl"}>What is this?</CardTitle>
                    <p>This is a website where users can attempt challenges from past CTF events without having to worry about finding and hosting challenges themselves.</p>
                    <p>Collated CTFs can be found <Link href={"/credits"} className={"underline hover:text-accent"}>here</Link>, with more on its way.</p>
                </CardHeader>
            </Card>
        </div>
    );
}
