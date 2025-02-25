"use client"

import React from "react"
import {Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger} from "@/src/components/ui/sheet"
import {Button} from "@/src/components/ui/button"
import {Form} from "@/src/components/ui/form"
import {UseFormReturn} from "react-hook-form"
import {z, ZodSchema} from "zod"

export default function CreateSheetButton(
    {form, open, changeOpen, icon, shortName, longName, title, description, children}:
    {
        form: UseFormReturn<z.infer<ZodSchema>>, open: boolean, changeOpen(open: boolean): void,
        icon: React.ReactNode, shortName: string, longName: string,
        title: string, description: string, children: React.ReactNode
    }) {

    return (
        <Sheet open={open} onOpenChange={changeOpen}>
            <SheetTrigger asChild>
                <Button>
                    {icon}
                    <p className={"hidden lg:block"}>{longName}</p>
                    <p className={"hidden sm:block lg:hidden"}>{shortName}</p>
                </Button>
            </SheetTrigger>
            <SheetContent className={"small-column"}>
                <SheetHeader>
                    <SheetTitle>{title}</SheetTitle>
                    <SheetDescription>
                        {description}
                    </SheetDescription>
                </SheetHeader>
                <Form {...form}>
                    {children}
                </Form>
            </SheetContent>
        </Sheet>
    )
}