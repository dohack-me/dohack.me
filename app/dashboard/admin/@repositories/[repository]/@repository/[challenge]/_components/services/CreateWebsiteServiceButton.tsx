'use client'

import {zodResolver} from "@hookform/resolvers/zod"
import {useForm} from "react-hook-form"
import {z} from "zod"
import {Button} from "@/components/ui/button"
import {Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form"
import {Input} from "@/components/ui/input"
import {Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger} from "@/components/ui/sheet";
import {PlusIcon} from "lucide-react";
import React, {useState} from "react";
import {useRouter} from "next/navigation";
import {useToast} from "@/hooks/use-toast"
import {createWebsiteService} from "@/lib/database/services/websites";
import {Challenge} from "@/lib/database/challenges"

const formSchema = z.object({
    url: z.string().min(1, {
        message: "Website URL is required",
    }).url()
})

export default function CreateWebsiteServiceButton({challenge}: {challenge: Challenge}) {
    const {toast} = useToast()
    const router = useRouter()
    const [open, setOpen] = useState(false)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        mode: "onChange",
        defaultValues: {
            url: "",
        }
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        await createWebsiteService({
            url: values.url,
            challenge: challenge
        })
        setOpen(false)
        router.refresh()
        toast({
            title: "Successfully created website service.",
        })
    }

    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
                <Button>
                    <PlusIcon/>
                    <p className={"hidden lg:block"}>Add Website Service</p>
                    <p className={"hidden sm:block lg:hidden"}>Add Website</p>
                </Button>
            </SheetTrigger>
            <SheetContent className={"small-column"}>
                <SheetHeader>
                    <SheetTitle>Creating Website Service</SheetTitle>
                    <SheetDescription>
                        Fill in the website service details as required
                    </SheetDescription>
                </SheetHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className={"space-y-6"}>
                        <FormField
                            control={form.control}
                            name={"url"}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Website URL</FormLabel>
                                    <FormControl>
                                        <Input{...field} />
                                    </FormControl>
                                    <FormDescription>
                                        The URL to the website service.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit">Submit</Button>
                    </form>
                </Form>
            </SheetContent>
        </Sheet>

    )
}
