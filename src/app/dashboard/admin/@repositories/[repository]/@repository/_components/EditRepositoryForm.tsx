"use client"

import {zodResolver} from "@hookform/resolvers/zod"
import {Controller, useForm} from "react-hook-form"
import {z} from "zod"
import {Button} from "@/src/components/ui/button"
import {updateRepository} from "@/src/lib/database/repositories"
import {useRouter} from "next/navigation"
import {CardContent, CardDescription, CardHeader, CardTitle} from "@/src/components/ui/card"
import {SaveIcon} from "lucide-react"
import React from "react"
import {useToast} from "@/src/hooks/use-toast"
import {Switch} from "@/src/components/ui/switch"
import {Repository} from "@/src/lib/prisma"
import {Field, FieldContent, FieldDescription, FieldError, FieldLabel} from "@/src/components/ui/field";
import {Input} from "@/src/components/ui/input";

const formSchema = z.object({
    name: z.string().min(1, {
        error: "Repository name is required",
    }),
    sourceLink: z.url({
        error: "Repository source is required",
    }),
    organization: z.string().min(1, {
        error: "Repository organization is required",
    }),
    organizationLink: z.url({
        error: "Repository organization link is required",
    }),
    visible: z.boolean(),
})

export default function EditRepositoryForm({repository}: { repository: Repository }) {
    const router = useRouter()
    const {toast} = useToast()

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        mode: "onChange",
        defaultValues: {
            name: repository.name,
            sourceLink: repository.sourceLink,
            organization: repository.organization,
            organizationLink: repository.organizationLink,
            visible: repository.visible,
        },
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        toast({
            title: "Updating repository details...",
            description: "Please be patient!",
        })
        await updateRepository(repository.id, values)
        toast({
            title: "Updated repository details.",
        })
        router.refresh()
    }

    return (
        <form onSubmit={form.handleSubmit(onSubmit)}>
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
            <CardContent className={"small-column"}>
                <Controller
                    name={"name"}
                    control={form.control}
                    render={({field, fieldState}) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldContent>
                                <FieldLabel htmlFor={field.name}>Repository Name</FieldLabel>
                                <FieldDescription>The display name of this repository.</FieldDescription>
                            </FieldContent>
                            <Input
                                {...field}
                                id={field.name}
                                aria-invalid={fieldState.invalid}
                                autoComplete={"off"}
                            />
                            {fieldState.invalid && <FieldError errors={[fieldState.error]}/>}
                        </Field>
                    )}
                />
                <Controller
                    name={"sourceLink"}
                    control={form.control}
                    render={({field, fieldState}) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldContent>
                                <FieldLabel htmlFor={field.name}>Repository Source</FieldLabel>
                                <FieldDescription>The link to your repository&apos;s source code.</FieldDescription>
                            </FieldContent>
                            <Input
                                {...field}
                                id={field.name}
                                aria-invalid={fieldState.invalid}
                                autoComplete={"off"}
                            />
                            {fieldState.invalid && <FieldError errors={[fieldState.error]}/>}
                        </Field>
                    )}
                />
                <Controller
                    name={"organization"}
                    control={form.control}
                    render={({field, fieldState}) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldContent>
                                <FieldLabel htmlFor={field.name}>Organization Name</FieldLabel>
                                <FieldDescription>The name of the organization this repository comes
                                    from.</FieldDescription>
                            </FieldContent>
                            <Input
                                {...field}
                                id={field.name}
                                aria-invalid={fieldState.invalid}
                                autoComplete={"off"}
                            />
                            {fieldState.invalid && <FieldError errors={[fieldState.error]}/>}
                        </Field>
                    )}
                />
                <Controller
                    name={"organizationLink"}
                    control={form.control}
                    render={({field, fieldState}) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldContent>
                                <FieldLabel htmlFor={field.name}>Organization Link</FieldLabel>
                                <FieldDescription>The link to your organization&apos;s socials.</FieldDescription>
                            </FieldContent>
                            <Input
                                {...field}
                                id={field.name}
                                aria-invalid={fieldState.invalid}
                                autoComplete={"off"}
                            />
                            {fieldState.invalid && <FieldError errors={[fieldState.error]}/>}
                        </Field>
                    )}
                />
                <Controller
                    name={"visible"}
                    control={form.control}
                    render={({field, fieldState}) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldContent>
                                <FieldLabel htmlFor={field.name}>Repository Visibility</FieldLabel>
                                <FieldDescription>Whether to show this repository to normal
                                    users.</FieldDescription>
                            </FieldContent>
                            <Switch
                                checked={field.value}
                                onCheckedChange={field.onChange}
                            />
                            {fieldState.invalid && <FieldError errors={[fieldState.error]}/>}
                        </Field>
                    )}
                />
            </CardContent>
        </form>
    )
}
