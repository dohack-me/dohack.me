"use client"

import {zodResolver} from "@hookform/resolvers/zod"
import {useForm} from "react-hook-form"
import {z} from "zod"
import {Button} from "@/src/components/ui/button"
import {Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "@/src/components/ui/form"
import {Repository, updateRepository} from "@/src/lib/database/repositories"
import {useRouter} from "next/navigation"
import {CardContent, CardDescription, CardHeader, CardTitle} from "@/src/components/ui/card"
import {SaveIcon} from "lucide-react"
import React from "react"
import {useToast} from "@/src/hooks/use-toast"
import {CreateSheetFormFields} from "@/src/components/sheet/CreateSheetForm"
import {Switch} from "@/src/components/ui/switch"

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

export default function EditRepositoryForm({repository}: { repository: Repository }) {
    const router = useRouter()
    const {toast} = useToast()

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        mode: "onChange",
        defaultValues: {
            name: repository.name,
            sourceLink: repository.sourceLink,
            organization: repository.organization,
            organizationLink: repository.organizationLink,
            visible: repository.visible,
        },
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        toast({
            title: "Updating repository details...",
            description: "Please be patient!",
        })
        await updateRepository(repository.id, values)
        toast({
            title: "Updated repository details.",
        })
        router.refresh()
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <CardHeader className={"flex flex-row justify-between"}>
                    <div className={"flex flex-col gap-y-1.5"}>
                        <CardTitle>Organization Details</CardTitle>
                        <CardDescription>Edit repository details here</CardDescription>
                    </div>
                    <Button type={"submit"}>
                        <SaveIcon/>
                        <p className={"hidden sm:block"}>Save</p>
                    </Button>
                </CardHeader>
                <CardContent className={"small-column"}>
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
                </CardContent>
            </form>
        </Form>
    )
}
