"use client"

import {zodResolver} from "@hookform/resolvers/zod"
import {Controller, useFieldArray, useForm} from "react-hook-form"
import {z} from "zod"
import {Button} from "@/src/components/ui/button"
import {Input} from "@/src/components/ui/input"
import {useRouter} from "next/navigation"
import {CardContent, CardDescription, CardHeader, CardTitle} from "@/src/components/ui/card"
import {PlusIcon, SaveIcon, XIcon} from "lucide-react"
import React from "react"
import {Category, Challenge} from "@/src/lib/prisma"
import {updateChallenge} from "@/src/lib/database/challenges"
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/src/components/ui/select"
import {useToast} from "@/src/hooks/use-toast"
import {Switch} from "@/src/components/ui/switch"
import {
    Field,
    FieldContent,
    FieldDescription,
    FieldError,
    FieldGroup,
    FieldLabel,
    FieldLegend,
    FieldSet
} from "@/src/components/ui/field";
import {Textarea} from "@/src/components/ui/textarea";
import {InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput} from "@/src/components/ui/input-group";

const categories = Object.keys(Category)

const formSchema = z.object({
    name: z.string().min(1, {
        error: "Challenge name is required",
    }),
    description: z.string().min(1, {
        error: "Challenge description is required",
    }),
    category: z.enum(categories, {
        error: "Challenge category is required",
    }),
    answer: z.string().min(1, {
        error: "Challenge answer is required",
    }),
    authors: z.array(
        z.object({
            value: z.string().min(1, {
                error: "Challenge author cannot be blank",
            }),
        }),
    ).min(1, {
        error: "Challenge authors are required",
    }),
    visible: z.boolean(),
})

export default function EditChallengeForm({challenge}: { challenge: Challenge }) {
    const router = useRouter()
    const {toast} = useToast()

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        mode: "onChange",
        defaultValues: {
            name: challenge.name,
            description: challenge.description,
            category: challenge.category as Category,
            answer: challenge.answer,
            authors: challenge.authors.map((author) => ({value: author})),
            visible: challenge.visible,
        },
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        toast({
            title: "Updating challenge details...",
            description: "Please be patient!",
        })
        await updateChallenge(challenge.id, {
            name: values.name,
            description: values.description,
            category: values.category as Category,
            answer: values.answer,
            authors: values.authors.map((field) => field.value),
            repositoryId: challenge.repositoryId,
            visible: values.visible,
        })
        toast({
            title: "Updated challenge details.",
        })
        router.refresh()
    }

    const {fields, append, remove} = useFieldArray({
        control: form.control,
        name: "authors",
    })

    return (
        <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardHeader className={"flex flex-row justify-between"}>
                <div className={"flex flex-col gap-y-1.5"}>
                    <CardTitle>Challenge Details</CardTitle>
                    <CardDescription>Edit challenge details here</CardDescription>
                </div>
                <Button type={"submit"}>
                    <SaveIcon/>
                    Save
                </Button>
            </CardHeader>
            <CardContent className={"small-column"}>
                <Controller
                    name={"name"}
                    control={form.control}
                    render={({field, fieldState}) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldContent>
                                <FieldLabel htmlFor={field.name}>Challenge Name</FieldLabel>
                                <FieldDescription>The display name of this challenge.</FieldDescription>
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
                    name={"description"}
                    control={form.control}
                    render={({field, fieldState}) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldContent>
                                <FieldLabel htmlFor={field.name}>Challenge Description</FieldLabel>
                                <FieldDescription>The challenge&apos;s description.</FieldDescription>
                            </FieldContent>
                            <Textarea
                                {...field}
                                id={field.name}
                                aria-invalid={fieldState.invalid}
                            />
                            {fieldState.invalid && <FieldError errors={[fieldState.error]}/>}
                        </Field>
                    )}
                />
                <Controller
                    name={"category"}
                    control={form.control}
                    render={({field, fieldState}) => (
                        <Field orientation={"responsive"} data-invalid={fieldState.invalid}>
                            <FieldContent>
                                <FieldLabel htmlFor={field.name}>Challenge Category</FieldLabel>
                                <FieldDescription>The challenge&apos;s category.</FieldDescription>
                            </FieldContent>
                            <Select name={field.name} value={field.value} onValueChange={field.onChange}>
                                <SelectTrigger aria-invalid={fieldState.invalid}>
                                    <SelectValue placeholder="Select"/>
                                </SelectTrigger>
                                <SelectContent position="item-aligned">
                                    {categories.map((category) => (
                                        <SelectItem key={category} value={category}>
                                            {category}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            {fieldState.invalid && <FieldError errors={[fieldState.error]}/>}
                        </Field>
                    )}
                />
                <Controller
                    name={"answer"}
                    control={form.control}
                    render={({field, fieldState}) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldContent>
                                <FieldLabel htmlFor={field.name}>Challenge Answer</FieldLabel>
                                <FieldDescription>The answer to the challenge.</FieldDescription>
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
                                <FieldLabel htmlFor={field.name}>Challenge Visibility</FieldLabel>
                                <FieldDescription>Whether to show this challenge to normal users.</FieldDescription>
                            </FieldContent>
                            <Switch
                                checked={field.value}
                                onCheckedChange={field.onChange}
                            />
                            {fieldState.invalid && <FieldError errors={[fieldState.error]}/>}
                        </Field>
                    )}
                />
                <FieldSet className={"gap-4"}>
                    <FieldLegend variant={"label"}>Challenge Authors</FieldLegend>
                    <FieldDescription>
                        The authors of this challenge.
                    </FieldDescription>
                    <FieldGroup className={"gap-4"}>
                        {fields.map((field, index) => (
                            <Controller
                                key={field.id}
                                name={`authors.${index}.value`}
                                control={form.control}
                                render={({field: controllerField, fieldState}) => (
                                    <Field
                                        orientation={"horizontal"}
                                        data-invalid={fieldState.invalid}
                                    >
                                        <FieldContent>
                                            <InputGroup>
                                                <InputGroupInput
                                                    {...controllerField}
                                                    aria-invalid={fieldState.invalid}
                                                    placeholder={"John Doe"}
                                                    type={"text"}
                                                />
                                                {fields.length > 1 && (
                                                    <InputGroupAddon align={"inline-end"}>
                                                        <InputGroupButton
                                                            type={"button"}
                                                            variant={"ghost"}
                                                            size={"icon-xs"}
                                                            onClick={() => remove(index)}
                                                            aria-label={`Remove author ${index + 1}`}
                                                        >
                                                            <XIcon/>
                                                        </InputGroupButton>
                                                    </InputGroupAddon>
                                                )}
                                            </InputGroup>
                                            {fieldState.invalid && (
                                                <FieldError errors={[fieldState.error]}/>
                                            )}
                                        </FieldContent>
                                    </Field>
                                )}
                            />
                        ))}
                        <Button
                            type={"button"}
                            variant={"outline"}
                            size={"sm"}
                            onClick={() => append({value: ""})}
                            disabled={fields.length >= 5}
                        >
                            <PlusIcon/>
                            Add Author
                        </Button>
                    </FieldGroup>
                    {form.formState.errors.authors?.root && (
                        <FieldError errors={[form.formState.errors.authors.root]}/>
                    )}
                </FieldSet>
            </CardContent>
        </form>
    )
}
