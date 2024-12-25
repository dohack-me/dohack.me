'use client'

import {zodResolver} from "@hookform/resolvers/zod"
import {useFieldArray, useForm} from "react-hook-form"
import {z} from "zod"
import {Button} from "@/components/ui/button"
import {Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form"
import {Input} from "@/components/ui/input"
import {useRouter} from "next/navigation";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {PlusIcon, SaveIcon, XIcon} from "lucide-react";
import React from "react";
import {Category} from "@prisma/client";
import {Challenge, updateChallenge} from "@/lib/database/challenge";
import {Textarea} from "@/components/ui/textarea";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {cn} from "@/lib/utils";
import {Repository} from "@/lib/database/repository";

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
            })
        }),
    ).min(1, {
        message: "Challenge authors are required",
    })
})

export default function EditChallengeForm({repository, challenge}: {repository: Repository, challenge: Challenge}) {
    const router = useRouter()

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        mode: "onChange",
        defaultValues: {
            name: challenge.name,
            description: challenge.description,
            category: challenge.category as Category,
            answer: challenge.answer,
            authors: challenge.authors.map((author) => ({value: author})),
        }
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        await updateChallenge(challenge.id, {
            name: values.name,
            description: values.description,
            category: values.category as Category,
            answer: values.answer,
            authors: values.authors.map((field) => field.value),
            repository: repository,
            imageId: null // TODO: Add container image functionality
        })
        router.refresh()
    }

    const { fields, append, remove } = useFieldArray({
        control: form.control,
        name: "authors"
    });

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className={"space-y-6"}>
                <Card>
                    <CardHeader className={"flex flex-row justify-between"}>
                        <div className={"flex flex-col gap-y-1.5"}>
                            <CardTitle>Challenge Details</CardTitle>
                            <CardDescription>Edit challenge details here</CardDescription>
                        </div>
                        <Button type={"submit"}>
                            <SaveIcon />
                            Save
                        </Button>
                    </CardHeader>
                    <CardContent className={"flex flex-col gap-y-4"}>
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Challenge Name</FormLabel>
                                    <FormControl>
                                        <Input{...field} />
                                    </FormControl>
                                    <FormDescription>
                                        The display name of this challenge.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Challenge Description</FormLabel>
                                    <FormControl>
                                        <Textarea {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        The challenge&apos;s description.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="category"
                            render={({ field }) => (
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
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="answer"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Challenge Answer</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        The answer to the challenge.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className={"flex flex-col gap-y-4"}>
                            <div>
                                {fields.map((field, index) => (
                                    <FormField
                                        control={form.control}
                                        key={field.id}
                                        name={`authors.${index}.value`}
                                        render={({ field }) => (
                                            <FormItem>
                                                <div className={`flex flex-row justify-between ${cn(index !== 0 && "sr-only")}`}>
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
                                                        <Button onClick={() => remove(index)} type={"button"} size={"icon"} disabled={fields.length <= 1}>
                                                            <XIcon/>
                                                        </Button>
                                                    </div>
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                ))}
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </form>
        </Form>

    )
}
