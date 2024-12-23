"use client"

import {zodResolver} from "@hookform/resolvers/zod"
import {useForm} from "react-hook-form"
import {z} from "zod"
import {Button} from "@/components/ui/button"
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage,} from "@/components/ui/form"
import {Input} from "@/components/ui/input"
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import Link from "next/link";
import {signup} from "@/app/auth-actions";

const formSchema = z.object({
    email: z.string().min(1).email(),
    username: z.string().min(6).max(30),
    password: z.string().min(6).max(50),
})

export default function SignupPage() {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema)
    })

    async function onSignup(values: z.infer<typeof formSchema>) {
        await signup(values.email, values.username, values.password)
    }

    return (
        <div className={"flex items-center justify-center w-full h-full"}>
            <Card className={"w-[30%]"}>
                <CardHeader>
                    <CardTitle>Sign Up</CardTitle>
                    <CardDescription>Enter your email and password</CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSignup)} className="space-y-8">
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
                                name="username"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel className={"w-full flex flex-row justify-between"}>Username</FormLabel>
                                        <FormControl>
                                            <Input {...field} />
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
                                        <FormLabel className={"w-full flex flex-row justify-between"}>Password</FormLabel>
                                        <FormControl>
                                            <Input type={"password"} {...field} />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />
                            <Button type="submit" className={"w-full"}>Sign Up</Button>
                        </form>
                    </Form>
                </CardContent>
                <CardFooter>
                    <p className="w-full text-center">Already have an account? Login{" "}
                        <Link href={"/login"} className={"underline"}>here</Link>
                    </p>
                </CardFooter>
            </Card>
        </div>
    )
}