import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/src/components/ui/card"
import React from "react"
import {Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger} from "@/src/components/ui/dialog"
import {Button} from "@/src/components/ui/button"
import MarkdownContent from "@/src/components/MarkdownContent"
import {Hint} from "@/src/lib/database/hints"

export default async function ChallengeHints({hints}: { hints: Hint[] }) {
    return (
        <Card className={"h-fit flex flex-col"}>
            <CardHeader>
                <CardTitle>Additional Hints</CardTitle>
                <div>
                    <CardDescription>This challenge offers additional hints.</CardDescription>
                    <CardDescription>Click to reveal a hint.</CardDescription>
                </div>
            </CardHeader>
            <CardContent className={"small-column"}>
                {hints.map((hint) => (
                    <Dialog key={hint.id}>
                        <DialogTrigger asChild>
                            <Button>
                                {hint.title}
                            </Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>{hint.title}</DialogTitle>
                                <DialogDescription asChild>
                                    <div>
                                        <MarkdownContent text={hint.hint}/>
                                    </div>
                                </DialogDescription>
                            </DialogHeader>
                        </DialogContent>
                    </Dialog>

                ))}
            </CardContent>
        </Card>
    )
}