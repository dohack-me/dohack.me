"use client"

import {z} from "zod";
import {useRouter} from "next/navigation";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form, FormControl, FormField, FormItem, FormMessage} from "@/src/components/ui/form";
import {Input} from "@/src/components/ui/input";
import {Button} from "@/src/components/ui/button";
import {hasSolvedChallenge, submitChallengeAnswer} from "@/src/lib/users";
import {useToast} from "@/src/hooks/use-toast";
import {useState} from "react";
import {TConductorInstance} from "react-canvas-confetti/src/types";
import Fireworks from "react-canvas-confetti/dist/presets/fireworks";

const formSchema = z.object({
    answer: z.string().min(1, {
        message: "An answer is required",
    }),
})

export default function ChallengeAnswerInputForm({challengeId}: { challengeId: string }) {
    const router = useRouter()
    const {toast} = useToast()
    const [conductor, setConductor] = useState<TConductorInstance>()

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        mode: "onChange",
        defaultValues: {
            answer: "",
        },
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
                if (conductor) conductor.shoot()
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
            <Fireworks onInit={({conductor}) => setConductor(conductor)}/>
            <form onSubmit={form.handleSubmit(onSubmit)} className={"w-full small-row"}>
                <FormField
                    control={form.control}
                    name={"answer"}
                    render={({field}) => (
                        <FormItem className={"grow"}>
                            <FormControl>
                                <Input placeholder={"Flag"} {...field} />
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                />
                <Button type={"submit"}>Submit</Button>
            </form>
        </Form>
    )
}