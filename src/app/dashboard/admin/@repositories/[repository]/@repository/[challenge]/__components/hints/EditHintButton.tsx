"use client"

import CreateSheetForm from "@/src/components/sheet/CreateSheetForm";
import {z} from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Hint, updateHint} from "@/src/lib/database/hints";
import {useToast} from "@/src/hooks/use-toast";
import {useRouter} from "next/navigation";
import {useState} from "react";
import CreateSheetDropdown from "@/src/components/sheet/CreateSheetDropdown";

const formSchema = z.object({
    title: z.string().min(1, {
        message: "Hint title is required",
    }),
    hint: z.string().min(1, {
        message: "Hint message is required",
    }),
})

export default function EditHintButton({hint}: { hint: Hint }) {
    const {toast} = useToast()
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
        await updateHint(hint.id, {
            challenge: hint.challenge,
            title: values.title,
            hint: values.hint,
        })
        setOpen(false)
        router.refresh()
        toast({
            title: "Successfully updated hint.",
        })
    }

    return (
        <CreateSheetDropdown
            form={form}
            open={open}
            changeOpen={setOpen}
            itemName={"Edit"}
            title={"Editing challenge hint"}
            description={"Edit the hint details"}>
            <CreateSheetForm form={form} inputs={[
                {
                    name: "title",
                    title: "Hint Title",
                    description: "The title of the hint",
                    type: "input",
                },
                {
                    name: "hint",
                    title: "Hint message",
                    description: "The hint to give to players",
                    type: "textarea",
                },
            ]} onSubmit={onSubmit}/>
        </CreateSheetDropdown>
    )
}