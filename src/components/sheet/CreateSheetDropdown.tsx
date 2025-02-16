"use client"

import React from "react";
import {Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger} from "@/src/components/ui/sheet";
import {Form} from "@/src/components/ui/form";
import {UseFormReturn} from "react-hook-form";
import {z, ZodSchema} from "zod";
import {DropdownMenuItem} from "@/src/components/ui/dropdown-menu";

export default function CreateSheetDropdown(
    {form, open, changeOpen, itemName, title, description, children}:
    {form: UseFormReturn<z.infer<ZodSchema>>, open: boolean, changeOpen(open: boolean): void,
        itemName: string,
        title: string, description: string, children: React.ReactNode}) {

    return (
        <Sheet open={open} onOpenChange={changeOpen}>
            <SheetTrigger asChild>
                <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                    {itemName}
                </DropdownMenuItem>
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