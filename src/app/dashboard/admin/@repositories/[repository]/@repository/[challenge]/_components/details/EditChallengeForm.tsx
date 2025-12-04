"use client"

import {zodResolver} from "@hookform/resolvers/zod"
import {useFieldArray, useForm} from "react-hook-form"
import {z} from "zod"
import {Button} from "@/src/components/ui/button"
import {Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "@/src/components/ui/form"
import {Input} from "@/src/components/ui/input"
import {useRouter} from "next/navigation"
import {CardContent, CardDescription, CardHeader, CardTitle} from "@/src/components/ui/card"
import {PlusIcon, SaveIcon, XIcon} from "lucide-react"
import React from "react"
import {Category, Challenge} from "@/src/lib/prisma"
import {updateChallenge} from "@/src/lib/database/challenges"
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/src/components/ui/select"
import {cn} from "@/src/lib/utils"
import {useToast} from "@/src/hooks/use-toast"
import {CreateSheetFormFields} from "@/src/components/sheet/CreateSheetForm"
import {Switch} from "@/src/components/ui/switch"

const categories = Object.keys(Category)

const formSchema = z.object({
    name: z.string().min(1, {
        message: "Challenge name is required",
    }),
    description: z.string().min(1, {
        message: "Challenge description is required",
    }),
    category: z.enum([categories[0], ...categories.slice(1)], {
        required_error: "Challenge category is required",
    }),
    answer: z.string().min(1, {
        message: "Challenge answer is required",
    }),
    // object is required here for workaround against weird typescript error, even shadcn demo does this
    authors: z.array(
        z.object({
            value: z.string().min(1, {
                message: "Challenge author cannot be blank",
            }),
        }),
    ).min(1, {
        message: "Challenge authors are required",
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
        <Form {...form}>
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
                    <CreateSheetFormFields form={form} inputs={[
                        {
                            name: "name",
                            title: "Challenge Name",
                            description: "The display name of this challenge.",
                            type: "input",
                        },
                        {
                            name: "description",
                            title: "Challenge Description",
                            description: "The challenge's description.",
                            type: "textarea",
                        },
                    ]}/>
                    <FormField
                        control={form.control}
                        name={"category"}
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Challenge Category</FormLabel>
                                <FormControl>
                                    <Select {...field} onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue/>
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {categories.map((category) => (
                                                <SelectItem key={category} value={category}>
                                                    {category}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </FormControl>
                                <FormDescription>
                                    The challenge&apos;s category.
                                </FormDescription>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name={"answer"}
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Challenge Answer</FormLabel>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                                <FormDescription>
                                    The answer to the challenge.
                                </FormDescription>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name={"visible"}
                        render={({field}) => (
                            <FormItem>
                                <div className={"header-with-button"}>
                                    <div className={"header-with-button-description"}>
                                        <FormLabel>Challenge Visibility</FormLabel>
                                        <FormDescription>
                                            Whether to show this challenge to normal users.
                                        </FormDescription>
                                    </div>
                                    <FormControl>
                                        <Switch checked={field.value} onCheckedChange={field.onChange}/>
                                    </FormControl>
                                </div>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />
                    <div className={"flex flex-col gap-y-4"}>
                        <div className={"flex flex-col gap-y-0.5"}>
                            {fields.map((field, index) => (
                                <FormField
                                    control={form.control}
                                    key={field.id}
                                    name={`authors.${index}.value`}
                                    render={({field}) => (
                                        <FormItem>
                                            <div
                                                className={`flex flex-row justify-between ${cn(index !== 0 && "sr-only")}`}>
                                                <div>
                                                    <FormLabel>Challenge Authors</FormLabel>
                                                    <FormDescription>
                                                        The authors of this challenge.
                                                    </FormDescription>
                                                </div>
                                                <Button onClick={() => append({value: ""})} type={"button"}>
                                                    <PlusIcon/>
                                                    Add Author
                                                </Button>
                                            </div>
                                            <FormControl>
                                                <div className={"flex flex-row gap-x-3"}>
                                                    <Input {...field}/>
                                                    <Button onClick={() => remove(index)} type={"button"} size={"icon"}
                                                            disabled={fields.length <= 1}>
                                                        <XIcon/>
                                                    </Button>
                                                </div>
                                            </FormControl>
                                            <FormMessage/>
                                        </FormItem>
                                    )}
                                />
                            ))}
                        </div>
                    </div>
                </CardContent>
            </form>
        </Form>
    )
}
