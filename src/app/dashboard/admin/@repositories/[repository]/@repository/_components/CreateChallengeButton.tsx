"use client"

import {zodResolver} from "@hookform/resolvers/zod"
import {useFieldArray, useForm} from "react-hook-form"
import {z} from "zod"
import {Button} from "@/src/components/ui/button"
import {FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "@/src/components/ui/form"
import {Input} from "@/src/components/ui/input"
import {Repository} from "@/src/lib/database/repositories";
import {PlusIcon, XIcon} from "lucide-react";
import React, {useState} from "react";
import {createChallenge} from "@/src/lib/database/challenges";
import {cn} from "@/src/lib/utils"
import {Category} from "@prisma/client";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/src/components/ui/select";
import {useRouter} from "next/navigation";
import {useToast} from "@/src/hooks/use-toast"
import CreateSheetButton from "@/src/components/sheet/CreateSheetButton";
import {CreateSheetFormFields} from "@/src/components/sheet/CreateSheetForm";
import {Switch} from "@/src/components/ui/switch";

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

export default function CreateChallengeButton({repository}: { repository: Repository }) {
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
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        await createChallenge({
            name: values.name,
            description: values.description,
            category: values.category as Category,
            answer: values.answer,
            authors: values.authors.map((field) => field.value),
            repository: repository,
            visible: values.visible,
        })
        setOpen(false)
        router.refresh()
        toast({
            title: "Successfully created challenge.",
        })
    }

    return (
        <CreateSheetButton
            form={form}
            open={open}
            changeOpen={setOpen}
            icon={<PlusIcon/>}
            longName={"Create Challenge"}
            shortName={"Create"}
            title={"Creating Challenge"}
            description={"Fill in the challenge details as required"}
        >
            <form onSubmit={form.handleSubmit(onSubmit)} className={"space-y-6"}>
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
                    name="category"
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
                    name="answer"
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
                                        <FormLabel className={cn(index !== 0 && "sr-only")}>Challenge
                                            Authors</FormLabel>
                                        <FormDescription className={cn(index !== 0 && "sr-only")}>
                                            The authors of this challenge.
                                        </FormDescription>
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
                    <Button onClick={() => append({value: ""})} type={"button"}>
                        <PlusIcon/>
                        Add Author
                    </Button>
                </div>
                <Button type="submit">Submit</Button>
            </form>
        </CreateSheetButton>
    )
}
