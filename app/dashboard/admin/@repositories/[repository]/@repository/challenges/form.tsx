'use client'

import {zodResolver} from "@hookform/resolvers/zod"
import {useFieldArray, useForm} from "react-hook-form"
import {z} from "zod"
import {Button} from "@/components/ui/button"
import {Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form"
import {Input} from "@/components/ui/input"
import {Repository} from "@/lib/database/repository";
import {Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger} from "@/components/ui/sheet";
import {PlusIcon, XIcon} from "lucide-react";
import {useState} from "react";
import {createChallenge} from "@/lib/database/challenge";
import {Textarea} from "@/components/ui/textarea";
import { cn } from "@/lib/utils"
import {Category} from "@prisma/client";
import {Select, SelectContent, SelectTrigger, SelectItem, SelectValue} from "@/components/ui/select";

const categories = Object.keys(Category)

const formSchema = z.object({
    name: z.string({
        required_error: "Challenge name is required",
    }),
    description: z.string({
        required_error: "A description is required",
    }),
    category: z.enum([categories[0], ...categories.slice(1)], {
        required_error: "Challenge category is required",
    }),
    answer: z.string({
        required_error: "Challenge answer is required",
    }),
    authors: z.array(
        z.object({
            value: z.string({
                required_error: "Challenge authors are required",
            })
        })
        // object is required here for workaround against weird typescript error, even shadcn demo does this
    )
})

export default function CreateChallengeForm({repository}: {repository: Repository}) {
    const [open, setOpen] = useState(false)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            authors: [{value: ""}]
        }
    })

    const { fields, append, remove } = useFieldArray({
        control: form.control,
        name: "authors"
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        await createChallenge({
            name: values.name,
            description: values.description,
            category: values.category as Category,
            answer: values.answer,
            authors: values.authors.map((field) => field.value),
            repository: repository,
            imageId: null // TODO: Add container image functionality
        })
        setOpen(false)
    }

    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
                <Button>
                    <PlusIcon/>
                    Create Challenge
                </Button>
            </SheetTrigger>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle>Creating Challenge</SheetTitle>
                    <SheetDescription>
                        Fill in the challenge details as required
                    </SheetDescription>
                </SheetHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className={"space-y-6"}>
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
                                                <FormLabel className={cn(index !== 0 && "sr-only")}>Challenge Authors</FormLabel>
                                                <FormDescription className={cn(index !== 0 && "sr-only")}>
                                                    The authors of this challenge.
                                                </FormDescription>
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
                            <Button onClick={() => append({value: ""})} type={"button"}>
                                <PlusIcon/>
                                Add Author
                            </Button>
                        </div>
                        <Button type="submit">Submit</Button>
                    </form>
                </Form>
            </SheetContent>
        </Sheet>

    )
}
