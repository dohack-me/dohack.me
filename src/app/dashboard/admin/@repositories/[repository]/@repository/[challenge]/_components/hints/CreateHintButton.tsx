"use client"

import {zodResolver} from "@hookform/resolvers/zod"
import {Controller, useForm} from "react-hook-form"
import {z} from "zod"
import {PlusIcon} from "lucide-react"
import React, {useState} from "react"
import {useRouter} from "next/navigation"
import {useToast} from "@/src/hooks/use-toast"
import {createHint} from "@/src/lib/database/hints"
import {Challenge} from "@/src/lib/prisma"
import {Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger} from "@/src/components/ui/sheet";
import {Button} from "@/src/components/ui/button";
import {Field, FieldContent, FieldDescription, FieldError, FieldLabel} from "@/src/components/ui/field";
import {Input} from "@/src/components/ui/input";
import {Textarea} from "@/src/components/ui/textarea";

const formSchema = z.object({
    title: z.string().min(1, {
        error: "Hint title is required",
    }),
    hint: z.string().min(1, {
        error: "Hint message is required",
    }),
})

export default function CreateHintButton({challenge}: { challenge: Challenge }) {
    const {toast} = useToast()
    const router = useRouter()
    const [open, setOpen] = useState(false)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        mode: "onChange",
        defaultValues: {
            title: "",
            hint: "",
        },
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        await createHint({
            challenge: challenge,
            title: values.title,
            hint: values.hint,
        })
        setOpen(false)
        router.refresh()
        toast({
            title: "Successfully created hint.",
        })
    }

    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
                <Button>
                    <PlusIcon/>
                    <p className={"hidden lg:block"}>Add Hint</p>
                    <p className={"hidden sm:block lg:hidden"}>Add</p>
                </Button>
            </SheetTrigger>
            <SheetContent className={"small-column"}>
                <SheetHeader>
                    <SheetTitle>Creating challenge hint</SheetTitle>
                    <SheetDescription>
                        Fill in the hint details as required
                    </SheetDescription>
                </SheetHeader>
                <form onSubmit={form.handleSubmit(onSubmit)} className={"space-y-6"}>
                    <Controller
                        name={"title"}
                        control={form.control}
                        render={({field, fieldState}) => (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldContent>
                                    <FieldLabel htmlFor={field.name}>Hint Title</FieldLabel>
                                    <FieldDescription>The title of the hint</FieldDescription>
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
                        name={"title"}
                        control={form.control}
                        render={({field, fieldState}) => (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldContent>
                                    <FieldLabel htmlFor={field.name}>Hint message</FieldLabel>
                                    <FieldDescription>The hint to give to players</FieldDescription>
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
                    <Button type="submit">Submit</Button>
                </form>
            </SheetContent>
        </Sheet>
    )
}
