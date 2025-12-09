"use client"

import {zodResolver} from "@hookform/resolvers/zod"
import {Controller, useForm} from "react-hook-form"
import {z} from "zod"
import {createRepository} from "@/src/lib/database/repositories"
import {PlusIcon} from "lucide-react"
import React, {useState} from "react"
import {useRouter} from "next/navigation"
import {Switch} from "@/src/components/ui/switch"
import {Button} from "@/src/components/ui/button"
import {
    Field,
    FieldContent,
    FieldDescription,
    FieldError,
    FieldGroup,
    FieldLabel,
    FieldSeparator
} from "@/src/components/ui/field";
import {Input} from "@/src/components/ui/input";
import {toast} from "sonner";
import {Repository} from "@/src/lib/prisma";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/src/components/ui/dialog";

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

export default function CreateRepositoryButton() {
    const router = useRouter()
    const [open, setOpen] = useState(false)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        mode: "onChange",
        defaultValues: {
            name: "",
            sourceLink: "",
            organization: "",
            organizationLink: "",
            visible: false,
        },
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        toast.promise<Repository>(createRepository(values), {
            loading: "Creating new repository...",
            success: "Successfully created repository.",
            error: "Something went wrong while trying to create a new repository.",
        })
        setOpen(false)
        router.refresh()
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button>
                    <PlusIcon/>
                    <p className={"hidden lg:block"}>Create Repository</p>
                    <p className={"hidden sm:block lg:hidden"}>Create</p>
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Creating Repository</DialogTitle>
                    <DialogDescription>
                        Fill in the repository details as required
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={form.handleSubmit(onSubmit)} id={"create-repository-form"}>
                    <FieldGroup className={"gap-y-2"}>
                        <FieldSeparator/>
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
                            name={"organization"}
                            control={form.control}
                            render={({field, fieldState}) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor={field.name}>Organization Name</FieldLabel>
                                    <FieldDescription>The name of the organization this repository comes
                                        from.</FieldDescription>
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
                        <FieldSeparator/>
                        <Controller
                            name={"visible"}
                            control={form.control}
                            render={({field, fieldState}) => (
                                <Field orientation={"horizontal"} data-invalid={fieldState.invalid}>
                                    <FieldContent>
                                        <FieldLabel htmlFor={field.name}>Repository Visibility</FieldLabel>
                                        <FieldDescription>Whether to show this repository to normal
                                            users.</FieldDescription>
                                        {fieldState.invalid && <FieldError errors={[fieldState.error]}/>}
                                    </FieldContent>
                                    <Switch
                                        name={field.name}
                                        checked={field.value}
                                        onCheckedChange={field.onChange}
                                        aria-invalid={fieldState.invalid}
                                    />
                                </Field>
                            )}
                        />
                        <FieldSeparator/>
                        <Controller
                            name={"sourceLink"}
                            control={form.control}
                            render={({field, fieldState}) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldContent>
                                        <FieldLabel htmlFor={field.name}>Repository Source</FieldLabel>
                                        <FieldDescription>The link to your repository&apos;s source
                                            code.</FieldDescription>
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
                                        <FieldDescription>The link to your organization&apos;s
                                            socials.</FieldDescription>
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
                        <FieldSeparator/>
                    </FieldGroup>
                </form>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant={"outline"}>Cancel</Button>
                    </DialogClose>
                    <Button type={"submit"} form={"create-repository-form"}>Submit</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}