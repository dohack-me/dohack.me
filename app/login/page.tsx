"use client"

import {zodResolver} from "@hookform/resolvers/zod"
import {useForm} from "react-hook-form"
import {z} from "zod"
import {Button} from "@/components/ui/button"
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage,} from "@/components/ui/form"
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {Input} from "@/components/ui/input"
import Link from "next/link";
import {SiDiscord, SiGithub} from "@icons-pack/react-simple-icons"
import {login, oauthLogin} from "@/app/auth-actions";

const formSchema = z.object({
    email: z.string().min(1).email(),
    password: z.string().min(6).max(50),
})

export default function LoginPage() {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: ""
        },
    })

    async function onLogin(values: z.infer<typeof formSchema>) {
        await login(values.email, values.password)
    }

    return (
        <div className={"flex-grow flex flex-col items-center justify-center"}>
            <Card className={"flex flex-col items-center justify-center w-full rounded-none lg:rounded-xl lg:w-[40%] flex-grow lg:flex-grow-0"}>
                <CardHeader className={"w-full"}>
                    <CardTitle className={"text-center"}>Welcome back</CardTitle>
                    <CardDescription className={"text-center"}>Ready to get started?</CardDescription>
                </CardHeader>
                <CardContent className={"w-full flex flex-col gap-y-6"}>
                    <div className={"flex flex-col gap-y-4"}>
                        <Button onClick={() => oauthLogin("github")} className={"w-full"}>
                            <SiGithub />
                            Login using Github
                        </Button>
                        <Button onClick={() => oauthLogin("discord")} className={"w-full"}>
                            <SiDiscord />
                            Login using Discord
                        </Button>
                    </div>
                    <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
                        <span className="relative z-10 bg-background px-2 text-muted-foreground">
                            Or continue with
                        </span>
                    </div>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onLogin)} className="space-y-8">
                            <FormField
                                control={form.control}
                                name="email"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel className={"w-full flex flex-row justify-between"}>Email</FormLabel>
                                        <FormControl>
                                            <Input placeholder={"username@example.com"} {...field} />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="password"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel className={"w-full flex flex-row justify-between"}>
                                            Password
                                            <Link href={"/resetpassword"} className={"underline"}>Forgot Your
                                                Password?</Link>
                                        </FormLabel>
                                        <FormControl>
                                            <Input type={"password"} {...field} />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />
                            <Button type="submit" className={"w-full"}>Login</Button>
                        </form>
                    </Form>
                </CardContent>
                <CardFooter className={"w-full"}>
                    <p className="w-full text-center">Don&apos;t have an account? Sign up{" "}
                        <Link href={"/signup"} className={"underline"}>here</Link>
                    </p>
                </CardFooter>
            </Card>
        </div>
    )
}