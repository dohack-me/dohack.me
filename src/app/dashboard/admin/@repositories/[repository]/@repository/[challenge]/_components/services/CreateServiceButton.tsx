"use client"

import {zodResolver} from "@hookform/resolvers/zod"
import {Controller, useForm} from "react-hook-form"
import {z} from "zod"
import {PlusIcon} from "lucide-react"
import React, {useState} from "react"
import {useRouter} from "next/navigation"
import {useToast} from "@/src/hooks/use-toast"
import {createService} from "@/src/lib/database/services"
import {ServiceType} from "@prisma/client"
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/src/components/ui/select"
import {Button} from "@/src/components/ui/button"
import {Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger} from "@/src/components/ui/sheet";
import {Field, FieldContent, FieldDescription, FieldError, FieldLabel} from "@/src/components/ui/field";
import {Input} from "@/src/components/ui/input";

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
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
                <Button>
                    <PlusIcon/>
                    <p className={"hidden lg:block"}>Add Service</p>
                    <p className={"hidden sm:block lg:hidden"}>Add Service</p>
                </Button>
            </SheetTrigger>
            <SheetContent className={"small-column"}>
                <SheetHeader>
                    <SheetTitle>Creating Service</SheetTitle>
                    <SheetDescription>
                        Fill in the service details as required
                    </SheetDescription>
                </SheetHeader>
                <form onSubmit={form.handleSubmit(onSubmit)} className={"space-y-6"}>
                    <Controller
                        name={"image"}
                        control={form.control}
                        render={({field, fieldState}) => (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldContent>
                                    <FieldLabel htmlFor={field.name}>Docker Image Name</FieldLabel>
                                    <FieldDescription>The name of the Docker image used to deploy the
                                        service</FieldDescription>
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
                        name={"tag"}
                        control={form.control}
                        render={({field, fieldState}) => (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldContent>
                                    <FieldLabel htmlFor={field.name}>Docker Image Tag</FieldLabel>
                                    <FieldDescription>The tag of the Docker image used to deploy the
                                        service</FieldDescription>
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
                        name={"type"}
                        control={form.control}
                        render={({field, fieldState}) => (
                            <Field orientation={"responsive"} data-invalid={fieldState.invalid}>
                                <FieldContent>
                                    <FieldLabel htmlFor={field.name}>Challenge Category</FieldLabel>
                                    <FieldDescription>The service&apos;s type.</FieldDescription>
                                </FieldContent>
                                <Select name={field.name} value={field.value} onValueChange={field.onChange}>
                                    <SelectTrigger aria-invalid={fieldState.invalid}>
                                        <SelectValue placeholder="Select"/>
                                    </SelectTrigger>
                                    <SelectContent position="item-aligned">
                                        {serviceTypes.map((serviceType) => (
                                            <SelectItem key={serviceType} value={serviceType}>
                                                {serviceType}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
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
