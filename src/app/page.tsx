import Link from "next/link";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/src/components/ui/card";
import {Button} from "@/src/components/ui/button";

export default function Home() {
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
      </div>
  );
}
