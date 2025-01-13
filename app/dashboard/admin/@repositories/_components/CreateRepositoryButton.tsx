'use client'

import {zodResolver} from "@hookform/resolvers/zod"
import {useForm} from "react-hook-form"
import {z} from "zod"
import {Button} from "@/components/ui/button"
import {Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form"
import {Input} from "@/components/ui/input"
import {createRepository} from "@/lib/database/repositories";
import {Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger} from "@/components/ui/sheet";
import {PlusIcon} from "lucide-react";
import React, {useState} from "react";
import {useRouter} from "next/navigation";
import {useToast} from "@/hooks/use-toast"

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

export default function CreateRepositoryButton() {
    const {toast} = useToast()
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
        }
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        await createRepository(values)
        setOpen(false)
        router.refresh()
        toast({
            title: "Successfully created repository.",
        })
    }

    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
                <Button>
                    <PlusIcon/>
                    <p className={"hidden lg:block"}>Create Repository</p>
                    <p className={"hidden sm:block lg:hidden"}>Create</p>
                </Button>
            </SheetTrigger>
            <SheetContent className={"small-column"}>
                <SheetHeader>
                    <SheetTitle>Creating Repository</SheetTitle>
                    <SheetDescription>
                        Fill in the repository details as required
                    </SheetDescription>
                </SheetHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className={"space-y-6"}>
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
                        <Button type={"submit"}>Submit</Button>
                    </form>
                </Form>
            </SheetContent>
        </Sheet>
    )
}
