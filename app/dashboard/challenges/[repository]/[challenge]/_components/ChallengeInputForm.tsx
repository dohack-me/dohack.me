'use client'

import {z} from "zod";
import {useRouter} from "next/navigation";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form, FormControl, FormField, FormItem, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {hasSolvedChallenge, submitChallengeAnswer} from "@/lib/users";
import {useToast} from "@/hooks/use-toast";

const formSchema = z.object({
    answer: z.string().min(1, {
        message: "An answer is required",
    }),
})

export default function ChallengeInputForm({challengeId}: {challengeId: string}) {
    const router = useRouter()
    const {toast} = useToast()

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        mode: "onChange",
        defaultValues: {
            answer: "",
        }
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        const hasSolved = await hasSolvedChallenge(challengeId)
        if (hasSolved == null) {
            toast({
                title: "Something went wrong while submitting your answer.",
                description: "Please try again later.",
            })
            return
        } else if (hasSolved) {
            toast({
                title: "You have already solved this challenge.",
                description: "Try another challenge instead.",
            })
        } else {
            const result = await submitChallengeAnswer(challengeId, values.answer)
            if (result == null) {
                toast({
                    title: "Something went wrong while submitting your answer.",
                    description: "Please try again later.",
                })
            } else if (!result) {
                toast({
                    title: "Wrong answer!",
                    description: "Try again.",
                })
            } else {
                toast({
                    title: "Success!",
                    description: "You solved the challenge!",
                })
            }
        }


        router.refresh()
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className={"w-full flex flex-row gap-x-4"}>
                <FormField
                    control={form.control}
                    name={"answer"}
                    render={({ field }) => (
                        <FormItem className={"flex-grow"}>
                            <FormControl>
                                <Input placeholder={"Flag"} {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type={"submit"}>Submit</Button>
            </form>
        </Form>
    )
}