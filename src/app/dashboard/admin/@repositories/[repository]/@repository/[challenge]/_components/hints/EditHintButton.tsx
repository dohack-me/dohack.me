"use client"

import {z} from "zod"
import {Controller, useForm} from "react-hook-form"
import {zodResolver} from "@hookform/resolvers/zod"
import {Hint, updateHint} from "@/src/lib/database/hints"
import {useRouter} from "next/navigation"
import React, {useState} from "react"
import {DropdownMenuItem} from "@/src/components/ui/dropdown-menu";
import {Field, FieldContent, FieldDescription, FieldError, FieldGroup, FieldLabel} from "@/src/components/ui/field";
import {Input} from "@/src/components/ui/input";
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
import {Textarea} from "@/src/components/ui/textarea";
import {Button} from "@/src/components/ui/button";

const formSchema = z.object({
    title: z.string().min(1, {
        error: "Hint title is required",
    }),
    hint: z.string().min(1, {
        error: "Hint message is required",
    }),
})

export default function EditHintButton({hint}: { hint: Hint }) {
    const router = useRouter()
    const [open, setOpen] = useState(false)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        mode: "onChange",
        defaultValues: {
            title: hint.title,
            hint: hint.hint,
        },
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        setOpen(false)
        toast.promise<Hint>(updateHint(hint.id, {
            challenge: hint.challenge,
            title: values.title,
            hint: values.hint,
        }), {
            loading: "Updating hint details...",
            success: "Updated hint details.",
            error: "Something went wrong while updating hint details.",
        })
        router.refresh()
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <DropdownMenuItem onSelect={(e) => e.preventDefault()}>Edit</DropdownMenuItem>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Editing challenge hint</DialogTitle>
                    <DialogDescription>
                        Edit the hint details
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={form.handleSubmit(onSubmit)} id={"edit-hint-form"}>
                    <FieldGroup className={"gap-y-2"}>
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
                            name={"hint"}
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
                    </FieldGroup>
                </form>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant={"outline"}>Cancel</Button>
                    </DialogClose>
                    <Button type={"submit"} form={"edit-hint-form"}>Submit</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}