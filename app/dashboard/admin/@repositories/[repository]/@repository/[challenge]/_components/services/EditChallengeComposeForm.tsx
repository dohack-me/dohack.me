'use client'

import {z} from "zod";
import {useRouter} from "next/navigation";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form"
import {CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import {SaveIcon} from "lucide-react";
import React from "react";
import {Textarea} from "@/components/ui/textarea";
import {Repository} from "@/lib/database/repositories";
import {Challenge, updateChallenge} from "@/lib/database/challenges";
import {Category} from "@prisma/client";

const formSchema = z.object({
    composeFile: z.string()
})

export default function EditChallengeComposeForm({repository, challenge}: {repository: Repository, challenge: Challenge}) {
    const router = useRouter()

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        mode: "onChange",
        defaultValues: {
            composeFile: (challenge.composeFile ? challenge.composeFile : undefined),
        }
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        await updateChallenge(challenge.id, {
            name: challenge.name,
            description: challenge.description,
            category: challenge.category as Category,
            answer: challenge.answer,
            authors: challenge.authors,
            repository: repository,
            composeFile: values.composeFile,
        })
        router.refresh()
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <CardHeader className={"flex flex-row justify-between"}>
                    <div className={"flex flex-col gap-y-1.5"}>
                        <CardTitle>Challenge Compose File</CardTitle>
                        <CardDescription>Define the challenge&apos;s docker compose file.</CardDescription>
                    </div>
                    <Button type={"submit"}>
                        <SaveIcon />
                        Save
                    </Button>
                </CardHeader>
                <CardContent className={"flex flex-col gap-y-4"}>
                    <FormField
                        control={form.control}
                        name={"composeFile"}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Docker Compose File</FormLabel>
                                <FormControl>
                                    <Textarea {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </CardContent>
            </form>
        </Form>
    )
}