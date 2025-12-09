"use client"

import {zodResolver} from "@hookform/resolvers/zod"
import {Controller, useForm} from "react-hook-form"
import {z} from "zod"
import {PlusIcon} from "lucide-react"
import React, {useState} from "react"
import {useRouter} from "next/navigation"
import {createService} from "@/src/lib/database/services"
import {Service, ServiceType} from "@/src/lib/prisma"
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/src/components/ui/select"
import {Button} from "@/src/components/ui/button"
import {
    Field,
    FieldContent,
    FieldDescription,
    FieldError,
    FieldGroup,
    FieldLabel,
    FieldSeparator
} from "@/src/components/ui/field";
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
        setOpen(false)
        toast.promise<Service>(createService({
            image: values.image,
            tag: values.tag,
            type: values.type as ServiceType,
            challengeId: challengeId,
        }), {
            loading: `Creating new ${values.type} service...`,
            success: `Successfully created ${values.type} service.`,
            error: "Something went wrong while creating a new service.",
        })
        router.refresh()
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button>
                    <PlusIcon/>
                    <p className={"hidden lg:block"}>Add Service</p>
                    <p className={"hidden sm:block lg:hidden"}>Add Service</p>
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Creating challenge hint</DialogTitle>
                    <DialogDescription>
                        Fill in the hint details as required
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={form.handleSubmit(onSubmit)} id={"create-service-form"}>
                    <FieldGroup className={"gap-y-2"}>
                        <FieldSeparator/>
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
                        <FieldSeparator/>
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
                        <FieldSeparator/>
                    </FieldGroup>
                </form>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant={"outline"}>Cancel</Button>
                    </DialogClose>
                    <Button type={"submit"} form={"create-service-form"}>Submit</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
