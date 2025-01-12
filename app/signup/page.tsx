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
import {useToast} from "@/hooks/use-toast";

const formSchema = z.object({
    email: z.string().min(1).email(),
    username: z.string().min(6).max(30),
    password: z.string().min(6).max(50),
})

export default function SignupPage() {
    const {toast} = useToast();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema)
    })

    async function onSignup(values: z.infer<typeof formSchema>) {
        toast({
            title: "Please wait...",
        })
        if ((await signup(values.email, values.username, values.password))) {
            toast({
                title: "Something went wrong with your registration.",
                description: "Please try again later."
            })
        } else {
            toast({
                title: "One more step!",
                description: "Check your email inbox to confirm your registration."
            })
        }
    }

    return (
        <div className={"flex-grow flex flex-col items-center justify-center bg-muted"}>
            <Card className={"flex flex-col items-center justify-center w-full rounded-none lg:rounded-xl lg:w-[40%] flex-grow lg:flex-grow-0"}>
                <CardHeader className={"w-full text-center"}>
                    <CardTitle>Sign Up</CardTitle>
                    <CardDescription>Enter your email and password</CardDescription>
                </CardHeader>
                <CardContent className={"w-full flex flex-col gap-y-6"}>
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
                                        <FormLabel
                                            className={"w-full flex flex-row justify-between"}>Username</FormLabel>
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
                                        <FormLabel
                                            className={"w-full flex flex-row justify-between"}>Password</FormLabel>
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