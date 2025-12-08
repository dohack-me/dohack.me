"use client"

import {zodResolver} from "@hookform/resolvers/zod"
import {Controller, useFieldArray, useForm} from "react-hook-form"
import {z} from "zod"
import {Button} from "@/src/components/ui/button"
import {Input} from "@/src/components/ui/input"
import {PlusIcon, XIcon} from "lucide-react"
import React, {useState} from "react"
import {createChallenge} from "@/src/lib/database/challenges"
import {Category, Challenge} from "@/src/lib/prisma"
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/src/components/ui/select"
import {useRouter} from "next/navigation"
import {Switch} from "@/src/components/ui/switch"
import {
    Field,
    FieldContent,
    FieldDescription,
    FieldError,
    FieldGroup,
    FieldLabel,
    FieldLegend,
    FieldSeparator,
    FieldSet
} from "@/src/components/ui/field";
import {Textarea} from "@/src/components/ui/textarea";
import {InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput} from "@/src/components/ui/input-group";
import {toast} from "sonner";
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

export default function CreateChallengeButton({repositoryId}: { repositoryId: string }) {
    const router = useRouter()
    const [open, setOpen] = useState(false)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        mode: "onChange",
        defaultValues: {
            name: "",
            description: "",
            category: "",
            answer: "",
            authors: [{value: ""}],
            visible: false,
        },
    })

    const {fields, append, remove} = useFieldArray({
        control: form.control,
        name: "authors",
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        toast.promise<Challenge>(createChallenge({
            name: values.name,
            description: values.description,
            category: values.category as Category,
            answer: values.answer,
            authors: values.authors.map((field) => field.value),
            repositoryId: repositoryId,
            visible: values.visible,
        }), {
            loading: "Creating new challenge...",
            success: "Successfully created challenge.",
            error: "Something went wrong while creating a new challenge.",
        })
        setOpen(false)
        router.refresh()
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button>
                    <PlusIcon/>
                    <p className={"hidden lg:block"}>Create Challenge</p>
                    <p className={"hidden sm:block lg:hidden"}>Create</p>
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Creating Challenge</DialogTitle>
                    <DialogDescription>
                        Fill in the challenge details as required
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={form.handleSubmit(onSubmit)} id={"create-challenge-form"}>
                    <FieldGroup className={"gap-y-2"}>
                        <FieldSeparator/>
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
                        <FieldSeparator/>
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
                            name={"category"}
                            control={form.control}
                            render={({field, fieldState}) => (
                                <Field orientation={"responsive"} data-invalid={fieldState.invalid}>
                                    <FieldContent>
                                        <FieldLabel htmlFor={field.name}>Challenge Category</FieldLabel>
                                        <FieldDescription>The challenge&apos;s category.</FieldDescription>
                                        {fieldState.invalid && <FieldError errors={[fieldState.error]}/>}
                                    </FieldContent>
                                    <Select name={field.name} value={field.value} onValueChange={field.onChange}>
                                        <SelectTrigger aria-invalid={fieldState.invalid}>
                                            <SelectValue placeholder={"Select"}/>
                                        </SelectTrigger>
                                        <SelectContent position={"item-aligned"}>
                                            {categories.map((category) => (
                                                <SelectItem key={category} value={category}>
                                                    {category}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </Field>
                            )}
                        />
                        <Controller
                            name={"visible"}
                            control={form.control}
                            render={({field, fieldState}) => (
                                <Field orientation={"horizontal"} data-invalid={fieldState.invalid}>
                                    <FieldContent>
                                        <FieldLabel htmlFor={field.name}>Challenge Visibility</FieldLabel>
                                        <FieldDescription>Whether to show this challenge to normal
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
                        <FieldSet className={"gap-y-2"}>
                            <FieldLegend variant={"label"}>Challenge Authors</FieldLegend>
                            <FieldDescription>
                                The authors of this challenge.
                            </FieldDescription>
                            <FieldGroup className={"gap-y-2"}>
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
                            <FieldSeparator/>
                        </FieldSet>
                    </FieldGroup>
                </form>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant={"outline"}>Cancel</Button>
                    </DialogClose>
                    <Button type={"submit"} form={"create-challenge-form"}>Submit</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
