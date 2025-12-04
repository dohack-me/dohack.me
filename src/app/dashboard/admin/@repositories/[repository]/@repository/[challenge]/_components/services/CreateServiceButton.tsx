"use client"

import {zodResolver} from "@hookform/resolvers/zod"
import {useForm} from "react-hook-form"
import {z} from "zod"
import {PlusIcon} from "lucide-react"
import React, {useState} from "react"
import {useRouter} from "next/navigation"
import {useToast} from "@/src/hooks/use-toast"
import CreateSheetButton from "@/src/components/sheet/CreateSheetButton"
import {CreateSheetFormFields} from "@/src/components/sheet/CreateSheetForm"
import {createService} from "@/src/lib/database/services"
import {ServiceType} from "@/src/lib/prisma"
import {FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "@/src/components/ui/form"
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/src/components/ui/select"
import {Button} from "@/src/components/ui/button"

const serviceTypes = Object.keys(ServiceType)

const formSchema = z.object({
    image: z.string().min(1, {
        error: "Image name is required",
    }),
    tag: z.string().min(1, {
        error: "Image tag is required",
    }),
    type: z.enum(serviceTypes, {
        error: "Service type is required",
    }),
})

export default function CreateServiceButton({challengeId}: { challengeId: string }) {
    const {toast} = useToast()
    const router = useRouter()
    const [open, setOpen] = useState(false)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        mode: "onChange",
        defaultValues: {
            image: "",
            tag: "latest",
            type: ServiceType.WEBSITE,
        },
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        await createService({
            image: values.image,
            tag: values.tag,
            type: values.type as ServiceType,
            challengeId: challengeId,
        })
        setOpen(false)
        router.refresh()
        toast({
            title: `Successfully created ${values.type} service.`,
        })
    }

    return (
        <CreateSheetButton
            form={form}
            open={open}
            changeOpen={setOpen}
            icon={<PlusIcon/>}
            longName={`Add Service`}
            shortName={`Add Service`}
            title={`Creating Service`}
            description={`Fill in the service details as required`}
        >
            <form onSubmit={form.handleSubmit(onSubmit)} className={"space-y-6"}>
                <CreateSheetFormFields form={form} inputs={[
                    {
                        name: "image",
                        title: "Docker Image Name",
                        description: `The name of the Docker image used to deploy the service`,
                        type: "input",
                    },
                    {
                        name: "tag",
                        title: "Docker Image Tag",
                        description: `The tag of the Docker image used to deploy the service`,
                        type: "input",
                    },
                ]}/>
                <FormField
                    control={form.control}
                    name="type"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Challenge Category</FormLabel>
                            <FormControl>
                                <Select {...field} onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue/>
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {serviceTypes.map((serviceType) => (
                                            <SelectItem key={serviceType} value={serviceType}>
                                                {serviceType}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </FormControl>
                            <FormDescription>
                                The service&apos;s type.
                            </FormDescription>
                            <FormMessage/>
                        </FormItem>
                    )}
                />
                <Button type="submit">Submit</Button>
            </form>
        </CreateSheetButton>
    )
}
