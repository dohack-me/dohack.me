"use client"

import {zodResolver} from "@hookform/resolvers/zod"
import {useForm} from "react-hook-form"
import {z} from "zod"
import {createRepository} from "@/src/lib/database/repositories"
import {PlusIcon} from "lucide-react"
import React, {useState} from "react"
import {useRouter} from "next/navigation"
import {useToast} from "@/src/hooks/use-toast"
import CreateSheetButton from "@/src/components/sheet/CreateSheetButton"
import {CreateSheetFormFields} from "@/src/components/sheet/CreateSheetForm"
import {FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "@/src/components/ui/form"
import {Switch} from "@/src/components/ui/switch"
import {Button} from "@/src/components/ui/button"

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
    }).url(),
    visible: z.boolean(),
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
            visible: false,
        },
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
            <form onSubmit={form.handleSubmit(onSubmit)} className={"space-y-6"}>
                <CreateSheetFormFields form={form} inputs={[
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
                    },
                ]}/>
                <FormField
                    control={form.control}
                    name={"visible"}
                    render={({field}) => (
                        <FormItem>
                            <div className={"header-with-button"}>
                                <div className={"header-with-button-description"}>
                                    <FormLabel>Repository Visibility</FormLabel>
                                    <FormDescription>
                                        Whether to show this repository to normal users.
                                    </FormDescription>
                                </div>
                                <FormControl>
                                    <Switch checked={field.value} onCheckedChange={field.onChange}/>
                                </FormControl>
                            </div>
                            <FormMessage/>
                        </FormItem>
                    )}
                />
                <Button type="submit">Submit</Button>
            </form>
        </CreateSheetButton>
    )
}
