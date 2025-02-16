"use client"

import {zodResolver} from "@hookform/resolvers/zod"
import {useForm} from "react-hook-form"
import {z} from "zod"
import {PlusIcon} from "lucide-react";
import React, {useState} from "react";
import {useRouter} from "next/navigation";
import {useToast} from "@/src/hooks/use-toast"
import {Challenge} from "@/src/lib/database/challenges"
import {createSocketService} from "@/src/lib/database/sockets";
import CreateSheetButton from "@/src/components/sheet/CreateSheetButton";
import CreateSheetForm from "@/src/components/sheet/CreateSheetForm";
import {createWebsiteService} from "@/src/lib/database/websites";

const formSchema = z.object({
    image: z.string().min(1, {
        message: "Image name is required",
    }),
    tag: z.string().min(1, {
        message: "Image tag is required",
    }),
})

export default function CreateServiceButton({type, challenge}: {type: "website" | "socket", challenge: Challenge}) {
    const capitalized = type.charAt(0).toUpperCase() + type.slice(1).toLowerCase()

    const {toast} = useToast()
    const router = useRouter()
    const [open, setOpen] = useState(false)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        mode: "onChange",
        defaultValues: {
            image: "",
            tag: ""
        }
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        if (type === "website") {
            await createWebsiteService({
                image: values.image,
                tag: values.tag,
                challenge: challenge
            })
        } else {
            await createSocketService({
                image: values.image,
                tag: values.tag,
                challenge: challenge
            })
        }
        setOpen(false)
        router.refresh()
        toast({
            title: `Successfully created ${type} service.`,
        })
    }

    return (
        <CreateSheetButton
            form={form}
            open={open}
            changeOpen={setOpen}
            icon={<PlusIcon/>}
            longName={`Add ${capitalized} Service`}
            shortName={`Add ${capitalized}`}
            title={`Creating ${capitalized} Service`}
            description={`Fill in the ${type} service details as required`}
        >
            <CreateSheetForm form={form} inputs={[
                {
                    name: "image",
                    title: "Docker Image Name",
                    description: `The name of the Docker image used to deploy the ${type} service`,
                    type: "input",
                },
                {
                    name: "tag",
                    title: "Docker Image Tag",
                    description: `The tag of the Docker image used to deploy the ${type} service`,
                    type: "input",
                }
            ]} onSubmit={onSubmit}/>
        </CreateSheetButton>
    )
}
