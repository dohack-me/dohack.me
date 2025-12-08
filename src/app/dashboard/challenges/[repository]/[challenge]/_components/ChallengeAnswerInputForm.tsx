"use client"

import {z} from "zod"
import {useRouter} from "next/navigation"
import {Controller, useForm} from "react-hook-form"
import {zodResolver} from "@hookform/resolvers/zod"
import {Input} from "@/src/components/ui/input"
import {Button} from "@/src/components/ui/button"
import {hasSolvedChallenge, submitChallengeAnswer} from "@/src/lib/users"
import React, {useState} from "react"
import {TConductorInstance} from "react-canvas-confetti/src/types"
import Fireworks from "react-canvas-confetti/dist/presets/fireworks"
import {Field} from "@/src/components/ui/field";
import {toast} from "sonner";

const formSchema = z.object({
    answer: z.string().min(1, {
        error: "An answer is required",
    }),
})

export default function ChallengeAnswerInputForm({challengeId}: { challengeId: string }) {
    const router = useRouter()
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
            toast.error("Something went wrong while submitting your answer.", {
                description: "Please try again later."
            })
            return
        } else if (hasSolved) {
            toast.info("You have already solved this challenge.", {
                description: "Try another challenge instead."
            })
        } else {
            const result = await submitChallengeAnswer(challengeId, values.answer)
            if (result == null) {
                toast.error("Something went wrong while submitting your answer.", {
                    description: "Please try again later."
                })
            } else if (!result) {
                toast.error("Wrong answer!", {
                    description: "Try again.",
                })
            } else {
                if (conductor) conductor.shoot()
                toast.success("Success!", {
                    description: "You solved the challenge!"
                })
            }
        }

        router.refresh()
    }

    return (
        <form onSubmit={form.handleSubmit(onSubmit)} className={"w-full small-row"}>
            <Fireworks onInit={({conductor}) => setConductor(conductor)}/>
            <Controller
                name={"answer"}
                control={form.control}
                render={({field}) => (
                    <Field>
                        <Input
                            {...field}
                            id={field.name}
                            autoComplete={"off"}
                            placeholder={"Flag"}
                        />
                    </Field>
                )}
            />
            <Button type={"submit"}>Submit</Button>
        </form>
    )
}