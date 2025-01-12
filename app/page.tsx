import Link from "next/link";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {Button} from "@/components/ui/button";

export default function Home() {
  return (
      <div className={"flex-grow padding column"}>
          <Card>
              <CardHeader className={"text-center"}>
                  <CardTitle>Welcome to dohack.me</CardTitle>
                  <CardDescription>A CTF Training Platform, done differently</CardDescription>
              </CardHeader>
          </Card>
          <div className={"grid grid-cols-1 lg:grid-cols-3 gap-x-4 gap-y-4 *:aspect-square"}>
              <Card>
                  <CardHeader className={"text-center"}>
                      <CardTitle>Hone your skills</CardTitle>
                      <CardDescription>Solve challenges from past CTF competitions</CardDescription>
                  </CardHeader>
              </Card>
              <Card>
                  <CardHeader className={"text-center"}>
                      <CardTitle>Learn and Understand</CardTitle>
                      <CardDescription>Comprehensive solutions and hints ensure you gain knowledge from every challenge</CardDescription>
                  </CardHeader>
              </Card>
              <Card>
                  <CardHeader className={"text-center"}>
                      <CardTitle>View Your Progress</CardTitle>
                      <CardDescription>Feel rewarded for hard work in a no-pressure environment</CardDescription>
                  </CardHeader>
              </Card>
          </div>
          <Card>
              <CardHeader className={"text-center"}>
                  <CardTitle>Ready to begin?</CardTitle>
                  <CardDescription>Start your journey now</CardDescription>
              </CardHeader>
              <CardContent className={"grid grid-cols-3 gap-x-4"}>
                  <Button asChild>
                      <Link href={"/signup"}>Sign Up</Link>
                  </Button>
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
