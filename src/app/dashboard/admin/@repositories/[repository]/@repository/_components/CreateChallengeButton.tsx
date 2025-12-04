"use client"

import {zodResolver} from "@hookform/resolvers/zod"
import {Controller, useFieldArray, useForm} from "react-hook-form"
import {z} from "zod"
import {Button} from "@/src/components/ui/button"
import {Input} from "@/src/components/ui/input"
import {PlusIcon, XIcon} from "lucide-react"
import React, {useState} from "react"
import {createChallenge} from "@/src/lib/database/challenges"
import {Category} from "@prisma/client"
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/src/components/ui/select"
import {useRouter} from "next/navigation"
import {useToast} from "@/src/hooks/use-toast"
import {Switch} from "@/src/components/ui/switch"
import {Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger} from "@/src/components/ui/sheet";
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

export default function CreateChallengeButton({repositoryId}: { repositoryId: string }) {
    const {toast} = useToast()
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
        await createChallenge({
            name: values.name,
            description: values.description,
            category: values.category as Category,
            answer: values.answer,
            authors: values.authors.map((field) => field.value),
            repositoryId: repositoryId,
            visible: values.visible,
        })
        setOpen(false)
        router.refresh()
        toast({
            title: "Successfully created challenge.",
        })
    }

    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
                <Button>
                    <PlusIcon/>
                    <p className={"hidden lg:block"}>Create Challenge</p>
                    <p className={"hidden sm:block lg:hidden"}>Create</p>
                </Button>
            </SheetTrigger>
            <SheetContent className={"small-column"}>
                <SheetHeader>
                    <SheetTitle>Creating Challenge</SheetTitle>
                    <SheetDescription>
                        Fill in the challenge details as required
                    </SheetDescription>
                </SheetHeader>
                <form onSubmit={form.handleSubmit(onSubmit)} className={"space-y-6"}>
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
                    <Button type={"submit"}>Submit</Button>
                </form>
            </SheetContent>
        </Sheet>
    )
}
