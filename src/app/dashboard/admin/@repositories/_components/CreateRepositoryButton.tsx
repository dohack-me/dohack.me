'use client'

import {zodResolver} from "@hookform/resolvers/zod"
import {useForm} from "react-hook-form"
import {z} from "zod"
import {createRepository} from "@/src/lib/database/repositories";
import {PlusIcon} from "lucide-react";
import React, {useState} from "react";
import {useRouter} from "next/navigation";
import {useToast} from "@/src/hooks/use-toast"
import CreateSheetButton from "@/src/components/sheet/CreateSheetButton";
import CreateSheetForm from "@/src/components/sheet/CreateSheetForm";

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
        <CreateSheetButton
            form={form}
            open={open}
            changeOpen={setOpen}
            icon={<PlusIcon/>}
            longName={"Create Repository"}
            shortName={"Create"}
            title={"Creating Repository"}
            description={"Fill in the repository details as required"}
        >
            <CreateSheetForm form={form} inputs={[
                {
                    name: "name",
                    title: "Repository Name",
                    description: "The display name of this repository.",
                    type: "input",
                },
                {
                    name: "sourceLink",
                    title: "Repository Source",
                    description: "The link to your repository's source code.",
                    type: "input",
                },
                {
                    name: "organization",
                    title: "Organization Name",
                    description: "The name of the organization this repository comes from.",
                    type: "input",
                },
                {
                    name: "organizationLink",
                    title: "Organization Link",
                    description: "The link to your organization's socials.",
                    type: "input",
                }
            ]} onSubmit={onSubmit}/>
        </CreateSheetButton>
    )
}
