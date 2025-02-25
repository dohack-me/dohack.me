"use client"

import {zodResolver} from "@hookform/resolvers/zod"
import {useForm} from "react-hook-form"
import {z} from "zod"
import {PlusIcon} from "lucide-react"
import React, {useState} from "react"
import {useRouter} from "next/navigation"
import {useToast} from "@/src/hooks/use-toast"
import {Challenge} from "@/src/lib/database/challenges"
import CreateSheetButton from "@/src/components/sheet/CreateSheetButton"
import CreateSheetForm from "@/src/components/sheet/CreateSheetForm"
import {createHint} from "@/src/lib/database/hints"

const formSchema = z.object({
    title: z.string().min(1, {
        message: "Hint title is required",
    }),
    hint: z.string().min(1, {
        message: "Hint message is required",
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
        <CreateSheetButton
            form={form}
            open={open}
            changeOpen={setOpen}
            icon={<PlusIcon/>}
            longName={"Add Hint"}
            shortName={"Add"}
            title={"Creating challenge hint"}
            description={"Fill in the hint details as required"}
        >
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
        </CreateSheetButton>
    )
}
