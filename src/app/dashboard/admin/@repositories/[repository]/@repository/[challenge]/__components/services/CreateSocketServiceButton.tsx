'use client'

import {zodResolver} from "@hookform/resolvers/zod"
import {useForm} from "react-hook-form"
import {z} from "zod"
import {Button} from "@/src/components/ui/button"
import {Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "@/src/components/ui/form"
import {Input} from "@/src/components/ui/input"
import {Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger} from "@/src/components/ui/sheet";
import {PlusIcon} from "lucide-react";
import React, {useState} from "react";
import {useRouter} from "next/navigation";
import {useToast} from "@/src/hooks/use-toast"
import {Challenge} from "@/src/lib/database/challenges"
import {createSocketService} from "@/src/lib/database/services/sockets";

const formSchema = z.object({
    host: z.string().min(1, {
        message: "Socket host is required",
    }),
    port: z.coerce.number({
        required_error: "Port is required",
        invalid_type_error: "Port must be a number"
    }).int().positive().min(1, {
        message: "Port must be above 0"
    })
})

export default function CreateSocketServiceButton({challenge}: {challenge: Challenge}) {
    const {toast} = useToast()
    const router = useRouter()
    const [open, setOpen] = useState(false)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        mode: "onChange",
        defaultValues: {
            host: "",
            port: 80
        }
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        await createSocketService({
            host: values.host,
            port: values.port,
            challenge: challenge
        })
        setOpen(false)
        router.refresh()
        toast({
            title: "Successfully created socket service.",
        })
    }

    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
                <Button>
                    <PlusIcon/>
                    <p className={"hidden lg:block"}>Add Socket Service</p>
                    <p className={"hidden sm:block lg:hidden"}>Add Socket</p>
                </Button>
            </SheetTrigger>
            <SheetContent className={"small-column"}>
                <SheetHeader>
                    <SheetTitle>Creating Socket Service</SheetTitle>
                    <SheetDescription>
                        Fill in the socket service details as required
                    </SheetDescription>
                </SheetHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className={"space-y-6"}>
                        <FormField
                            control={form.control}
                            name={"host"}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Socket Host</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        The host of the socket service.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name={"port"}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Socket Port</FormLabel>
                                    <FormControl>
                                        <Input type={"number"} {...field}/>
                                    </FormControl>
                                    <FormDescription>
                                        The port of the socket service.
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
