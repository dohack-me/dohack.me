import {FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "@/src/components/ui/form";
import {Input} from "@/src/components/ui/input";
import {Textarea} from "@/src/components/ui/textarea";
import {Button} from "@/src/components/ui/button";
import React from "react";
import {UseFormReturn} from "react-hook-form";
import {z, ZodSchema} from "zod";

export type FormInput = {
    name: string;
    title: string;
    description: string;
    type: "input" | "textarea";
}

export default function CreateSheetForm({form, inputs, onSubmit}: {form: UseFormReturn<z.infer<ZodSchema>>, inputs: FormInput[], onSubmit(value: object): void}) {
    return (
        <form onSubmit={form.handleSubmit(onSubmit)} className={"space-y-6"}>
            {inputs.map((input) => (
                <FormField
                    key={input.name}
                    control={form.control}
                    name={input.name}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>{input.title}</FormLabel>
                            <FormControl>
                                { input.type === "input" ? <Input {...field} /> : <Textarea {...field} />}
                            </FormControl>
                            <FormDescription>
                                {input.description}
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            ))}
            <Button type="submit">Submit</Button>
        </form>
    )
}

export function CreateSheetFormFields({form, inputs}: {form: UseFormReturn<z.infer<ZodSchema>>, inputs: FormInput[]}) {
    return (
        <>
            {inputs.map((input) => (
                <FormField
                    key={input.name}
                    control={form.control}
                    name={input.name}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>{input.title}</FormLabel>
                            <FormControl>
                                { input.type === "input" ? <Input {...field} /> : <Textarea {...field} />}
                            </FormControl>
                            <FormDescription>
                                {input.description}
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            ))}
        </>
    )
}