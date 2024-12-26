'use client'

import {zodResolver} from "@hookform/resolvers/zod"
import {useForm} from "react-hook-form"
import {z} from "zod"
import {Button} from "@/components/ui/button"
import {Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form"
import {Input} from "@/components/ui/input"
import {Repository, updateRepository} from "@/lib/database/repository";
import {useRouter} from "next/navigation";
import {CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {SaveIcon} from "lucide-react";
import React from "react";

const formSchema = z.object({
    name: z.string().min(1, {
        message: "Repository name is required",
    }),
    sourceLink: z.string().min(1, {
        message: "Repository source is required",
    }).url(),
    organization: z.string().min(1, {
        message: "Repository organization is required",
    }),
    organizationLink: z.string().min(1, {
        message: "Repository organization link is required",
    }).url()
})

export default function EditRepositoryForm({repository}: {repository: Repository}) {
    const router = useRouter()

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        mode: "onChange",
        defaultValues: {
            name: repository.name,
            sourceLink: repository.sourceLink,
            organization: repository.organization,
            organizationLink: repository.organizationLink,
        }
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        await updateRepository(repository.id, values)
        router.refresh()
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className={"space-y-6"}>
                <CardHeader className={"flex flex-row justify-between"}>
                    <div className={"flex flex-col gap-y-1.5"}>
                        <CardTitle>Organization Details</CardTitle>
                        <CardDescription>Edit repository details here</CardDescription>
                    </div>
                    <Button type={"submit"}>
                        <SaveIcon/>
                        <p className={"hidden sm:block"}>Save</p>
                    </Button>
                </CardHeader>
                <CardContent className={"flex flex-col gap-y-4"}>
                    <FormField
                        control={form.control}
                        name={"name"}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Repository Name</FormLabel>
                                <FormControl>
                                    <Input{...field} />
                                </FormControl>
                                <FormDescription>
                                    The display name of this repository.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name={"sourceLink"}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Repository Source</FormLabel>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                                <FormDescription>
                                    The link to your repository&apos;s source code.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name={"organization"}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Organization Name</FormLabel>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                                <FormDescription>
                                    The name of the organization this repository comes from.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name={"organizationLink"}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Organization Link</FormLabel>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                                <FormDescription>
                                    The link to your organization&apos;s socials.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </CardContent>
            </form>
        </Form>
    )
}
